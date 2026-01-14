"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS } from "./data/products";
import Header from "./components/header";
import Champage from "./components/champage";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi filter produk berdasarkan input search
  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Kirim setSearchQuery ke Header agar inputnya bisa mengontrol list produk */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Komponen gambar lebar dari Figma */}
      <Champage />

      <section id="#catalog" className="">
        <div className="pb-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Koleksi Produk
            </h2>
            <p className="text-slate-500">
              Menampilkan {filteredProducts.length} hasil
            </p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    <div className="relative aspect-[4/5] overflow-hidden">

                      <img
                        src={product.images[0]} // Tambahkan huruf 's' dan index [0]
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-800">
                        {product.name}
                      </h3>
                      <p className="text-indigo-600 font-semibold mt-1">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              Produk "{searchQuery}" tidak ditemukan.
            </p>
          </div>
        )}
      </div>
      </section>
      <input
        suppressHydrationWarning
        placeholder="Cari produk impianmu..."
        className="w-full bg-slate-100/50 ..."
      />
    </main>
  );
}
