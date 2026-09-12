const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    title: "Smartphone Android 5G",
    description: "Écran 6.5 pouces, 128 Go de stockage, batterie 5000 mAh.",
    priceFCFA: 85000,
    priceCNY: 1000,
    weightKg: 0.4,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },
  {
    title: "Écouteurs Sans Fil Bluetooth",
    description: "Réduction de bruit active, autonomie 24h avec boîtier.",
    priceFCFA: 15000,
    priceCNY: 180,
    weightKg: 0.1,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    title: "Montre Connectée Sport",
    description: "Suivi cardiaque, étanche IP68, notifications SMS/Appels.",
    priceFCFA: 25000,
    priceCNY: 300,
    weightKg: 0.2,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Produits de test ajoutés avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur d'insertion :", err);
    process.exit(1);
  }
};

seedDB();
