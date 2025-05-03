import { Link } from "react-router-dom";
import { addProductAsync, updateProductAsync } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addWishlistProductAsync } from "../features/wishlistSlice";

const ProductList = ({ cloth }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const { cart } = useSelector((state) => state.cart);

  const handleClick = (product) => {
    const data = {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      productImageUrl: product.productImageUrl,
    };
    if (!selectedSize && product.size.length > 0) {
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
            clothId: existingProduct.productId,
            newQuantity: existingProduct.quantity + 1,
          })
        );
        alert("Item Already in the Cart.");
      } else {
        dispatch(addProductAsync(data));
        setSelectedSize("");
        alert("Product Added to Cart!");
      }
    }
  };

  const handleWishlistClick = (product) => {
    const data = {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      productImageUrl: product.productImageUrl,
    };
    if (!selectedSize && product.size.length > 0) {
      alert("Select a size");
    } else {
      dispatch(addWishlistProductAsync(data));
      setSelectedSize("");
      alert("Product Added to Wishlist!");
    }
  };
  return (
    <>
      <div>
        <ul className="row">
          {cloth?.map((c) => (
            <li key={c._id} className="card mb-3 py-3 col-md-3 rounded-0">
              <Link to={`/productDetails/${c.productId}`}>
                <img
                  className="card-img-top img-fluid rounded-0"
                  src={c.productImageUrl}
                  alt={c.productName}
                />
              </Link>
              <div className="text-center">
                <h2>{c.productName}</h2>
                <p>
                  <b>₹ {c.price}</b>
                </p>
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target={`#offcanvas-${c._id}`}
                  aria-controls={`offcanvas-${c._id}`}
                >
                  Add To Cart
                </button>

                <div
                  className="offcanvas offcanvas-end"
                  tabIndex="-1"
                  id={`offcanvas-${c._id}`}
                  aria-labelledby={`offcanvas-${c._id}-label`}
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id={`offcanvas-${c._id}-label`}
                    >
                      Select a Size
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    {c.size.map((s, index) => (
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
                    <br />
                    <button
                      className="btn btn-secondary mt-5"
                      onClick={() => handleClick(c)}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
                <br />
                <button
                  className="btn bg-secondary-subtle mt-3"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target={`#wishlist-offcanvas-${c._id}`}
                  aria-controls={`wishlist-offcanvas-${c._id}`}
                >
                  Add To Wishlist
                </button>
                <div
                  className="offcanvas offcanvas-end"
                  tabIndex="-1"
                  id={`wishlist-offcanvas-${c._id}`}
                  aria-labelledby={`wishlist-offcanvas-${c._id}-label`}
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id={`wishlist-offcanvas-${c._id}-label`}
                    >
                      Select a Size
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    {c.size.map((s, index) => (
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
                    <br />
                    <button
                      className="btn btn-secondary mt-5"
                      onClick={() => handleWishlistClick(c)}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
