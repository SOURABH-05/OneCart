import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import Card from './Card';

const RelatedProduct = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(shopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!products.length) return;

    // Match by category first, then narrow by subCategory if available
    let matches = products.filter(
      (p) => p.category === category && p._id !== currentProductId
    );

    if (subCategory) {
      const narrowed = matches.filter((p) => p.subCategory === subCategory);
      // Fall back to category-only matches if subCategory returns nothing
      matches = narrowed.length > 0 ? narrowed : matches;
    }

    setRelated(matches.slice(0, 4));
  }, [products, category, subCategory, currentProductId]);

  if (!related.length) return null;

  return (
    <section className="px-4 md:px-10 pb-20">
      <div className="mb-6">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
        {related.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
            category={item.category}
            rating={item.rating ?? (item.bestseller ? 4.8 : 4.2)}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProduct;
