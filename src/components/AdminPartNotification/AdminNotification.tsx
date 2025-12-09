import React, { useEffect, useState } from 'react';
import { Badge, Button, ListGroup, OverlayTrigger, Popover, Spinner, Tooltip, Modal, Card, Tabs, Tab } from 'react-bootstrap';
import { AiOutlineBell, AiOutlineCheck, AiOutlineSync, AiOutlineClose, AiOutlineEye, AiOutlineUser, AiOutlinePhone, AiOutlineEnvironment, AiOutlineInbox, AiOutlineDelete, AiOutlineWarning } from 'react-icons/ai';
import { getPartBooking, confirmPartBooking, deletePartBooking, deleteAllPartBookings, cancelPartBooking } from '../../services/api/adminpartbookingApi'; 
import { notify } from '../../components/Notification';

const AdminNotification = () => {
    const [pendingList, setPendingList] = useState<MPartBooking.IRecord[]>([]);
    const [confirmedList, setConfirmedList] = useState<MPartBooking.IRecord[]>([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<MPartBooking.IRecord | null>(null);

    const [confirmModal, setConfirmModal] = useState({
        show: false,
        title: "",
        message: "",
        onConfirm: async () => {}
    });

    const [key, setKey] = useState('pending');

    const customStyles = `
        .notification-scroll::-webkit-scrollbar { width: 6px; }
        .notification-scroll::-webkit-scrollbar-track { background: #f8f9fa; }
        .notification-scroll::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 10px; }
        .notification-scroll::-webkit-scrollbar-thumb:hover { background: #adb5bd; }
        .notification-item { transition: all 0.2s ease; border-left: 3px solid transparent; }
        .notification-item:hover { background-color: #f8f9fa; border-left: 3px solid #0d6efd; }
        .action-btn { transition: transform 0.1s; }
        .action-btn:active { transform: scale(0.95); }
        .nav-tabs .nav-link { font-size: 13px; font-weight: 600; color: #6c757d; }
        .nav-tabs .nav-link.active { color: #0d6efd; }
    `;

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await getPartBooking();
            const rawList = res.data || []; 
            const cleanList = rawList.map((i: any) => i.data ?? i);

            const pending = cleanList
                .filter((i: MPartBooking.IRecord) => !i.isActive && i.status !== 'CANCELLED')
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            const confirmed = cleanList
                .filter((i: MPartBooking.IRecord) => i.isActive || i.status === 'CONFIRMED' || i.status === 'CANCELLED')
                .sort((a: any, b: any) => {
                    const t1 = new Date(b.updatedAt || b.createdAt).getTime();
                    const t2 = new Date(a.updatedAt || a.createdAt).getTime();
                    return t1 - t2;
                });

            setPendingList(pending);
            setConfirmedList(confirmed);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleViewDetail = (item: any, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedOrder(item);
        setShowModal(true);
        document.body.click();
    };

    const handleConfirmOrder = async (id: string) => {
        try {
            await confirmPartBooking(id);
            notify({ title: "Thành công", type: "success", description: "Đã xác nhận đơn hàng" });
            setShowModal(false);
            fetchNotifications();
        } catch {
            notify({ title: "Lỗi", type: "error", description: "Lỗi khi xác nhận đơn hàng" });
        }
    };

    const handleRejectClick = (id: string) => {
        setConfirmModal({
            show: true,
            title: "Xác nhận từ chối",
            message: "Bạn có chắc chắn muốn TỪ CHỐI đơn hàng này không?",
            onConfirm: async () => await processReject(id)
        });
    };

    const processReject = async (id: string) => {
        try {
            await cancelPartBooking(id);
            notify({ title: "Đã từ chối", type: "success", description: "Đơn hàng đã bị từ chối" });
            setShowModal(false);
            setConfirmModal({ ...confirmModal, show: false });
            fetchNotifications();
        } catch {
            notify({ title: "Lỗi", type: "error", description: "Không thể từ chối đơn hàng" });
        }
    };

    const handleDeleteAllClick = () => {
        if (confirmedList.length === 0) return;
        setConfirmModal({
            show: true,
            title: "Cảnh báo xóa dữ liệu",
            message: "Bạn có chắc muốn xóa toàn bộ lịch sử đơn hàng? Không thể hoàn tác.",
            onConfirm: async () => await processDeleteAll()
        });
    };

    const processDeleteAll = async () => {
        setLoading(true);
        try {
            await deleteAllPartBookings(); 
            notify({ title: "Thành công", type: "success", description: "Đã xóa sạch lịch sử đơn hàng" });
            setConfirmModal({ ...confirmModal, show: false });
            await fetchNotifications();
        } catch {
            notify({ title: "Lỗi", type: "error", description: "Không thể xóa lịch sử" });
        } finally {
            setLoading(false);
        }
    };

    const formatMoney = (n: any) => Number(n).toLocaleString('vi-VN') + 'đ';

    const renderList = (data: MPartBooking.IRecord[], isPending: boolean) => {
        if (loading && data.length === 0)
            return <div className="p-5 text-center text-muted"><Spinner size="sm" animation="border" variant="primary" /></div>;

        if (data.length === 0)
            return <div className="py-5 text-center"><AiOutlineInbox size={40} className="opacity-25 mb-2" /><p className="text-muted small">Danh sách trống</p></div>;

        return (
            <ListGroup variant="flush">
                {data.map((item) => (
                    <ListGroup.Item 
                        key={item.id} 
                        className="d-flex justify-content-between align-items-center border-bottom px-3 py-3 notification-item"
                        style={{ borderLeft: isPending ? '3px solid transparent' : (item.status === 'CANCELLED' ? '3px solid #dc3545' : '3px solid #198754') }}
                    >
                        <div className="me-2 overflow-hidden flex-grow-1" style={{cursor: 'pointer'}} 
                            onClick={(e) => handleViewDetail(item, e)}>

                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold text-dark me-2 text-truncate" style={{maxWidth: '160px'}}>
                                    {item.customerName}
                                </span>
                                {isPending ? (
                                    <Badge bg="primary" className="bg-opacity-10 text-primary border border-primary border-opacity-25" style={{fontSize: '9px'}}>Mới</Badge>
                                ) : (
                                    item.status === 'CANCELLED' ? 
                                    <Badge bg="danger" className="bg-opacity-10 text-danger border border-danger border-opacity-25" style={{fontSize: '9px'}}>Đã từ chối</Badge>
                                    : <Badge bg="success" className="bg-opacity-10 text-success border border-success border-opacity-25" style={{fontSize: '9px'}}>Đã duyệt</Badge>
                                )}
                            </div>

                            <div className="text-secondary mb-1 text-truncate fw-medium" style={{fontSize: '12px'}}>
                                {item.partName || 'Phụ tùng chưa có tên'}
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <span className="badge bg-light text-dark border">x{item.quantity}</span>
                                <span className="text-danger fw-bold" style={{ fontSize: '12px' }}>
                                    {item.price ? formatMoney(item.price * item.quantity) : '0đ'}
                                </span>
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-1 ms-2">
                            <OverlayTrigger placement="left" overlay={<Tooltip>Chi tiết</Tooltip>}>
                                <Button variant="light" size="sm" className="action-btn border text-secondary mb-1"
                                    onClick={(e) => handleViewDetail(item, e)}>
                                    <AiOutlineEye />
                                </Button>
                            </OverlayTrigger>

                            {isPending && (
                                <div className="d-flex gap-1">
                                    <OverlayTrigger placement="left" overlay={<Tooltip>Từ chối</Tooltip>}>
                                        <Button variant="light" size="sm" className="action-btn border text-danger"
                                            onClick={(e) => { e.stopPropagation(); handleRejectClick(item.id); }}>
                                            <AiOutlineClose />
                                        </Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="left" overlay={<Tooltip>Duyệt</Tooltip>}>
                                        <Button variant="success" size="sm" className="action-btn shadow-sm"
                                            onClick={(e) => { e.stopPropagation(); handleConfirmOrder(item.id); }}>
                                            <AiOutlineCheck />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            )}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    };

    const popoverContent = (
        <Popover id="popover-notification" className="shadow-lg border-0" style={{ width: '420px', maxWidth: '95vw' }}>
            <style>{customStyles}</style>
            <div className="d-flex justify-content-between align-items-center bg-white px-3 pt-3 pb-2">
                <h6 className="fw-bold text-primary mb-0">Quản lý đơn hàng</h6>
                <Button variant="light" size="sm" className="rounded-circle p-1 text-muted" onClick={fetchNotifications}>
                    <AiOutlineSync className={loading ? "fa-spin" : ""} size={16} />
                </Button>
            </div>

            <Tabs activeKey={key} onSelect={(k) => setKey(k || 'pending')} className="px-2 border-bottom" justify>
                <Tab eventKey="pending" title={`Cần duyệt (${pendingList.length})`}>
                    <div className="notification-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {renderList(pendingList, true)}
                    </div>
                </Tab>

                <Tab eventKey="confirmed" title={`Lịch sử (${confirmedList.length})`}>
                    {confirmedList.length > 0 && (
                        <div className="px-3 py-2 bg-light border-bottom d-flex justify-content-end">
                            <Button variant="outline-danger" size="sm"
                                className="d-flex align-items-center shadow-sm"
                                style={{fontSize: '11px', fontWeight: '600'}}
                                onClick={handleDeleteAllClick}>
                                <AiOutlineDelete className="me-1"/> Xóa lịch sử
                            </Button>
                        </div>
                    )}
                    <div className="notification-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {renderList(confirmedList, false)}
                    </div>
                </Tab>
            </Tabs>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger trigger="click" placement="bottom-end" overlay={popoverContent} rootClose>
                <div className="position-relative d-inline-flex align-items-center justify-content-center me-3 user-select-none" 
                    style={{ cursor: 'pointer', width: 45, height: 45 }}>
                    <div className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center border">
                        <AiOutlineBell style={{ fontSize: '22px', color: '#555' }} />
                    </div>
                    {pendingList.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-white shadow-sm" 
                            style={{fontSize: '10px'}}>
                            {pendingList.length > 99 ? '99+' : pendingList.length}
                        </span>
                    )}
                </div>
            </OverlayTrigger>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-bottom-0 bg-light">
                    <Modal.Title className="fs-5 fw-bold">
                        {selectedOrder?.isActive ? 'Chi tiết đơn đã duyệt' : 'Xác nhận đơn hàng'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-0">
                    {selectedOrder && (
                        <>
                            <div className="p-4 bg-white border-bottom">
                                <h6 className="text-uppercase text-muted small fw-bold mb-3">Thông tin khách hàng</h6>
                                <div className="d-flex align-items-center mb-2"><AiOutlineUser className="text-primary me-2 fs-5" /><span className="fw-bold">{selectedOrder.customerName}</span></div>
                                <div className="d-flex align-items-center mb-2"><AiOutlinePhone className="text-primary me-2 fs-5" /><span>{selectedOrder.phone || '---'}</span></div>
                                <div className="d-flex align-items-start mb-2"><AiOutlineEnvironment className="text-primary me-2 fs-5 mt-1" /><span>{selectedOrder.address || '---'}</span></div>
                            </div>

                            <div className="p-4 bg-light">
                                <h6 className="text-uppercase text-muted small fw-bold mb-3">Sản phẩm</h6>
                                <Card className="border-0 shadow-sm">
                                    <Card.Body>
                                        <div className="fw-bold text-primary mb-1">{selectedOrder.partName}</div>
                                        <div className="fw-bold text-danger fs-5">
                                            {formatMoney((selectedOrder.price || 0) * selectedOrder.quantity)}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer className="border-top-0 bg-light">
                    <Button variant="outline-secondary" onClick={() => setShowModal(false)} className="rounded-pill px-4">Đóng</Button>

                    {selectedOrder && !selectedOrder.isActive && selectedOrder.status !== 'CANCELLED' && (
                        <>
                            <Button variant="outline-danger" className="rounded-pill px-4" 
                                onClick={() => handleRejectClick(selectedOrder.id)}>
                                Từ chối
                            </Button>

                            <Button variant="primary" className="rounded-pill px-4 fw-bold shadow-sm" 
                                onClick={() => handleConfirmOrder(selectedOrder.id)}>
                                Xác nhận
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>

            <Modal 
                show={confirmModal.show} 
                onHide={() => setConfirmModal({...confirmModal, show: false})} 
                centered 
                size="sm"
                backdrop="static"
            >
                <Modal.Body className="text-center p-4">
                    <div className="mb-3 text-warning">
                        <AiOutlineWarning style={{ fontSize: '48px' }} />
                    </div>
                    <h5 className="fw-bold mb-2">{confirmModal.title}</h5>
                    <p className="text-muted small mb-4">{confirmModal.message}</p>

                    <div className="d-flex justify-content-center gap-2">
                        <Button 
                            variant="light" 
                            onClick={() => setConfirmModal({...confirmModal, show: false})} 
                            className="w-50 rounded-pill"
                        >
                            Hủy
                        </Button>

                        <Button 
                            variant="danger" 
                            onClick={confirmModal.onConfirm} 
                            className="w-50 rounded-pill fw-bold shadow-sm"
                        >
                            Đồng ý
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AdminNotification;