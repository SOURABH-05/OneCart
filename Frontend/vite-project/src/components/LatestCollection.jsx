import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'

import Card from './Card'
import { shopDataContext } from '../context/ShopContext'

const LatestCollection = () => {
   const {products} = useContext(shopDataContext)
    const [latestProduct , setLatestProduct] = useState([])

    useEffect(() => {
        if (!products || products.length === 0) return;

        // Group by category
        const byCategory = {};
        products.forEach(p => {
            const cat = p.category || 'Other';
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(p);
        });

        // Pick 1-2 from each category in rotation until we have 10
        const categories = Object.keys(byCategory);
        const picked = [];
        let round = 0;
        while (picked.length < 10 && round < 5) {
            categories.forEach(cat => {
                if (picked.length < 10 && byCategory[cat][round]) {
                    picked.push(byCategory[cat][round]);
                }
            });
            round++;
        }

        // Shuffle the final picked list so order is random
        setLatestProduct(picked.sort(() => Math.random() - 0.5));
    }, [products]);

  return (
    <div>
        <div className='h-[8%] w-[100%] text-center md:mt-[50px]  '>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 '>Explore Fashion, Grocery, Dairy, Footwear & More – All in One Place!</p>
      </div>

      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
       {
        latestProduct.map((item, index)=>(
            <Card 
              key={index} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image1} 
              category={item.category}
              rating={item.rating ?? (item.bestseller ? 4.8 : 4.2)}
            />
        ))
       }
      </div>
    </div>
  )
}

export default LatestCollection