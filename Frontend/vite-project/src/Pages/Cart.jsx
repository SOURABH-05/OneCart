import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import CartTotal from '../components/CartTotal';
import { MdOutlineShoppingBag } from 'react-icons/md';

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="text-7xl opacity-25">🛒</div>
      <p className="text-[#8db4bc] text-[22px] font-semibold">Your cart is empty</p>
      <p className="text-[#8db4bc] text-[14px]">
        Looks like you haven't added anything yet.
      </p>
      <button
        onClick={() => navigate('/collections')}
        className="mt-2 flex items-center gap-2 bg-[#46d1f7] text-[#0c2025] font-bold px-6 py-3 rounded-xl hover:bg-[#aaf5fa] transition-all"
      >
        <MdOutlineShoppingBag className="text-[20px]" />
        Start Shopping
      </button>
    </div>
  );
};

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = [];
    for (const id in cartItem) {
      for (const size in cartItem[id]) {
        const qty = cartItem[id][size];
        if (qty > 0) items.push({ _id: id, size, quantity: qty });
      }
    }
    setCartData(items);
  }, [cartItem]);

  return (
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-hidden pb-[100px]">
      <div className="max-w-[1000px] mx-auto px-4 pt-[90px]">
        <div className="text-center mb-8">
          <Title text1="YOUR" text2="CART" />
        </div>

        {cartData.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Cart items */}
            <div className="flex flex-col gap-4">
              {cartData.map((item, index) => {
                const product = products.find((p) => p._id === item._id);
                if (!product) return null;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-[#ffffff08] border border-[#80808030] rounded-xl p-4 relative"
                  >
                    {/* Thumbnail */}
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-[90px] h-[90px] object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[16px] font-semibold truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-[#aaf5fa] text-[15px] font-semibold">
                          {currency} {product.price}
                        </span>
                        {item.size !== 'default' && (
                          <span className="bg-[#1a3540] border border-[#46d1f766] text-[#46d1f7] text-[12px] px-2 py-[2px] rounded-md">
                            {item.size}
                          </span>
                        )}
                        {product.category && (
                          <span className="text-[#8db4bc] text-[12px]">
                            {product.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        className="w-[30px] h-[30px] bg-[#1a3540] border border-[#46d1f766] text-white rounded-md flex items-center justify-center hover:border-[#46d1f7] transition-colors"
                        onClick={() =>
                          updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))
                        }
                      >
                        <HiOutlineMinus className="text-[14px]" />
                      </button>
                      <span className="text-white font-semibold text-[15px] min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-[30px] h-[30px] bg-[#1a3540] border border-[#46d1f766] text-white rounded-md flex items-center justify-center hover:border-[#46d1f7] transition-colors"
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                      >
                        <HiOutlinePlus className="text-[14px]" />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="text-[#aaf5fa] font-bold text-[15px] min-w-[70px] text-right hidden sm:block">
                      {currency} {(product.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Delete */}
                    <button
                      className="text-[#ff6b6b] hover:text-white transition-colors ml-2 flex-shrink-0"
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      title="Remove item"
                    >
                      <RiDeleteBin6Line className="w-[20px] h-[20px]" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Cart summary */}
            <div className="mt-10 flex justify-end">
              <div className="w-full sm:w-[420px]">
                <CartTotal />
                <button
                  className="w-full mt-4 bg-[#46d1f7] text-[#0c2025] font-bold text-[16px] py-3 rounded-xl hover:bg-[#aaf5fa] transition-all active:scale-95"
                  onClick={() => navigate('/placeorder')}
                >
                  Proceed to Checkout →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
