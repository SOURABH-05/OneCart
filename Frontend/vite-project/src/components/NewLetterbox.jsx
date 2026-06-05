import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Could hook up to an email service later
    alert('Thanks for subscribing! Check your inbox for your 20% off code.');
  }

  return (
    <div className='w-[100%] py-16 bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center gap-[10px] flex-col'>
      <p className='md:text-[32px] text-[22px] text-[#a5faf7] font-bold px-[20px] text-center'>
        Subscribe & Get 20% Off Your First Order
      </p>
      <p className='md:text-[16px] text-[14px] text-center text-blue-100 px-[20px] max-w-[500px]'>
        Be the first to hear about new arrivals across Fashion, Grocery, Dairy & more. Exclusive deals, weekly.
      </p>
      <form onSubmit={handleSubmit} className='w-[100%] flex items-center justify-center mt-[20px] gap-[10px] px-[20px] flex-wrap'>
        <input
          type="email"
          placeholder='Enter your email address'
          className='placeholder:text-[#6a8a90] bg-[#1a3540] border border-[#80808060] text-white w-[500px] max-w-[80%] h-[50px] px-[20px] rounded-xl focus:outline-none focus:border-[#46d1f7] transition-colors'
          required
        />
        <button
          type='submit'
          className='text-[15px] px-[30px] h-[50px] bg-[#46d1f7] text-[#0c2025] font-bold rounded-xl hover:bg-[#aaf5fa] transition-all active:scale-95'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox
