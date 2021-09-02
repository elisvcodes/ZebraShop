const Order = require('../models/order');

exports.createOrder = (req, res) => {
  const { firstName, lastName, address, apt, zip, city, state, email, phone } =
    req.body.customerInfo;
  const data = {
    firstName,
    lastName,
    address,
    apt,
    zip,
    city,
    state,
    email,
    phone,
    itemsOrdered: req.body.itemsOrdered,
    orderTotal: req.body.orderTotal,
  };

  const order = new Order(data);
  order.save((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result.orderNumber);
  });
};

exports.getOrders = (req, res) => {
  Order.find({}).exec((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    res.status(200).json(result);
  });
};

exports.updateOrder = (req, res) => {
  Order.findByIdAndUpdate({ _id: req.body._id }, req.body, {
    returnOriginal: false,
  });
};
