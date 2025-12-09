// ip dev
const ipRoot = process.env.REACT_APP_IP_ROOT + "/api"
const ipRootServer = process.env.REACT_APP_IP_ROOT

// ip khác
const ipCustomer = ipRoot + '/customers'
const ipService = ipRoot + '/services'
const ipAuth = ipRoot + '/auth'
const ipTechnician = ipRoot + '/technicians'
const ipCar = ipRoot + '/cars'
const ipSupplier = ipRoot + "/suppliers"
const ipPart = ipRoot + "/parts"
const ipProfile = ipRoot + "/profile"
const ipImportItem = ipRoot + "/import-invoice-items"
const ipRepairOrder = ipRoot + "/repair-orders"
const ipPayment = ipRoot + "/payments"
const ipPartBooking = ipRoot + "/part-bookings"
const ipNotification = ipRoot + "/notifications"
const ipStatistic = ipRoot + "/reports"





export {
  ipRoot,
  ipCustomer,
  ipService,
  ipAuth,
  ipTechnician,
  ipCar,
  ipSupplier,
  ipPart,
  ipProfile,
  ipImportItem,
  ipRootServer,
  ipRepairOrder,
  ipPayment,
  ipPartBooking,
  ipNotification,
  ipStatistic
}
