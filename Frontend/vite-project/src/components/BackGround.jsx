import React from 'react'

// Using reliable Unsplash images for each category shown in the banner
const slides = [
  {
    // Fashion / Clothing
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600",
    alt: "Fashion Collection"
  },
  {
    // Shoes / Footwear
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600",
    alt: "Premium Footwear"
  },
  {
    // Grocery / Fresh Vegetables
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600",
    alt: "Fresh Groceries"
  },
  {
    // Dairy / Milk
    src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1600",
    alt: "Dairy & Milk"
  }
]

const BackGround = ({heroCount}) => {
  const slide = slides[heroCount] || slides[0];
  return (
    <img
      key={heroCount}
      src={slide.src}
      alt={slide.alt}
      className='bg-slide-in w-[100%] h-[100%] float-left overflow-auto object-cover'
    />
  );
}

export default BackGround