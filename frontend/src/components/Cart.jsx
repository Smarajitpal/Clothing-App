import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  deleteProductAsync,
  updateProductAsync,
  setTotalItems,
  setTotalItemPrice,
} from "../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addWishlistProductAsync } from "../features/wishlistSlice";

const Cart = () => {
  const { cart, status, error } = useSelector((state) => state.cart);
  const { loggedInUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalItemPrice, totalAmount, totalItems;
  if (cart.length > 0) {
    totalItemPrice = cart?.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    totalAmount =
      totalItemPrice > 4999 ? totalItemPrice + 0 : totalItemPrice + 199;
    totalItems = cart?.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  const handleClick = (clothId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch(deleteProductAsync(clothId));
      alert("Product removed from cart.");
    } else {
      const data = { clothId, newQuantity };
      dispatch(updateProductAsync(data));
    }
  };

  const handleWishlist = (pro) => {
    const { _id, ...proData } = pro;
    dispatch(deleteProductAsync(pro.productId));
    dispatch(addWishlistProductAsync(proData));
    alert("Item moved to wishlist!");
  };

  const handleDelete = (pId) => {
    dispatch(deleteProductAsync(pId));
    alert("Product removed from cart.");
  };

  const handleCheckout = () => {
    if (loggedInUser.isLoggedIn) {
      dispatch(setTotalItems(totalItems));
      dispatch(setTotalItemPrice(totalItemPrice));
      navigate("/orderSummary");
    } else {
      navigate("/userLogin");
    }
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  return (
    <div className="container bg-secondary-subtle">
      <h1 className="text-center py-4">My Cart</h1>
      {status === "loading" && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      {cart?.length > 0 ? (
        <div className="row">
          <div className="col-md-6">
            <ul>
              {cart?.map((c) => (
                <li key={c._id} className="card mb-4 rounded-0">
                  <div className="row">
                    <div className="col-md-4">
                      <Link to={`/productDetails/${c.productId}`}>
                        <img
                          className="img-fluid"
                          src={c.productImageUrl}
                          alt={c.productName}
                        />
                      </Link>
                    </div>
                    <div className="col-md-8 ps-5 mb-3">
                      <p className="mt-3 fs-4">{c.productName}</p>
                      <h3>
                        <b>₹ {c.price}</b>
                      </h3>
                      <p>
                        Quantity:{" "}
                        <button
                          className="btn"
                          onClick={() =>
                            handleClick(c.productId, c.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="border border-2 px-2 rounded">
                          {c.quantity}
                        </span>
                        <button
                          className="btn"
                          onClick={() =>
                            handleClick(c.productId, c.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </p>
                      <p>Size: {c.size ? <>{c.size}</> : "NA"}</p>
                      <button
                        className="btn bg-secondary-subtle rounded-0"
                        onClick={() => handleDelete(c.productId)}
                      >
                        Remove From Cart
                      </button>
                      <br />
                      <button
                        className="btn btn-outline-secondary mt-3 rounded-0"
                        onClick={() => handleWishlist(c)}
                      >
                        Move To Wishlist
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <div className="card container rounded-0">
              <h3 className="mt-3 text-center">Price Details</h3>
              <hr className="border-2" />
              <p className="text-center">
                Price({totalItems} item{totalItems > 1 ? "s" : ""}) ₹
                {totalItemPrice}
              </p>
              <p className="text-center">
                Delivery Charges ₹{totalItemPrice > 4999 ? 0 : 199}
              </p>
              <hr className="border-2" />
              <h4 className="text-center">Total Amount ₹{totalAmount}</h4>
              <hr className="border-2" />
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-primary col-md-12 rounded-0"
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-primary">Cart is empty</h2>
          <Link className="btn btn-primary my-3 col-md-2" to="/product">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
