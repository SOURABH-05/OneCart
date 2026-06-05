import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  const freeShipping = subtotal >= 500;

  return (
    <div className="w-full">
      <div className="text-xl py-2">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="mt-3 rounded-xl border border-[#4d8890] bg-[#ffffff05] overflow-hidden">
        <div className="flex justify-between text-white text-[15px] p-4 border-b border-[#4d8890]">
          <span className="text-[#8db4bc]">Subtotal</span>
          <span className="font-semibold">
            {currency} {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-[15px] p-4 border-b border-[#4d8890]">
          <span className="text-[#8db4bc]">Shipping</span>
          {freeShipping ? (
            <span className="text-green-400 font-semibold text-[13px]">FREE</span>
          ) : (
            <span className="text-white font-semibold">
              {currency} {delivery_fee}
            </span>
          )}
        </div>

        <div className="flex justify-between text-[17px] font-bold p-4 text-white">
          <span>Total</span>
          <span className="text-[#aaf5fa]">
            {currency} {total.toFixed(2)}
          </span>
        </div>
      </div>

      {subtotal > 0 && !freeShipping && (
        <p className="text-[12px] text-[#8db4bc] mt-2 text-right">
          Add {currency} {(500 - subtotal).toFixed(2)} more for free shipping
        </p>
      )}
    </div>
  );
};

export default CartTotal;
