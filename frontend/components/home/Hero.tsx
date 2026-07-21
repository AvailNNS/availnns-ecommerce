"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-black text-white py-28 lg:py-36 overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300">
          <Sparkles size={14} className="text-amber-400" />
          <span>Welcome to Noptrix</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
          Discover Premium Products <br />
          <span className="text-zinc-400">At The Best Prices.</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Explore our handpicked collection designed to elevate your everyday lifestyle with uncompromised quality and style.
        </p>

        {/* Call To Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-zinc-200 transition-all duration-300 active:scale-95 shadow-xl"
          >
            <span>Shop Now</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/deals"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-sm border border-zinc-800 transition-all duration-300 active:scale-95"
          >
            View Deals
          </Link>
        </div>

      </div>

    </section>
  );
}
