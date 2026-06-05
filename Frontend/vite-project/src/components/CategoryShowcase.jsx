import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

const categories = [
  {
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1489987707023-af0828100938?auto=format&fit=crop&q=80&w=600',
    colSpan: 'col-span-2 row-span-2'
  },
  {
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    colSpan: 'col-span-1 row-span-1'
  },
  {
    name: 'Dairy & Milk',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600',
    colSpan: 'col-span-1 row-span-1'
  },
  {
    name: 'Grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
    colSpan: 'col-span-2 row-span-1'
  }
];

const CategoryShowcase = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 md:px-10 py-16">
      <div className="text-center mb-10">
        <Title text1="SHOP BY" text2="CATEGORY" />
        <p className="w-full m-auto text-[13px] md:text-[18px] px-[10px] text-[#8db4bc]">
          Explore our wide range of premium categories
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto h-[500px] grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${cat.colSpan}`}
            onClick={() => navigate('/collections')}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10" />
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg">
                {cat.name}
              </h3>
              <div className="w-0 h-1 bg-[#46d1f7] mt-2 group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryShowcase;
