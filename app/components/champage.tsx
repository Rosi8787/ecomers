"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAMPAIGNS } from '../data/champage';

const Champage = () => {
  const [index, setIndex] = useState(0);

  // Fungsi untuk pindah slide otomatis setiap 10 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === CAMPAIGNS.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // 10.000 ms = 10 detik

    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto relative group">
        
        {/* Main Slider Container */}
        <div className="relative w-full aspect-[21/9] md:aspect-[25/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={CAMPAIGNS[index].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Gambar Background */}
              <img 
                src={CAMPAIGNS[index].image} 
                alt={CAMPAIGNS[index].title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradien */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center px-8 md:px-16">
                <div className="max-w-xl text-white">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-7xl font-black leading-[1.1] drop-shadow-2xl whitespace-pre-line"
                  >
                    {CAMPAIGNS[index].title}
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-base md:text-xl text-white/90 font-medium drop-shadow-md"
                  >
                    {CAMPAIGNS[index].desc}
                  </motion.p>
                  <motion.button 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`mt-8 bg-white ${CAMPAIGNS[index].color} px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl text-lg`}
                  >
                    Cek Sekarang
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indikator Titik (Dots) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {CAMPAIGNS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 transition-all duration-500 rounded-full ${
                i === index ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Champage;