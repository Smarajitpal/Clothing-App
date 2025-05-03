import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderAsync, fetchOrders } from "../features/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const { loggedInUser } = useSelector((state) => state.users);

  const handleOrderDelete = (id) => {
    dispatch(deleteOrderAsync(id));
    alert("Order Canceled Successfully!");
  };

  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(fetchOrders(loggedInUser._id));
    }
  }, [dispatch, loggedInUser]);
  return (
    <div className="container">
      <h1 className="text-center mt-3">Orders</h1>
      {status === "loading" && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      {orders && orders.length > 0 ? (
        <ul className="list-group">
          {orders?.map((o) => (
            <li key={o._id} className="list-group-item rounded-0 mb-3 border">
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="img-fluid"
                    src={o.productImageUrl}
                    alt={o.productName}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{o.productName}</h4>
                  <p>
                    <b>Price: ₹</b>
                    {o.price}
                  </p>
                  <p>
                    <b>Size: </b>
                    {o.size}
                  </p>
                  <p>
                    <b>Quantity: </b>
                    {o.quantity}
                  </p>
                  <p>
                    <b>Delivey Address: </b>
                    {o.address?.deliveryName}
                    {", "}
                    {o.address?.mobileNumber}
                    <br />
                    {o.address?.address}
                    {", "}
                    {o.address?.locality}
                    {", "}
                    {o.address?.city}
                    {", "}
                    {o.address?.state}-{o.address?.pincode}
                  </p>
                  <p>
                    <b>Payment Method:</b>
                    {o.paymentMethod}
                  </p>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleOrderDelete(o._id)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="text-center text-danger">No orders found</h3>
      )}
    </div>
  );
};
export default Orders;
