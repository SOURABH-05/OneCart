import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineShoppingBag, MdReceiptLong } from 'react-icons/md';
import { shopDataContext } from '../context/ShopContext';

const CheckmarkIcon = () => (
  <svg
    className="check-circle w-24 h-24"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" fill="#0d3d30" stroke="#22c55e" strokeWidth="3" />
    <path
      className="check-path"
      d="M28 50 L44 66 L72 36"
      stroke="#22c55e"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const { currency } = useContext(shopDataContext);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('onecart_last_order');
      if (stored) setOrder(JSON.parse(stored));
    } catch {
      // corrupted — just render empty
    }
  }, []);



  if (!order) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-center gap-5 text-white">
        <p className="text-[#8db4bc] text-[18px]">No order data found.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#46d1f7] text-[#0c2025] font-bold px-6 py-3 rounded-xl"
        >
          Go Home
        </button>
      </div>
    );
  }

  const {
    orderId,
    date,
    items,
    address,
    subtotal,
    deliveryFee,
    total,
    paymentMethod,
  } = order;

  const formattedDate = new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pb-24 pt-[90px]">
      <div className="max-w-[700px] mx-auto px-4">

        {/* Success header */}
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <CheckmarkIcon />
          <h1 className="text-[32px] font-bold text-white mt-2">Order Confirmed!</h1>
          <p className="text-[#8db4bc] text-[16px]">
            Thank you for your purchase. We'll get it delivered soon.
          </p>
        </div>

        {/* Receipt card */}
        <div className="bg-[#ffffff07] border border-[#80808030] rounded-2xl overflow-hidden">

          {/* Order ID banner */}
          <div className="bg-[#1a3540] border-b border-[#80808030] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[#8db4bc] text-[12px] uppercase tracking-widest">Order ID</p>
              <p className="text-[#46d1f7] font-mono font-bold text-[15px] mt-0.5">{orderId}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[#8db4bc] text-[12px]">Placed on</p>
              <p className="text-white text-[13px] font-medium">{formattedDate}</p>
            </div>
          </div>

          {/* Ordered items */}
          <div className="px-6 py-4 border-b border-[#80808030]">
            <p className="text-[#8db4bc] text-[13px] uppercase tracking-widest mb-3">
              Items Ordered
            </p>
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-[56px] h-[56px] rounded-lg object-cover flex-shrink-0 border border-[#80808030]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[14px] font-medium truncate">{item.name}</p>
                    <p className="text-[#8db4bc] text-[12px]">
                      Qty: {item.quantity}
                      {item.size !== 'default' && ` · Size: ${item.size}`}
                    </p>
                  </div>
                  <span className="text-[#aaf5fa] font-semibold text-[14px] flex-shrink-0">
                    {currency} {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          <div className="px-6 py-4 border-b border-[#80808030] flex flex-col gap-2 text-[14px]">
            <div className="flex justify-between text-[#8db4bc]">
              <span>Subtotal</span>
              <span className="text-white">{currency} {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#8db4bc]">
              <span>Shipping</span>
              <span className="text-white">{currency} {deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-[16px] pt-2 border-t border-[#80808030]">
              <span className="text-white">Total Paid</span>
              <span className="text-[#aaf5fa]">{currency} {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Billing / Shipping info */}
          <div className="px-6 py-4 border-b border-[#80808030] grid sm:grid-cols-3 gap-6 text-[14px]">
            <div>
              <p className="text-[#8db4bc] text-[12px] uppercase tracking-widest mb-2">
                Shipping To
              </p>
              <p className="text-white font-semibold">
                {address.firstName} {address.lastName}
              </p>
              <p className="text-[#8db4bc]">{address.street}</p>
              <p className="text-[#8db4bc]">
                {address.city}, {address.state} – {address.pinCode}
              </p>
              <p className="text-[#8db4bc]">{address.country}</p>
            </div>
            
            {address.billing && (
              <div>
                <p className="text-[#8db4bc] text-[12px] uppercase tracking-widest mb-2">
                  Billing To
                </p>
                <p className="text-white font-semibold">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-[#8db4bc]">{address.billing.street}</p>
                <p className="text-[#8db4bc]">
                  {address.billing.city}, {address.billing.state} – {address.billing.pinCode}
                </p>
                <p className="text-[#8db4bc]">{address.country}</p>
              </div>
            )}

            <div>
              <p className="text-[#8db4bc] text-[12px] uppercase tracking-widest mb-2">
                Payment
              </p>
              <p className="text-white font-semibold">{paymentMethod}</p>
              <p className="text-[#8db4bc] text-[13px] mt-1">{address.email}</p>
              <p className="text-[#8db4bc] text-[13px]">{address.phone}</p>
            </div>
          </div>

          {/* Status */}
          <div className="px-6 py-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-[14px] font-semibold">Order Placed</span>
            <span className="text-[#8db4bc] text-[13px] ml-1">
              · Estimated delivery in 3–5 business days
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => navigate('/collections')}
            className="flex-1 flex items-center justify-center gap-2 border border-[#46d1f7] text-[#46d1f7] font-semibold py-3 rounded-xl hover:bg-[#46d1f7] hover:text-[#0c2025] transition-all"
          >
            <MdOutlineShoppingBag className="text-[18px]" />
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/order')}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1a3540] text-white font-semibold py-3 rounded-xl hover:bg-[#234a5a] transition-all border border-[#80808030]"
          >
            <MdReceiptLong className="text-[18px]" />
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
