import React, { useContext, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaFilter } from 'react-icons/fa';
import { MdOutlineFilterAlt } from 'react-icons/md';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';
import SkeletonCard from '../components/SkeletonCard';

const CATEGORIES = ['Clothing', 'Men', 'Women', 'Kids', 'Shoes', 'Dairy', 'Grocery', 'Milk', 'Butter'];

const Collections = () => {
  const { products, search, showSearch } = useContext(shopDataContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let list = [...products];

    if (showSearch && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) => {
        // If Clothing is selected, also include legacy categories (Men, Women, Kids)
        if (selectedCategories.includes('Clothing') && ['Men', 'Women', 'Kids', 'Clothing'].includes(p.category)) {
          return true;
        }
        return selectedCategories.includes(p.category);
      });
    }

    setFilteredProducts(list);
  };

  const sortProducts = () => {
    setFilteredProducts((prev) => {
      const copy = [...prev];
      switch (sortType) {
        case 'low-high':
          return copy.sort((a, b) => a.price - b.price);
        case 'high-low':
          return copy.sort((a, b) => b.price - a.price);
        case 'newest':
          return copy.sort((a, b) => b.date - a.date);
        default:
          return copy; // relevant — keep server order
      }
    });
  };

  // Re-apply filter whenever dependencies change
  useEffect(() => {
    applyFilter();
  }, [products, selectedCategories, search, showSearch]);

  // Sort after filter is applied
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  const isLoading = products.length === 0;

  return (
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2] pb-[110px]">

      {/* ── Sidebar Filters ── */}
      <aside
        className={`md:w-[260px] lg:w-[220px] w-full md:min-h-[100vh] p-5 border-r border-[#80808030] text-[#aaf5fa] lg:fixed flex-shrink-0 transition-all duration-300 ${
          showFilter ? 'h-auto' : 'h-[60px] md:h-auto'
        }`}
      >
        {/* Filter header */}
        <button
          className="flex items-center gap-2 text-[18px] font-semibold mb-4 cursor-pointer w-full text-left md:pointer-events-none"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <MdOutlineFilterAlt className="text-[22px]" />
          FILTERS
          {showFilter ? (
            <FaChevronDown className="text-[14px] ml-auto md:hidden" />
          ) : (
            <FaChevronRight className="text-[14px] ml-auto md:hidden" />
          )}
        </button>

        {/* Category checkboxes */}
        <div className={`${showFilter ? 'block' : 'hidden'} md:block`}>
          <p className="text-[13px] uppercase tracking-widest text-[#8db4bc] mb-3">
            Categories
          </p>
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 accent-[#46d1f7] cursor-pointer"
                />
                <span className="text-[15px] font-light text-[#cef3f6] group-hover:text-white transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>

          {selectedCategories.length > 0 && (
            <button
              className="mt-4 text-[12px] text-[#46d1f7] hover:underline"
              onClick={() => setSelectedCategories([])}
            >
              Clear filters
            </button>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="lg:pl-[230px] w-full px-4 md:px-6 py-4">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            className="bg-[#1a3540] border border-[#46d1f7] text-white rounded-lg px-4 h-[44px] text-[14px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#46d1f7]"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-[#8db4bc] text-[13px] mb-4">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Product grid / skeletons / empty state */}
        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredProducts.length > 0
            ? filteredProducts.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image1}
                  category={item.category}
                  rating={item.rating ?? (item.bestseller ? 4.8 : 4.2)}
                />
              ))
            : (
              /* Empty state */
              <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
                <div className="text-6xl opacity-30">🛍️</div>
                <p className="text-[#8db4bc] text-[18px] font-medium">No products found</p>
                <p className="text-[#8db4bc] text-[13px]">
                  Try adjusting your filters or search term
                </p>
                {selectedCategories.length > 0 && (
                  <button
                    className="mt-2 text-[#46d1f7] text-[14px] border border-[#46d1f7] px-5 py-2 rounded-full hover:bg-[#46d1f7] hover:text-[#0c2025] transition-colors"
                    onClick={() => setSelectedCategories([])}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Collections;