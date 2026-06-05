import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const STATUS_COLOR = {
  'Order Placed': 'text-blue-400 bg-blue-400/10',
  'Packing': 'text-yellow-400 bg-yellow-400/10',
  'Shipped': 'text-orange-400 bg-orange-400/10',
  'Out for delivery': 'text-purple-400 bg-purple-400/10',
  'Delivered': 'text-green-400 bg-green-400/10',
  'Cancelled': 'text-red-400 bg-red-400/10'
};

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + '/api/order/userorder',
        {},
        { withCredentials: true }
      );
      if (result.data) {
        const allItems = [];
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            allItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
            });
          });
        });
        setOrderData(allItems.reverse());
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
    try {
      const result = await axios.post(
        serverUrl + '/api/order/cancel',
        { orderId },
        { withCredentials: true }
      );
      if (result.data && result.data.success) {
        loadOrderData();
      }
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pb-[100px]">
      <div className="max-w-[900px] mx-auto px-4 pt-[90px]">
        <div className="text-center mb-8">
          <Title text1="MY" text2="ORDERS" />
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton w-full h-[120px] rounded-xl" />
            ))}
          </div>
        ) : orderData.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="text-6xl opacity-25">📦</div>
            <p className="text-[#8db4bc] text-[20px] font-semibold">No orders yet</p>
            <p className="text-[#8db4bc] text-[14px]">
              You haven't placed any orders. Start shopping!
            </p>
            <button
              onClick={() => navigate('/collections')}
              className="mt-2 flex items-center gap-2 bg-[#46d1f7] text-[#0c2025] font-bold px-6 py-3 rounded-xl hover:bg-[#aaf5fa] transition-all"
            >
              <MdOutlineShoppingBag className="text-[20px]" />
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orderData.map((item, index) => {
              const statusClass =
                STATUS_COLOR[item.status] || 'text-gray-400 bg-gray-400/10';

              return (
                <div
                  key={index}
                  className="bg-[#ffffff07] border border-[#80808030] rounded-xl p-4 flex items-start gap-4 relative"
                >
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-[90px] h-[90px] object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[16px] font-semibold truncate">
                      {item.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[13px] text-[#8db4bc]">
                      <span>
                        {currency} {item.price}
                      </span>
                      <span>Qty: {item.quantity}</span>
                      {item.size && item.size !== 'default' && (
                        <span>Size: {item.size}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[13px] text-[#8db4bc]">
                      <span>Date: {new Date(item.date).toDateString()}</span>
                      <span>Payment: {item.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span
                      className={`text-[12px] font-semibold px-3 py-1 rounded-full ${statusClass}`}
                    >
                      {item.status}
                    </span>
                    <button
                      className="text-[12px] text-[#46d1f7] border border-[#46d1f766] px-3 py-1 rounded-lg hover:bg-[#46d1f720] transition-colors"
                      onClick={loadOrderData}
                    >
                      Refresh
                    </button>
                    {(item.status === 'Order Placed' || item.status === 'Packing') && (
                      <button
                        className="text-[12px] text-red-400 border border-red-400/60 px-3 py-1 rounded-lg hover:bg-red-400/20 transition-colors"
                        onClick={() => handleCancelOrder(item.orderId)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
