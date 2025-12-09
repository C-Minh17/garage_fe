import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { AiOutlineUser, AiOutlinePhone, AiOutlineEnvironment, AiOutlineFileText, AiOutlineClockCircle } from 'react-icons/ai';
// import { MPartBooking } from '../services/api/adminpartbookingApi';

interface IProps {
    show: boolean;
    onHide: () => void;
    data: MPartBooking.IRecord | null;
    onConfirm: (id: string) => void;
    onReject: (id: string) => void;
}

const AdminPartBookingDetail: React.FC<IProps> = ({ show, onHide, data, onConfirm, onReject }) => {

    const formatMoney = (n: any) => Number(n).toLocaleString('vi-VN') + 'đ';

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="border-bottom-0 bg-light">
                <Modal.Title className="fs-5 fw-bold">
                    {data?.isActive ? 'Chi tiết đơn đã duyệt' : 'Xác nhận đơn hàng'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-0">
                {data && (
                    <>
                        <div className="p-4 bg-white border-bottom">
                            <h6 className="text-uppercase text-muted small fw-bold mb-3">Thông tin khách hàng</h6>
                            <div className="d-flex align-items-center mb-2">
                                <AiOutlineUser className="text-primary me-2 fs-5" />
                                <span className="fw-bold">{data.customerName}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <AiOutlinePhone className="text-primary me-2 fs-5" />
                                <span>{data.phone || '---'}</span>
                            </div>
                            <div className="d-flex align-items-start mb-2">
                                <AiOutlineEnvironment className="text-primary me-2 fs-5 mt-1" />
                                <span>{data.address || '---'}</span>
                            </div>
                            {data.note && (
                                <div className="d-flex align-items-start mt-3 p-2 bg-warning bg-opacity-10 rounded text-warning-dark border border-warning border-opacity-25">
                                    <AiOutlineFileText className="me-2 mt-1" />
                                    <small className="fst-italic">{data.note}</small>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-light">
                            <h6 className="text-uppercase text-muted small fw-bold mb-3">Sản phẩm</h6>
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <div className="fw-bold text-primary mb-1">{data.partName}</div>
                                            <div className="small text-muted">Mã: {data.bookingCode || '---'}</div>
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-bold text-danger fs-5">
                                                {formatMoney((data.price || 0) * data.quantity)}
                                            </div>
                                            <div className="small text-muted">
                                                {formatMoney(data.price || 0)} x {data.quantity}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-2 dashed" />
                                    <div className="d-flex align-items-center justify-content-between small text-muted">
                                        <span><AiOutlineClockCircle className="me-1" /> Đặt lúc:</span>
                                        <span>{new Date(data.createdAt).toLocaleString('vi-VN')}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </>
                )}
            </Modal.Body>

            <Modal.Footer className="border-top-0 bg-light">
                <Button variant="outline-secondary" onClick={onHide} className="rounded-pill px-4">
                    Đóng
                </Button>

                {data && !data.isActive && data.status !== 'CANCELLED' && (
                    <>
                        <Button
                            variant="outline-danger"
                            className="rounded-pill px-4"
                            onClick={() => onReject(data.id)}
                        >
                            Từ chối
                        </Button>

                        <Button
                            variant="primary"
                            className="rounded-pill px-4 fw-bold shadow-sm"
                            onClick={() => onConfirm(data.id)}
                        >
                            Xác nhận
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default AdminPartBookingDetail;