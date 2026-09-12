'use client';

import { useEffect, useState } from 'react';
import API from '@/lib/api';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  priceFCFA: number;
  priceCNY: number;
  weightKg: number;
  description: string;
  imageUrl: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (err) {
        console.error('Erreur chargement produits:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Win Kila</h1>
        <div className="space-x-4">
          <Link href="/login" className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Connexion
          </Link>
          <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Inscription
          </Link>
        </div>
      </nav>

      <header className="py-12 text-center bg-blue-50">
        <h2 className="text-4xl font-extrabold text-blue-900">Catalogue Win Kila</h2>
        <p className="mt-2 text-gray-600">Produits livrés directement depuis la Chine en Côte d'Ivoire</p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-500">Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">Aucun produit disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod._id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                <img src={prod.imageUrl || '/file.svg'} alt={prod.title} className="h-48 w-full object-cover" />
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg">{prod.title}</h3>
                  <p className="text-sm text-gray-600">{prod.description}</p>
                  <p className="text-xs text-gray-500">Poids: {prod.weightKg} kg | {prod.priceCNY} ¥</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold text-blue-600">{prod.priceFCFA} FCFA</span>
                    <button className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 text-sm">
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
