import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProductsByCategory,
  fetchAsyncProductsOfCategory,
  getCategoryProductsStatus,
} from "../store/categorySlice";
import Loader from "../components/Loader";
import { STATUS } from "../utils/status";
import BackNavigateButton from "../components/BackNavigateButton";

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);

  return (
    <div className="cat-products py-5 bg-gradient-to-br from-transparent via-purple-300 to-transparent h-full ">
      <div className="flex justify-center items-center mt-5 text-5xl">
        <BackNavigateButton />
      </div>
      <div className="title-md text-2xl text-center font-semibold">
        <h3>
          See our{" "}
          <span className="text-capitalize">{category.replace("-", " ")}</span>
        </h3>
      </div>
      <div className="container flex justify-center mx-auto">
        <div className="cat-products-content">
          {categoryProductsStatus === STATUS.LOADING ? (
            <Loader />
          ) : (
            <ProductList products={categoryProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;
