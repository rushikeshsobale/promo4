// Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  address: String,
  city: String,
  country: String,
  email: String,
  fullName: String,
  paymentMethod: String,
  phone: String,
  shippingAddress: String,
  state: String,
  useBillingForShipping: Boolean,
  zip: String,
  orders:Object,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
