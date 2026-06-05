import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import axios from 'axios';

const generateOrderId = () => {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `OC-${Date.now()}-${rand}`;
};

// Helper to load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const FormField = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[#8db4bc] text-[13px] font-medium">{label}</label>
    <input
      className="form-input w-full h-[48px] rounded-lg bg-[#1a3540] border border-[#80808060] text-white placeholder-[#6a8a90] text-[15px] px-4 focus:outline-none focus:border-[#46d1f7]"
      {...props}
    />
  </div>
);

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const {
    cartItem,
    setCartItem,
    clearCart,
    getCartAmount,
    delivery_fee,
    products,
    buyNowItem,
    setBuyNowItem,
    currency,
  } = useContext(shopDataContext);

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('cod'); 
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [billingFormData, setBillingFormData] = useState({
    street: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildOrderItems = () => {
    if (buyNowItem) {
      return [{ ...buyNowItem.product, size: buyNowItem.size, quantity: buyNowItem.quantity }];
    }
    const items = [];
    for (const id in cartItem) {
      for (const size in cartItem[id]) {
        const qty = cartItem[id][size];
        if (qty > 0) {
          const product = products.find((p) => p._id === id);
          if (product) items.push({ ...product, size, quantity: qty });
        }
      }
    }
    return items;
  };

  const orderItems = buildOrderItems();
  const subtotal = buyNowItem ? buyNowItem.product.price * buyNowItem.quantity : getCartAmount();
  const total = subtotal + delivery_fee;

  const handleSuccessOrder = (orderId, address, paymentMethod) => {
    sessionStorage.setItem(
      'onecart_last_order',
      JSON.stringify({
        orderId,
        date: new Date().toISOString(),
        items: orderItems,
        address,
        subtotal,
        deliveryFee: delivery_fee,
        total,
        paymentMethod,
      })
    );

    if (buyNowItem) {
      setBuyNowItem(null);
    } else {
      clearCart();
      setCartItem({});
    }

    navigate('/order-confirmation');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const [firstName = '', ...rest] = formData.fullName.trim().split(' ');
      const lastName = rest.join(' ');

      const address = {
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        country: 'India',
        billing: sameAsShipping ? {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
        } : {
          ...billingFormData
        }
      };

      const payload = { address, items: orderItems, amount: total };

      if (method === 'cod') {
        const orderId = generateOrderId();
        const result = await axios.post(
          serverUrl + '/api/order/placeorder',
          payload,
          { withCredentials: true }
        );

        if (result.data) {
          handleSuccessOrder(orderId, address, 'Cash on Delivery');
        }
      } else if (method === 'razorpay') {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          toast.error('Razorpay SDK failed to load');
          setLoading(false);
          return;
        }

        const result = await axios.post(
          serverUrl + '/api/order/razorpay',
          payload,
          { withCredentials: true }
        );

        if (result.data && result.data.success) {
          const { order, dbOrderId } = result.data;

          const options = {
            key: "rzp_test_Sy0TyziJKKL38N", 
            amount: order.amount,
            currency: order.currency,
            name: "OneCart",
            description: "Order Payment",
            order_id: order.id,
            handler: async function (response) {
              try {
                const verifyRes = await axios.post(
                  serverUrl + '/api/order/verifyRazorpay',
                  {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: dbOrderId
                  },
                  { withCredentials: true }
                );

                if (verifyRes.data && verifyRes.data.success) {
                  const uiOrderId = generateOrderId();
                  handleSuccessOrder(uiOrderId, address, 'Razorpay');
                } else {
                  toast.error('Payment Verification Failed');
                }
              } catch (err) {
                console.error(err);
                toast.error('Payment Verification Error');
              }
            },
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: formData.phone
            },
            theme: {
              color: "#46d1f7"
            }
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.on('payment.failed', function (response) {
            toast.error('Payment failed: ' + response.error.description);
          });
          paymentObject.open();
        } else {
          toast.error('Failed to create Razorpay order');
        }
      }
    } catch (error) {
      console.error('Order placement failed:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <div className="max-w-[1100px] mx-auto px-4 pt-[90px] pb-20">
        <div className="mb-8">
          <Title text1="CHECKOUT" text2="" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Left: Delivery form ── */}
          <div className="lg:w-[55%]">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              
              {/* Shipping Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[#aaf5fa] text-[18px] font-semibold mb-1">
                  Shipping Information
                </h2>
                <FormField label="Full Name *" type="text" name="fullName" placeholder="John Doe" required value={formData.fullName} onChange={onChange} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Email Address *" type="email" name="email" placeholder="you@example.com" required value={formData.email} onChange={onChange} />
                  <FormField label="Phone Number *" type="tel" name="phone" placeholder="+91 98765 43210" required value={formData.phone} onChange={onChange} />
                </div>
                <FormField label="Street Address *" type="text" name="street" placeholder="House / Flat no., Street, Area" required value={formData.street} onChange={onChange} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="City *" type="text" name="city" placeholder="Mumbai" required value={formData.city} onChange={onChange} />
                  <FormField label="State *" type="text" name="state" placeholder="Maharashtra" required value={formData.state} onChange={onChange} />
                  <FormField label="Pincode *" type="text" name="pinCode" placeholder="400001" required pattern="\d{6}" title="6-digit pincode" value={formData.pinCode} onChange={onChange} />
                </div>
              </div>

              <hr className="border-[#80808030]" />

              {/* Billing Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#aaf5fa] text-[18px] font-semibold">
                    Billing Information
                  </h2>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-[#46d1f7]" 
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                    />
                    <span className="text-[#8db4bc] text-[14px]">Same as shipping</span>
                  </label>
                </div>
                
                {!sameAsShipping && (
                  <div className="flex flex-col gap-4 mt-2 p-4 bg-[#ffffff05] rounded-xl border border-[#80808030]">
                    <FormField label="Billing Street Address *" type="text" name="street" placeholder="House / Flat no., Street, Area" required={!sameAsShipping} value={billingFormData.street} onChange={onBillingChange} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormField label="City *" type="text" name="city" placeholder="Mumbai" required={!sameAsShipping} value={billingFormData.city} onChange={onBillingChange} />
                      <FormField label="State *" type="text" name="state" placeholder="Maharashtra" required={!sameAsShipping} value={billingFormData.state} onChange={onBillingChange} />
                      <FormField label="Pincode *" type="text" name="pinCode" placeholder="400001" required={!sameAsShipping} pattern="\d{6}" title="6-digit pincode" value={billingFormData.pinCode} onChange={onBillingChange} />
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-[#80808030]" />

              {/* Payment method */}
              <div className="mt-2">
                <p className="text-[#8db4bc] text-[13px] font-medium mb-3">
                  Payment Method
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div 
                    onClick={() => setMethod('razorpay')}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${method === 'razorpay' ? 'bg-[#1a3540] border-[#46d1f7]' : 'bg-[#ffffff06] border-[#80808030] hover:border-[#8db4bc]'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === 'razorpay' ? 'border-[#46d1f7]' : 'border-[#6a8a90]'}`}>
                      {method === 'razorpay' && <div className="w-2 h-2 rounded-full bg-[#46d1f7]" />}
                    </div>
                    <span className="text-white text-[14px] font-semibold">Razorpay</span>
                  </div>

                  <div 
                    onClick={() => setMethod('cod')}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${method === 'cod' ? 'bg-[#1a3540] border-[#46d1f7]' : 'bg-[#ffffff06] border-[#80808030] hover:border-[#8db4bc]'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-[#46d1f7]' : 'border-[#6a8a90]'}`}>
                      {method === 'cod' && <div className="w-2 h-2 rounded-full bg-[#46d1f7]" />}
                    </div>
                    <span className="text-white text-[14px] font-semibold">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full sm:w-auto sm:px-10 h-[50px] bg-[#46d1f7] text-[#0c2025] font-bold text-[16px] rounded-xl hover:bg-[#aaf5fa] transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Loading /> : method === 'razorpay' ? 'Pay Now' : 'Place Order →'}
              </button>
            </form>
          </div>

          {/* ── Right: Order summary ── */}
          <div className="lg:w-[45%]">
            <h2 className="text-[#aaf5fa] text-[18px] font-semibold mb-5">
              Order Summary
            </h2>

            <div className="bg-[#ffffff06] border border-[#80808030] rounded-xl overflow-hidden">
              <div className="divide-y divide-[#80808020] max-h-[320px] overflow-y-auto">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4">
                    <div className="relative flex-shrink-0">
                      <img src={item.image1} alt={item.name} className="w-[60px] h-[60px] object-cover rounded-lg" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#46d1f7] text-[#0c2025] text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[14px] font-medium truncate">{item.name}</p>
                      {item.size !== 'default' && <p className="text-[#8db4bc] text-[12px]">Size: {item.size}</p>}
                    </div>
                    <span className="text-[#aaf5fa] font-semibold text-[14px] flex-shrink-0">
                      {currency} {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#80808030] p-4 flex flex-col gap-2 text-[14px]">
                <div className="flex justify-between text-[#8db4bc]">
                  <span>Subtotal</span>
                  <span className="text-white">{currency} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8db4bc]">
                  <span>Shipping</span>
                  <span className="text-white">{currency} {delivery_fee}</span>
                </div>
                <div className="flex justify-between font-bold text-[16px] pt-2 border-t border-[#80808030]">
                  <span className="text-white">Total</span>
                  <span className="text-[#aaf5fa]">{currency} {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#1a354040] border border-[#80808030] rounded-xl text-[13px] text-[#8db4bc] flex flex-col gap-1">
              <p className="font-semibold text-[#aaf5fa] text-[14px] mb-1">📦 Shipping Info</p>
              <p>Standard delivery: 3–5 business days</p>
              <p>Free shipping on orders above {currency} 500</p>
              <p>COD available across India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;