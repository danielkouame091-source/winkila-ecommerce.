const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    shippingMode: { type: String, enum: ['Air', 'Sea'], required: true },
    itemPriceFCFA: { type: Number, required: true }
  }],
  totalAmountFCFA: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['Wave', 'MTN', 'Orange', 'Moov', 'Card'], required: true },
  cinetpayTransactionId: { type: String },
  trackingStatus: { 
    type: String, 
    enum: ['Order Received', 'Supplier Shipping', 'In China Warehouse', 'In Transit', 'Customs Clearance', 'Arrived Abidjan', 'Delivered'],
    default: 'Order Received' 
  },
  deliveryAddress: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
