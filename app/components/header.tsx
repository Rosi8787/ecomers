"use client";
import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-indigo-600">
          Webzy.
        </Link>

        {/* Search Bar - Interaktif */}
        <div className="flex-1 max-w-md mx-4 order-3 md:order-2 w-full md:w-auto">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery?.(e.target.value)}
              placeholder="Cari produk impianmu..." 
              className="w-full bg-slate-100/50 border-transparent border focus:border-indigo-500 focus:bg-white py-2.5 pl-12 pr-4 rounded-2xl outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="flex items-center space-x-6 order-2 md:order-3 font-semibold text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors border-b-2 border-indigo-600 pb-1">Dashboard</Link>
          <Link href="#catalog" className="hover:text-indigo-600 transition-colors hidden sm:block">catalog</Link>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-md shadow-indigo-100">
            <Link href="/">Home</Link>
          </button> 
        </div>
      </div>
    </nav>
  );
};

export default Header;