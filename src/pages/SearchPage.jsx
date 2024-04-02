import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import {
  fetchAsyncSearchProduct,
  getSearchProducts,
  setSearchTerm,
  getSearchProductsStatus,
  clearSearch,
} from "../store/searchSlice";
import BackNavigateButton from "../components/BackNavigateButton";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const {sortBy} = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);

  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchAsyncSearchProduct(searchTerm, sortBy));
  }, [searchTerm, sortBy]);

  if (searchProducts.length === 0) {
    return (
      <div
        className="container"
        style={{
          minHeight: "70vh",
        }}
      >
        <div className="text-3xl text-red-500 py-5">
          <h3>No Products found.</h3>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full">
      <div className="flex justify-center items-center mt-5 text-5xl">
        <BackNavigateButton />
      </div>
      <div className="search-content flex justify-center items-center mx-auto  bg-gradient-to-br from-transparent via-purple-300 to-transparent">
        <div className="container ">
          <div className="py-5 flex justify-center flex-col items-center">
            <div className="title-md">
              <h3>Search results:</h3>
            </div>
            <br />
            {searchProductsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={searchProducts} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
