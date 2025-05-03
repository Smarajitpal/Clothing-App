import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  deleteWishlistProductAsync,
  fetchWishlist,
} from "../features/wishlistSlice";
import { Link } from "react-router-dom";
import { addProductAsync, updateProductAsync } from "../features/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, status, error } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const handleClick = (pro) => {
    const { _id, ...proData } = pro;
    let existingProduct;
    if (cart && cart.length > 0) {
      existingProduct = cart.find(
        (c) => c.productId === proData.productId && c.size === proData.size
      );
    }
    if (existingProduct) {
      dispatch(
        updateProductAsync({
          clothId: existingProduct.productId,
          newQuantity: existingProduct.quantity + 1,
        })
      );
      dispatch(deleteWishlistProductAsync(proData.productId));
      alert("Product Already in the Cart.");
    } else {
      dispatch(addProductAsync(proData));
      dispatch(deleteWishlistProductAsync(proData.productId));
      alert("Product Added to Cart!");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteWishlistProductAsync(id));
    alert("Item Removed from Wishlist!");
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1 className="text-center mt-3">My WishList</h1>
        {status === "loading" && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <p>{error}</p>}
        <ul className="row">
          {wishlist.length > 0 ? (
            wishlist.map((w) => (
              <li
                key={w._id}
                className="card mb-3 py-3 col-md-2 me-5 rounded-0"
              >
                <Link to={`/productDetails/${w.productId}`}>
                  <img
                    className="card-img-top img-fluid rounded-0"
                    src={w.productImageUrl}
                    alt={w.productName}
                  />
                </Link>
                <div className="text-center">
                  <h2 className="mt-3">{w.productName}</h2>
                  <h4>₹ {w.price}</h4>
                  <button
                    className="col-md-8 btn btn-secondary rounded-0"
                    onClick={() => handleClick(w)}
                  >
                    Move to cart
                  </button>
                  <button
                    className="col-md-8 mt-3 btn btn-outline-info rounded-0"
                    onClick={() => handleDelete(w.productId)}
                  >
                    Remove Item
                  </button>
                </div>
              </li>
            ))
          ) : (
            <h1 className="text-center mt-4 text-primary">No Products</h1>
          )}
        </ul>
      </div>
    </>
  );
};

export default Wishlist;
