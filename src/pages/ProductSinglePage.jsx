import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../store/productSLice";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import { formatPrice } from "../utils/helpers";
import {
  addToCart,
  getCartMessageStatus,
  setCartMessageOff,
  setCartMessageOn,
} from "../store/cartSlice";
import CartMessage from "../components/CartMessage";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import Popup from "reactjs-popup";
import CheckOut from "../components/CheckOut";
import BackNavigateButton from "../components/BackNavigateButton";
import Rating from "../components/Rating";

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const [rate, setRate] = useState(0)

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));

    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus]);

  let discountedPrice =
    product?.price - product?.price * (product?.discountPercentage / 100);
  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product) => {
    let discountedPrice =
      product?.price - product?.price * (product?.discountPercentage / 100);
    let totalPrice = quantity * discountedPrice;

    dispatch(
      addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice })
    );
    dispatch(setCartMessageOn(true));
  };

  return (
    <main className="py-5 bg-gradient-to-br from-transparent via-purple-300 to-transparent">
      <div className="product-single">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white">
              <div className="overflow-hidden h-96 px-2 rounded-md">
                <img
                  src={product ? (product.images ? product.images[0] : "") : ""}
                  alt=""
                  className="w-full object-cover  h-full "
                />
              </div>
              <div className="flex justify-center mt-4 px-2 space-x-2 ">
                {product?.images?.slice(1, 5).map((image, index) => (
                  <div key={index} className="overflow-hidden w-1/4 h-20">
                    <img
                      src={image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border bg-gray-100 rounded-md p-2">
              <div className="font-manrope">
                <div className="text-2xl font-bold mb-2">{product?.title}</div>
                <p className="text-base mb-4">{product?.description}</p>
                <div className="flex items-center mb-4 space-x-4">
                  <div className="text-gray-700 font-bold">
                    Rating: {product?.rating}
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="text-gray-700 font-bold">
                    Brand: {product?.brand}
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="text-gray-700 font-bold">
                    Category:{" "}
                    {product?.category
                      ? product.category.replace("-", " ")
                      : ""}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="text-gray-500 line-through mr-2">
                      {formatPrice(product?.price)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Inclusive of all taxes
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-orange font-bold text-2xl">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="text-xs text-gray-700 px-2 py-1 ml-2">
                      {product?.discountPercentage}% OFF
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="mr-3">Quantity :</div>
                  <div className="flex items-center border border-gray-500 rounded overflow-hidden">
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center"
                      onClick={decreaseQty}
                    >
                      <AiOutlineMinusCircle className="text-2xl" />
                    </button>
                    <div className="px-2">{quantity}</div>
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center"
                      onClick={increaseQty}
                    >
                      <AiOutlinePlusCircle className="text-2xl" />
                    </button>
                  </div>
                  {product?.stock === 0 && (
                    <div className="ml-3 text-red-500 uppercase text-xs font-bold">
                      out of stock
                    </div>
                  )}
                </div>
                <div className="flex space-x-4 ">
                  <button
                    type="button"
                    className="bg-green-400 border flex items-center justify-center p-3 rounded-md hover:bg-transparent hover:text-green-700"
                    onClick={() => addToCartHandler(product)}
                  >
                    <FaShoppingCart />
                    <span className="ml-2 ">Add to cart</span>
                  </button>
                  <button
                    type="button"
                    className="checkout-btn bg-green-400 p-3 rounded-md hover:bg-transparent hover:text-green-700"
                  >
                    <Popup
                      trigger={<button> Buy now</button>}
                      position="top center"
                      modal
                      nested
                    >
                      <CheckOut />
                    </Popup>
                  </button>
                </div>
                <div className="mt-2 flex">
                    <label className="mr-2">Give Us Rating: </label>
                    <Rating rating={rate} onClick={(i) => setRate(i + 1)}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5 text-5xl">
        <BackNavigateButton />
      </div>
      {cartMessageStatus && <CartMessage />}
    </main>
  );
};

export default ProductSinglePage;
