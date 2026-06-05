import React, { useEffect, useState } from 'react'
import BackGround from '../components/BackGround'
import Hero from '../components/Hero'
import Product from './Product'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterbox'
import Footer from '../components/Footer'


const Home = () => {
  const [heroCount, setHeroCount] = useState(0)
  const heroData = [
    { text1: "Everything You Need,", text2: "Delivered to You" },
    { text1: "Step Up Your Style,", text2: "Find Your Perfect Pair" },
    { text1: "Fresh Groceries &", text2: "Daily Essentials" },
    { text1: "Farm Fresh Dairy &", text2: "Quality Milk Products" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='overflow-x-hidden relative top-[70px]'>
      <div className="w-[100vw] lg:h-[100vh] md:h-[60vh] sm:h-[40vh] min-h-[400px] bg-gradient-to-l from-[#141414] to-[#0c2025] relative flex">
        {/* Background image takes right 60% */}
        <div className="absolute inset-0">
          <BackGround heroCount={heroCount} />
          {/* Gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2025ee] via-[#0c202590] to-transparent" />
        </div>

        {/* Hero text takes left 55% */}
        <div className="relative z-10 w-full lg:w-[55%] h-full flex items-center">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
