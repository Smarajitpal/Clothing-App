import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../features/addressSlice";
import { useEffect, useState } from "react";
import { addOrderAsync } from "../features/orderSlice";
import { useNavigate } from "react-router-dom";
import { deleteProductAsync } from "../features/cartSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const { cart, totalItems, totalItemPrice } = useSelector(
    (state) => state.cart
  );
  const { loggedInUser } = useSelector((state) => state.users);
  const { address } = useSelector((state) => state.address);

  const handleOrder = () => {
    if (!deliveryAddress || !paymentMethod) {
      alert("Please Select Delivery Address or Payment Method");
      return;
    }
    const { _id, userId, ...dAdd } = deliveryAddress;
    const orderData = cart?.map(({ _id, ...item }) => ({
      ...item,
      paymentMethod,
      address: dAdd,
      userId: loggedInUser._id,
    }));
    dispatch(addOrderAsync(orderData));
    alert("Order Placed Successfully.");
    dispatch(deleteProductAsync("all"));
    navigate("/orders");
  };

  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(fetchAddress(loggedInUser._id));
    }
  }, [dispatch, loggedInUser._id]);
  return (
    <div className="container">
      <h1 className="text-center my-3">Order Summary</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="bg-body-secondary container pt-2 pb-1 mb-3">
            <h5 className="text-secondary">LOGIN</h5>
            <p>
              <b>
                {loggedInUser.userFirstName} {loggedInUser.userLastName}
              </b>
              {",  "}
              +91 {loggedInUser.phoneNumber}
            </p>
          </div>
          <div className="bg-body-secondary container pt-2 pb-1 mb-3">
            <h5 className="text-secondary">DELIVERY ADDRESS</h5>
            <ul>
              {address &&
                address?.map((a) => (
                  <li
                    key={a._id}
                    className="list-group-item rounded-0 border bg-light ps-3"
                  >
                    <label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        onChange={() => {
                          setDeliveryAddress(a);
                        }}
                      />
                      <div className="row">
                        <h5 className="col-md-3">{a.deliveryName}</h5>
                        <h5 className="col-md-4">{a.mobileNumber}</h5>
                      </div>
                      <p className="mt-2">
                        {a.address}, {a.locality}, {a.city}, {a.state}-
                        <b>{a.pincode}</b>
                      </p>
                    </label>
                  </li>
                ))}
            </ul>
          </div>
          <div className="bg-body-secondary container pt-2 pb-1 mb-3">
            <h5 className="text-secondary">ORDER SUMMARY</h5>
            <ul>
              {cart &&
                cart?.map((c) => (
                  <li key={c._id} className="card mb-4 rounded-0">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          className="img-fluid"
                          src={c.productImageUrl}
                          alt={c.productName}
                        />
                      </div>
                      <div className="col-md-8 ps-5 mb-3">
                        <p className="mt-3 fs-4">{c.productName}</p>
                        <h3>
                          <b>₹ {c.price}</b>
                        </h3>
                        <p>
                          Quantity:{" "}
                          <span className="border border-2 px-2 rounded">
                            {c.quantity}
                          </span>
                        </p>
                        <p>Size: {c.size ? <>{c.size}</> : "NA"}</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="bg-body-secondary container pt-2 pb-1 mb-3">
            <h5 className="text-secondary">SELECT PAYMENT METHOD</h5>
            <ul>
              <label className="bg-light py-3 ps-3 pe-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Payment"
                  value="UPI"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                UPI
              </label>
              <br />
              <br />
              <label className="bg-light py-3 ps-3 pe-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Payment"
                  value="Credit / Debit / ATM Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Credit / Debit / ATM Card
              </label>
              <br />
              <br />
              <label className="bg-light py-3 ps-3 pe-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Payment"
                  value="Net Banking"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Net Banking
              </label>
              <br />
              <br />
              <label className="bg-light py-3 ps-3 pe-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Payment"
                  value="Cash On Delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Cash On Delivery
              </label>
              <br />
              <br />
              <label className="bg-light py-3 ps-3 pe-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Payment"
                  value="Gift Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Gift Card
              </label>
            </ul>
          </div>
        </div>
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
            <h4 className="text-center">
              Total Amount ₹
              {totalItemPrice > 4999 ? totalItemPrice : totalItemPrice + 199}
            </h4>
            <hr className="border-2" />
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-primary col-md-12 rounded-0"
              onClick={handleOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
