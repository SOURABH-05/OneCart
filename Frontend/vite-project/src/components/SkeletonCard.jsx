import React from 'react';

/**
 * Shimmer placeholder card — matches the dimensions of the real ProductCard.
 * Used in Collections while the product list is loading.
 */
const SkeletonCard = () => {
  return (
    <div className="w-[300px] max-w-[90%] h-[420px] bg-[#ffffff0a] rounded-lg border border-[#80808030] p-[10px] flex flex-col gap-3 overflow-hidden">
      {/* Image placeholder */}
      <div className="skeleton w-full h-[64%] rounded-md" />

      {/* Category badge placeholder */}
      <div className="skeleton h-[18px] w-[70px] rounded-full" />

      {/* Name placeholder */}
      <div className="skeleton h-[20px] w-[80%] rounded" />

      {/* Price + rating row */}
      <div className="flex items-center justify-between mt-auto">
        <div className="skeleton h-[18px] w-[50px] rounded" />
        <div className="skeleton h-[18px] w-[70px] rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
