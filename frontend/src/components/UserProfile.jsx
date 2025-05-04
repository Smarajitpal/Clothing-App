import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAsync,
  setLoggedInUser,
  updateUserAsync,
} from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import Address from "./Address";
import { deleteAllAddressAsync } from "../features/addressSlice";
import { deleteAllOrdersAsync } from "../features/orderSlice";

const Profile = () => {
  const { loggedInUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEdit, setIsEdit] = useState(false);
  const [editedUser, setEditedUser] = useState(loggedInUser);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleTabClick = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  const handleLogout = () => {
    dispatch(setLoggedInUser({ ...loggedInUser, isLoggedIn: false }));
    navigate("/product");
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    dispatch(updateUserAsync({ ...editedUser, isLoggedIn: false }));
    dispatch(setLoggedInUser(editedUser));
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    dispatch(deleteUserAsync(loggedInUser._id));
    navigate("/product");
    dispatch(setLoggedInUser({ ...loggedInUser, isLoggedIn: false }));
    dispatch(deleteAllAddressAsync(loggedInUser._id));
    dispatch(deleteAllOrdersAsync(loggedInUser._id));
    alert("User Deleted Successfully");
  };

  return (
    <>
      {loggedInUser && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-3 bg-warning-subtle">
              <h5 className="mt-4">Hello, </h5>
              <h4>{loggedInUser.userFirstName}</h4>
              <hr />
              <button
                className={`btn btn-lg ${
                  activeTab === "orders" ? "text-primary" : "text-dark"
                }`}
                onClick={() => handleTabClick("orders")}
              >
                My Orders
              </button>
              <br />
              <button
                className={`btn btn-lg ${
                  activeTab === "profile" ? "text-primary" : "text-dark"
                }`}
                onClick={() => handleTabClick("profile")}
              >
                Profile Information
              </button>
              <br />
              <button
                className={`btn btn-lg ${
                  activeTab === "address" ? "text-primary" : "text-dark"
                }`}
                onClick={() => handleTabClick("address")}
              >
                Manage Addresses
              </button>
              <hr />
              <button
                className="btn btn-lg text-danger fs-4"
                onClick={handleLogout}
              >
                <b>Logout</b>
              </button>
            </div>
            <div className="col-md-9">
              {activeTab === "profile" && (
                <div className="bg-primary-subtle container">
                  <h2 className="pt-3">Personal Information:</h2>
                  {isEdit ? (
                    <>
                      <div className="row container">
                        <input
                          className="form-control form-control-lg rounded-0 col w-50 me-2 ms-3"
                          type="text"
                          name="userFirstName"
                          value={editedUser.userFirstName}
                          onChange={handleInputChange}
                        />
                        <input
                          className="form-control form-control-lg rounded-0 col w-50"
                          type="text"
                          name="userLastName"
                          value={editedUser.userLastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <input
                        className="form-control form-control-lg rounded-0 w-50 mt-5 ms-3"
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                      />
                      <br />
                      <input
                        className="form-control form-control-lg rounded-0 w-50 mt-5 ms-3"
                        type="number"
                        name="phoneNumber"
                        value={editedUser.phoneNumber}
                        onChange={handleInputChange}
                      />
                      <br />
                      <button
                        className="mt-5 btn ms-3 fs-4 text-primary"
                        onClick={handleEdit}
                      >
                        Cancel
                      </button>
                      <button
                        className="mt-5 ms-3 btn fs-4 text-success"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="row">
                        <div className="shadow p-3 mb-5 bg-body-tertiary fs-5 col-md-4 mx-4">
                          {loggedInUser.userFirstName}
                        </div>
                        <div className="shadow p-3 mb-5 bg-body-tertiary fs-5 col-md-4">
                          {loggedInUser.userLastName}
                        </div>
                      </div>
                      <h4>Email Address:</h4>
                      <div className="shadow p-3 mb-5 bg-body-tertiary fs-5 col-md-4 ms-3">
                        {loggedInUser.email}
                      </div>
                      <h4>Phone Number:</h4>
                      <div className="shadow p-3 mb-5 bg-body-tertiary fs-5 col-md-4 ms-3">
                        +91 {loggedInUser.phoneNumber}
                      </div>
                      <button
                        className="btn fs-4 ms-3 text-primary"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="btn fs-4 ms-3 text-danger"
                        onClick={handleDelete}
                      >
                        Delete Account
                      </button>
                    </>
                  )}
                </div>
              )}
              {activeTab === "address" && <Address />}
              {activeTab === "orders" && <Orders />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
