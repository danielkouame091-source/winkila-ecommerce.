const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priceCNY: { type: Number, required: true },
  priceFCFA: { type: Number, required: true },
  weightKg: { type: Number, required: true },
  volumeCbm: { type: Number, default: 0 },
  category: { type: String },
  images: [{ type: String }],
  supplierUrl: { type: String },
  shippingModes: [{ type: String, enum: ['Air', 'Sea'], default: ['Air'] }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
