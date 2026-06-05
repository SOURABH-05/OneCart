import React from 'react'
import contact from "../assets/contact.jpg"
import NewLetterBox from "../components/NewLetterbox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
      <Title text1={'CONTACT'} text2={'US'} />
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src={contact} alt="Contact OneCart" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm' />
        </div>
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-[white] font-bold lg:text-[18px] text-[15px]'>Our Store</p>
          <div className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px] flex flex-col gap-1'>
            <span>12345 OneCart Boulevard</span>
            <span>Tech City, Maharashtra, India – 400001</span>
          </div>
          <div className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px] flex flex-col gap-1'>
            <span>Tel: +91-9876543210</span>
            <span>Email: contact@onecart.com</span>
          </div>
          <p className='lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold'>Careers at OneCart</p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            We're growing fast! Join our team in Fashion, Grocery, Tech, or Logistics. Learn more about open roles.
          </p>
          <button className='px-[30px] py-[14px] flex items-center justify-center text-[white] bg-[#46d1f720] border border-[#46d1f7] hover:bg-[#46d1f7] hover:text-[#0c2025] transition-all font-semibold rounded-lg'>
            Explore Jobs
          </button>
        </div>
      </div>
      <NewLetterBox />
    </div>
  )
}

export default Contact
