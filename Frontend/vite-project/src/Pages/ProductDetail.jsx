import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { HiLightningBolt } from 'react-icons/hi';
import { toast } from 'react-toastify';
import RelatedProduct from '../components/RelatedProduct';

const NO_SIZE_CATEGORIES = ['Dairy', 'Grocery', 'Milk', 'Butter'];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} className="text-[#FFD700] text-[18px]" />
      ))}
      {half && <FaStarHalfAlt className="text-[#FFD700] text-[18px]" />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} className="text-[#FFD700] text-[18px]" />
      ))}
      <span className="text-white text-[15px] font-semibold ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addtoCart, setBuyNowItem } = useContext(shopDataContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const found = products.find((p) => p._id === productId);
    if (found) {
      setProductData(found);
      setSelectedImage(found.image1);
      setSelectedSize('');
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025]" />;
  }

  const images = [
    productData.image1,
    productData.image2,
    productData.image3,
    productData.image4,
  ].filter(Boolean);

  const rating = productData.rating ?? (productData.bestseller ? 4.8 : 4.2);
  const isNoSize = NO_SIZE_CATEGORIES.includes(productData.category);

  // Show a ~15% discount — treat current price as discounted, compute MRP
  const mrp = Math.round(productData.price / 0.85);
  const discountPct = Math.round(((mrp - productData.price) / mrp) * 100);

  const handleAddToCart = () => {
    const size = isNoSize ? 'default' : selectedSize;
    addtoCart(productData._id, size);
  };

  const handleBuyNow = () => {
    const size = isNoSize ? 'default' : selectedSize;
    if (!isNoSize && !size) {
      toast.warn('Please select a size first');
      return;
    }
    setBuyNowItem({ product: productData, size, quantity: 1 });
    navigate('/placeorder');
  };

  return (
    <div className="bg-gradient-to-l from-[#141414] to-[#0c2025] min-h-screen">

      {/* ── Main product section ── */}
      <div className="max-w-[1200px] mx-auto px-4 pt-[90px] pb-10 flex flex-col lg:flex-row gap-10">

        {/* Gallery */}
        <div className="lg:w-[50%] flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-[70px] h-[70px] rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === img
                    ? 'border-[#46d1f7]'
                    : 'border-[#80808040] hover:border-[#8db4bc]'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 rounded-xl overflow-hidden border border-[#80808030] bg-[#1a3540] max-h-[500px]">
            <img
              src={selectedImage}
              alt={productData.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:w-[50%] flex flex-col gap-4">
          {/* Breadcrumb / category */}
          <span className="text-[#46d1f7] text-[12px] uppercase tracking-widest font-semibold">
            {productData.category}
          </span>

          <h1 className="text-[32px] md:text-[38px] font-bold text-white leading-tight">
            {productData.name}
          </h1>

          {/* Rating */}
          <StarRating rating={rating} />

          {/* Price block */}
          <div className="flex items-end gap-3 mt-1">
            <span className="text-[32px] font-bold text-[#aaf5fa]">
              {currency} {productData.price}
            </span>
            <span className="text-[20px] text-[#8db4bc] line-through">
              {currency} {mrp}
            </span>
            <span className="text-[14px] font-semibold bg-green-600 text-white px-2 py-[2px] rounded">
              {discountPct}% OFF
            </span>
          </div>

          {/* Description */}
          <p className="text-[#c9e9ed] text-[15px] leading-relaxed border-t border-[#80808030] pt-4">
            {productData.description}
          </p>

          {/* Size selector — only for clothing/shoes */}
          {!isNoSize && productData.sizes?.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold text-[15px]">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`border px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${
                      selectedSize === s
                        ? 'bg-[#46d1f7] text-[#0c2025] border-[#46d1f7]'
                        : 'bg-[#1a3540] text-white border-[#80808060] hover:border-[#46d1f7]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-[#1a3540] border border-[#46d1f7] text-[#46d1f7] px-6 py-3 rounded-xl text-[15px] font-semibold hover:bg-[#46d1f7] hover:text-[#0c2025] transition-all active:scale-95"
            >
              <MdOutlineShoppingCart className="text-[20px]" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex items-center gap-2 bg-[#46d1f7] text-[#0c2025] px-6 py-3 rounded-xl text-[15px] font-bold hover:bg-[#aaf5fa] transition-all active:scale-95"
            >
              <HiLightningBolt className="text-[18px]" />
              Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="border-t border-[#80808030] pt-4 flex flex-col gap-1 text-[14px] text-[#8db4bc]">
            <p>✓ 100% Original Product</p>
            <p>✓ Cash on Delivery available</p>
            <p>✓ Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* ── Description tabs ── */}
      <div className="max-w-[1200px] mx-auto px-4 pb-10">
        <div className="flex gap-0 border-b border-[#80808030]">
          <span className="border-b-2 border-[#46d1f7] text-[#46d1f7] px-5 py-3 text-[14px] font-semibold cursor-pointer">
            Description
          </span>
          <span className="text-[#8db4bc] px-5 py-3 text-[14px] cursor-pointer hover:text-white">
            Reviews (124)
          </span>
        </div>
        <div className="mt-4 bg-[#1a354050] border border-[#80808030] rounded-lg p-6 text-[#c9e9ed] text-[15px] leading-relaxed">
          {productData.description}. Crafted with care and built to last, this product is a
          must-have for everyday life. Available now exclusively on OneCart — your one-stop marketplace.
        </div>
      </div>

      {/* ── Related products ── */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </div>
  );
};

export default ProductDetail;
