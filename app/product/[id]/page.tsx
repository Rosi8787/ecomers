"use client";
import { useState } from 'react'; // Tambahkan useState
import { PRODUCTS } from '@/app/data/products';
import Header from '@/app/components/header';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
  const params = useParams();
  const product = PRODUCTS.find((p) => p.id === params.id);
  
  // State untuk melacak gambar mana yang aktif
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <div className="p-20 text-center">Produk tidak ditemukan.</div>;

  // Fungsi navigasi
  const nextImage = () => {
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* BAGIAN KIRI: Galeri Gambar dengan Slide */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl bg-slate-50 group">
              
              {/* Gambar Utama dengan Animasi Fade */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  src={product.images[activeImage]} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Tombol Panah (Hanya muncul jika gambar > 1) */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Gambar Kecil (Thumbnails) di bawah gambar utama */}
            <div className="flex gap-4 justify-center overflow-x-auto py-2">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    index === activeImage ? 'border-indigo-600 scale-110 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`view ${index}`} />
                </button>
              ))}
            </div>
          </div>

          {/* BAGIAN KANAN: Info & CTA (Judul, Harga, Deskripsi tetap ada) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <nav className="mb-6">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-widest">Koleksi Pilihan</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-3xl font-bold text-indigo-600 mb-8">
              {product.price}
            </p>
            
            <div className="border-t border-slate-100 pt-8">
              <h4 className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wider">Deskripsi Produk</h4>
              <p className="text-slate-500 leading-relaxed text-lg mb-10 italic">
                "{product.description}"
              </p>
            </div>

            {/* Tombol CTA Shopify */}
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={product.shopifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white text-center py-5 rounded-2xl font-bold text-xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              Beli Sekarang via Shopify
            </motion.a>
            
            <div className="flex items-center justify-center gap-4 mt-6">
               <div className="flex items-center text-xs text-slate-400">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Stok Tersedia
               </div>
               <div className="text-slate-300">|</div>
               <p className="text-xs text-slate-400 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zM10 5a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                 </svg>
                 Checkout Aman
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}