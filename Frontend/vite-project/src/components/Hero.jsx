import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CATEGORY_PILLS = ['Fashion', 'Footwear', 'Grocery', 'Dairy', 'Essentials'];

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full relative flex flex-col justify-center px-[6%]">

      {/* Category pill badges */}
      <div className="flex flex-wrap gap-2 mb-4 mt-2">
        {CATEGORY_PILLS.map((pill, i) => (
          <span
            key={pill}
            className="pill-float text-[10px] md:text-[12px] font-semibold uppercase tracking-wider text-[#0c2025] bg-[#aaf5fa] px-3 py-1 rounded-full opacity-90"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {pill}
          </span>
        ))}
      </div>

      {/* Main headline */}
      <div className="hero-text-animate text-[#88d9ee] text-[22px] md:text-[42px] lg:text-[54px] font-bold leading-tight max-w-[90%]">
        <p className="drop-shadow-lg">{heroData.text1}</p>
        <p className="text-white drop-shadow-lg">{heroData.text2}</p>
      </div>

      {/* Sub-text */}
      <p className="text-[#8db4bc] text-[13px] md:text-[16px] mt-3 max-w-[420px] leading-relaxed">
        Shop Fashion, Footwear, Grocery, Dairy & Daily Essentials — all in one place.
      </p>

      {/* CTA buttons */}
      <div className="flex items-center gap-3 mt-6 flex-wrap">
        <button
          onClick={() => navigate('/collections')}
          className="bg-[#46d1f7] text-[#0c2025] font-bold text-[14px] px-6 py-3 rounded-full hover:bg-[#aaf5fa] transition-all active:scale-95 shadow-lg shadow-[#46d1f740]"
        >
          Shop Now →
        </button>
        <button
          onClick={() => navigate('/collections')}
          className="text-[#46d1f7] border border-[#46d1f7] font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-[#46d1f720] transition-all"
        >
          Browse Categories
        </button>
      </div>

      {/* Dot navigation */}
      <div className="flex items-center gap-3 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setHeroCount(i)}
            className={`rounded-full transition-all duration-300 ${
              heroCount === i
                ? 'w-6 h-3 bg-[#46d1f7]'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;