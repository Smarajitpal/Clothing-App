import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setSearchFilter } from "../features/clothSlice";
import { setLoggedInUser } from "../features/userSlice";

const Header = () => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { loggedInUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    dispatch(setLoggedInUser({ ...loggedInUser, isLoggedIn: false }));
    navigate("/userLogin");
  };

  const handleSearch = (event) => {
    navigate("/product");
    event.preventDefault();
    dispatch(setSearchFilter(search));
  };
  return (
    <>
      <div className="container my-2">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <NavLink
              to="/"
              className="navbar-brand fs-4 text-primary-emphasis fs-fantasy"
              style={{
                fontFamily: "fantasy",
                fontSize: "1.5rem",
                color: "#0d6efd",
              }}
            >
              Outfique
            </NavLink>
            <div className="d-flex justify-content-center">
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
            {loggedInUser.isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle fs-5 text-primary-emphasis"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {loggedInUser.userFirstName}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item text-center bg-white text-black"
                      to="/profile"
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item text-center bg-white text-black"
                      to="/orders"
                    >
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-center"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink className="btn btn-outline-secondary" to="/userLogin">
                Login
              </NavLink>
            )}

            <div className="d-flex">
              <NavLink className="nav-link me-5 text-secondary" to="/wishlist">
                <i className="fa-regular fa-heart fa-2x">
                  {wishlist.length === 0 ? (
                    <span></span>
                  ) : (
                    <span
                      className="translate-middle badge border-light rounded-circle bg-info"
                      style={{ fontSize: "17px", padding: "3px 6px" }}
                    >
                      {wishlist?.length}
                    </span>
                  )}
                </i>
              </NavLink>
              <NavLink className="nav-link ms-5 text-black-50" to="/cart">
                <i className="fas fa-shopping-cart fa-2x">
                  {cart.length === 0 ? (
                    <span></span>
                  ) : (
                    <span
                      className="translate-middle badge border-light rounded-circle bg-info"
                      style={{ fontSize: "17px", padding: "3px 6px" }}
                    >
                      {cart?.length}
                    </span>
                  )}
                </i>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
