import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../store/categorySlice";
import { ProductList, Loader } from "../components";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../store/productSLice";
import { STATUS } from "../utils/status";
import FilterSidebar from "../components/FilterSidebar";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);
  const [sortBy, setSortBy] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAsyncProducts(100));
  }, []);

  useEffect(()=>{
    setFilteredProducts([...products]);
  },[products]);

  const handleSortByChange = (sortByOption) =>{
    setSortBy(sortByOption);
    if(sortByOption === "lowest"){
      setFilteredProducts([...filteredProducts.sort((a,b) => a.price - b.price)]);
    }else if(sortByOption === "highest"){
      setFilteredProducts([...filteredProducts.sort((a,b) =>b.price - a.price)]);
    }
  }

  const handleFilterByRating = (minRating) =>{
    const filterByRating = products.filter((product) => product.rating >= minRating);
    console.log("rating", filterByRating);
    setFilteredProducts([...filterByRating]);
  }
  const handleClearFilters = () => {
    setSortBy("");
    setFilteredProducts([...products]);
    console.log('filters cleared');
  };

  // randomizing the products in the list
  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }


  return (
    <main className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <div className="slider-wrapper mb-8">
        <HeaderSlider />
      </div>
      <FilterSidebar 
      onSortByChange={handleSortByChange} 
      onFilterByRating={handleFilterByRating}
      onClearFilters={handleClearFilters}
      />

      <div className="main-content min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center mx-4">
            {categories.map((category, index) => (
              <div className="w-full md:w-1/2 lg:w-1/3 mx-auto px-2 mb-12" key={index}>
                <div className="categories-item">
                  <h3 className="text-2xl font-bold mb-6">{category}</h3>
                  {productStatus === STATUS.LOADING ? (
                    <Loader />
                  ) : (
                    <ProductList
                      products={
                        filteredProducts.filter(product => product.category === category)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
