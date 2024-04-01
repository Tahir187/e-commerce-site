import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, []);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

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

  let catProductsOne = products.filter(
    (product) => product.category === categories[0]
  );
  let catProductsTwo = products.filter(
    (product) => product.category === categories[1]
  );
  let catProductsThree = products.filter(
    (product) => product.category === categories[2]
  );
  let catProductsFour = products.filter(
    (product) => product.category === categories[3]
  );

  return (
    <main className="bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <div className="slider-wrapper mb-8">
        <HeaderSlider />
      </div>
      <FilterSidebar />

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
                        index === 0
                          ? catProductsOne
                          : index === 1
                          ? catProductsTwo
                          : index === 2
                          ? catProductsThree
                          : catProductsFour
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
