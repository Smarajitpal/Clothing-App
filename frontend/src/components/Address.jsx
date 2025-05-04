import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAsync,
  deleteAddressAsync,
  fetchAddress,
  updateAddressAsync,
} from "../features/addressSlice";

const Address = () => {
  const { loggedInUser } = useSelector((state) => state.users);
  const { address, status, error } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [editAddress, setEditAddress] = useState(false);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    deliveryName: "",
    mobileNumber: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altPhoneNumber: "",
  });
  const handleReset = () => {
    setFormData({
      deliveryName: "",
      mobileNumber: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      altPhoneNumber: "",
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (update) {
      dispatch(updateAddressAsync(formData));
      setUpdate(false);
      handleReset();
      setEditAddress(false);
    } else {
      dispatch(addAddressAsync({ ...formData, userId: loggedInUser._id }));
      handleReset();
      setEditAddress(false);
    }
  };

  const handleAddressUpdate = (a) => {
    setUpdate(true);
    setEditAddress(true);
    setFormData({ ...a });
  };

  const handleAddressDelete = (id) => {
    dispatch(deleteAddressAsync(id));
    alert("Address Deleted Successfully!");
  };

  const handleAddressEdit = () => {
    setEditAddress(!editAddress);
    if (!editAddress) {
      setUpdate(!update);
    }
    handleReset();
    setUpdate(false);
  };

  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(fetchAddress(loggedInUser._id));
    }
  }, [dispatch, loggedInUser._id]);
  return (
    <>
      <div className="bg-secondary-subtle container pb-4">
        <h1>Manage Address</h1>
        {editAddress === false && (
          <button
            onClick={handleAddressEdit}
            className="btn text-primary fs-4 col-md-12 bg-info-subtle rounded-0 my-3"
          >
            Add A New Address
          </button>
        )}
        {editAddress && (
          <form
            onSubmit={handleSubmit}
            className="bg-info-subtle py-3 ps-3 mt-4"
          >
            <div className="row container">
              <input
                className="col form-control form-control-lg rounded-0 me-3"
                name="deliveryName"
                type="text"
                placeholder="Name"
                value={formData.deliveryName}
                onChange={handleFormChange}
                required
              />
              <input
                className="col form-control form-control-lg rounded-0"
                name="mobileNumber"
                type="number"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="row container mt-3">
              <input
                className="col form-control form-control-lg me-3 rounded-0"
                name="pincode"
                type="number"
                placeholder="PinCode"
                value={formData.pincode}
                onChange={handleFormChange}
                required
              />
              <input
                className="col form-control form-control-lg rounded-0"
                name="locality"
                type="text"
                placeholder="Locality"
                value={formData.locality}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="row container mt-3">
              <textarea
                name="address"
                rows="3"
                className="form-control form-control-lg rounded-0 "
                placeholder="Address(Area and Street)"
                value={formData.address}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            <div className="row container mt-3">
              <input
                className="col form-control form-control-lg me-3 rounded-0"
                name="city"
                type="text"
                placeholder="City/District/Town"
                value={formData.city}
                onChange={handleFormChange}
                required
              />
              <input
                className="col form-control form-control-lg rounded-0"
                name="state"
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="row container mt-3">
              <input
                className="col form-control form-control-lg me-3 rounded-0"
                name="landmark"
                type="text"
                placeholder="Landmark (Optional)"
                value={formData.landmark}
                onChange={handleFormChange}
              />
              <input
                className="col form-control form-control-lg rounded-0"
                name="altPhoneNumber"
                type="number"
                placeholder="Alternate Phone (Optional)"
                value={formData.altPhoneNumber}
                onChange={handleFormChange}
              />
            </div>
            <button
              className="btn btn-lg mt-3 btn-primary col-md-3 rounded-0"
              type="submit"
            >
              Save
            </button>
            <button
              onClick={handleAddressEdit}
              className="btn btn-lg btn-secondary ms-4 mt-3 col-md-3 rounded-0"
            >
              Cancel
            </button>
          </form>
        )}
        <div>
          {status === "loading" && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && <p>{error}</p>}
          {address && address.length > 0 ? (
            <ul className="list-group">
              {address.map((a) => (
                <li key={a._id} className="list-group-item rounded-0 border">
                  <div className="row">
                    <h5 className="col-md-3">{a.deliveryName}</h5>
                    <h5 className="col-md-4">{a.mobileNumber}</h5>
                  </div>
                  <p className="mt-2">
                    {a.address}, {a.locality}, {a.city}, {a.state}-
                    <b>{a.pincode}</b>
                  </p>
                  <div>
                    <button
                      className="btn text-danger"
                      onClick={() => handleAddressDelete(a._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn text-primary"
                      onClick={() => handleAddressUpdate(a)}
                    >
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h4 className="text-center mt-3 text-danger">No Address</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Address;
