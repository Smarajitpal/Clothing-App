import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, setLoggedInUser } from "../features/userSlice";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loggedInUser } = useSelector((state) => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [loginValidate, setLoginValidate] = useState(false);
  const [notExist, setNotExist] = useState(false);

  const handleLoginClick = () => {
    if (!email || !password) {
      setCheck(true);
      return;
    } else {
      setCheck(false);
      let correctPaswordUser, wrongPasswordUser;
      if (users && users.length > 0) {
        correctPaswordUser = users.find(
          (u) =>
            (u.email === email || u.phoneNumber === email) &&
            u.password === password
        );
        wrongPasswordUser = users.find(
          (u) =>
            (u.email === email || u.phoneNumber === email) &&
            u.password !== password
        );
      }
      if (correctPaswordUser) {
        dispatch(setLoggedInUser({ ...correctPaswordUser, isLoggedIn: true }));
        setLoginValidate(false);
        setEmail("");
        setPassword("");
        navigate("/product");
      } else if (wrongPasswordUser) {
        setLoginValidate(true);
        return;
      } else {
        setNotExist(true);
      }
    }
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      <div className="bg-secondary-subtle container mt-3 py-5">
        <div className="d-flex justify-content-center">
          <div className="text-center bg-info py-5  w-50">
            <h1 className="pt-5">Login</h1>
            <div className="d-flex flex-column align-items-center">
              <input
                className="form-control w-75 mt-3"
                type="text"
                value={email}
                placeholder="Email or phone number"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="form-control w-75 mt-4 "
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                {check ? (
                  <span className="text-danger">
                    Please Enter a valid Email and Password
                  </span>
                ) : null}
              </div>

              <button
                className="btn btn-secondary mt-3"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <div>
                {loggedInUser.isLoggedIn ? (
                  <span className="text-success">Login successful.</span>
                ) : null}
              </div>
              <div>
                {loginValidate ? (
                  <span className="text-danger">
                    Email and Password do not match.
                  </span>
                ) : null}
              </div>
              <div>
                {notExist ? (
                  <span className="text-danger">
                    User is not registered. Please Register
                  </span>
                ) : null}
              </div>
            </div>
            <h3 className="mt-5">New User</h3>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/registerUser")}
            >
              Register Here
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
