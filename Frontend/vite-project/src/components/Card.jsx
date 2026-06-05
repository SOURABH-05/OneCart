import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';

// Maps categories that don't use clothing sizes to a default size token
const NO_SIZE_CATEGORIES = ['Dairy', 'Grocery', 'Milk', 'Butter'];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} className="text-[#FFD700] text-[13px]" />
      ))}
      {half && <FaStarHalfAlt className="text-[#FFD700] text-[13px]" />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} className="text-[#FFD700] text-[13px]" />
      ))}
      <span className="text-[#8db4bc] text-[11px] ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};

const Card = ({ id, name, image, price, category, rating = 4.2 }) => {
  const { currency, addtoCart } = useContext(shopDataContext);
  const navigate = useNavigate();

  const handleQuickAdd = (e) => {
    // Stop the click from bubbling up to the card's navigate handler
    e.stopPropagation();
    const isNoSize = NO_SIZE_CATEGORIES.includes(category);
    if (isNoSize) {
      addtoCart(id, 'default');
    } else {
      // For clothing/shoes, navigate to detail so user can pick size
      navigate(`/productdetail/${id}`);
      toast.info('Please select a size');
    }
  };

  return (
    <div
      className="product-card w-[300px] max-w-[90%] bg-[#ffffff0a] backdrop-blur-sm rounded-lg flex flex-col p-[10px] cursor-pointer border border-[#80808030] relative overflow-hidden"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Product image */}
      <div className="w-full h-[230px] rounded-md overflow-hidden bg-[#1a3540]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Category badge */}
      {category && (
        <span className="mt-2 inline-block self-start text-[10px] font-semibold uppercase tracking-wider text-[#0c2025] bg-[#aaf5fa] px-[8px] py-[2px] rounded-full">
          {category}
        </span>
      )}

      {/* Name */}
      <p className="text-[#c3f6fa] text-[15px] font-medium mt-1 line-clamp-2 leading-tight">
        {name}
      </p>

      {/* Rating */}
      <div className="mt-1">
        <StarRating rating={rating} />
      </div>

      {/* Price row + quick-add */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[#f3fafa] text-[15px] font-semibold">
          {currency} {price}
        </span>
        <button
          className="quick-add-btn flex items-center gap-1 text-[11px] font-semibold bg-[#46d1f7] text-[#0c2025] px-[10px] py-[5px] rounded-full hover:bg-[#aaf5fa] transition-colors"
          onClick={handleQuickAdd}
          title="Quick Add to Cart"
        >
          <MdAddShoppingCart className="text-[14px]" />
          Add
        </button>
      </div>
    </div>
  );
};

export default Card;