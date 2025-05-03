import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "./ProductList";
import { addProductAsync, updateProductAsync } from "../features/cartSlice";

const ProductDetails = () => {
  const { clothes } = useSelector((state) => state.clothes);
  const { cart } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { proId } = useParams();

  const product = clothes?.find((c) => c.productId === proId);

  const similarProduct = clothes.filter(
    (p) => p.category === product?.category && p.productId !== product.productId
  );

  const handleBuyNowClick = () => {
    const data = {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      productImageUrl: product.productImageUrl,
    };

    if (product.size.length > 0) {
      if (!selectedSize) {
        alert("Select a size");
      } else {
        let existingProduct;
        if (cart && cart.length > 0) {
          existingProduct = cart.find(
            (c) => c.productId === data.productId && c.size === data.size
          );
        }
        if (existingProduct) {
          dispatch(
            updateProductAsync({
              clothId: product.productId,
              newQuantity: existingProduct.quantity + quantity,
            })
          );
          navigate("/cart");
        } else {
          dispatch(addProductAsync(data));
          navigate("/cart");
        }
      }
    } else {
      dispatch(addProductAsync(data));
      navigate("/cart");
    }
  };

  const handleAddToCart = () => {
    const data = {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      productImageUrl: product.productImageUrl,
    };
    if (product.size.length > 0) {
      if (!selectedSize) {
        alert("Select a size");
      } else {
        let existingProduct;
        if (cart && cart.length > 0) {
          existingProduct = cart.find(
            (c) => c.productId === data.productId && c.size === data.size
          );
        }
        if (existingProduct) {
          dispatch(
            updateProductAsync({
              clothId: product.productId,
              newQuantity: existingProduct.quantity + quantity,
            })
          );
          alert("Product Already in Cart.");
        } else {
          dispatch(addProductAsync(data));
          alert("Product Added to Cart.");
        }
      }
    } else {
      dispatch(addProductAsync(data));
      alert("Product Added to Cart.")
    }
  };

  return (
    <div className="container mt-3 bg-light">
      {product && (
        <div className="row py-3">
          <div className="col-md-3 text-center">
            <img
              className="img-fluid"
              src={product.productImageUrl}
              alt={product.productName}
            />
            <div className="d-grid gap-2 mx-auto mt-3">
              <button
                className="btn btn-primary rounded-0"
                type="button"
                onClick={handleBuyNowClick}
              >
                Buy Now
              </button>
              <button
                className="btn btn-secondary rounded-0"
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1>{product.productName}</h1>
            <div className="ratings">
              <span className="me-2">{product.rating}</span>
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <i key={i} className="fa fa-star text-warning"></i>
              ))}
            </div>
            <h4 className="mt-3">₹{product.price}</h4>
            <p>
              <b>Quantity: </b>
              <button
                className="btn"
                onClick={() => (quantity === 1 ? 1 : setQuantity(quantity - 1))}
              >
                -
              </button>
              <span className="border border-2 px-2 rounded">{quantity}</span>
              <button className="btn" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </p>
            <p>
              <b>Size: </b>
              {product.size.map((s, index) => (
                <button
                  key={index}
                  onClick={(e) => setSelectedSize(e.target.value)}
                  value={s}
                  className={`btn btn-sm me-2 ${
                    selectedSize === s
                      ? "btn-secondary text-white"
                      : "btn-outline-secondary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </p>
            <hr />
            <div className="row">
              {product.isFreeDeliveryAvailable ? (
                <div className="col-md-2 text-center">
                  <i className="fa-solid fa-truck fs-3"></i>
                  <p className="mt-2">Free Delivery</p>
                </div>
              ) : (
                ""
              )}
              {product.isPayOnDeliveryAvailable ? (
                <div className="col-md-2 text-center">
                  <i className="fa-solid fa-money-bill-wave fs-3"></i>
                  <p className="mt-2">Pay on Delivery</p>
                </div>
              ) : (
                ""
              )}
              {product.isPaymentSecure ? (
                <div className="col-md-2 text-center">
                  <i className="fa-regular fa-credit-card fs-3"></i>
                  <p className="mt-2">Secure Payment</p>
                </div>
              ) : (
                ""
              )}
              {product.returnTime ? (
                <div className="col-md-2 text-center">
                  <i className="fa-solid fa-rotate-right fs-3"></i>
                  <p className="mt-2">{product.returnTime} days Returnable</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <hr />
            <p>
              <b>Description:</b>
            </p>
            <p>{product.description}</p>
          </div>
        </div>
      )}

      <hr />
      <h2>More items you may like</h2>
      <div>
        <ProductList cloth={similarProduct} />
      </div>
    </div>
  );
};

export default ProductDetails;
