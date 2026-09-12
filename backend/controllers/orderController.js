const Order = require('../models/Order');

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { orderItems, totalAmountFCFA, paymentMethod, deliveryAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Aucun article dans la commande' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      totalAmountFCFA,
      paymentMethod,
      deliveryAddress
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mettre à jour le statut de suivi logistique (Admin)
// @route   PUT /api/orders/:id/tracking
exports.updateTrackingStatus = async (req, res) => {
  try {
    const { trackingStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.trackingStatus = trackingStatus;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Commande non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
