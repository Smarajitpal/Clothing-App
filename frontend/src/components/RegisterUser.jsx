import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUserAsync } from "../features/userSlice";

const RegisterUser = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(true);
  const [exist, setExist] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setCheck(password === event.target.value);
  };

  const handleRegisterClick = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !number ||
      !password ||
      !confirmPassword
    ) {
      alert("Enter all the fields.");
      return;
    }
    const data = {
      userFirstName: firstName,
      userLastName: lastName,
      email,
      phoneNumber: number,
      password,
    };
    if (users && users.length > 0) {
      if (users.find((u) => u.email === email || u.phoneNumber === number)) {
        setExist(true);
        setSuccess(false);
        return;
      } else {
        setExist(false);
      }
    }
    if (!exist) {
      dispatch(addUserAsync(data)).then(() => {
        setExist(false);
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setNumber("");
        setPassword("");
        setConfirmPassword("");
      });
    }
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      <div className="bg-secondary-subtle container mt-3 py-5">
        <div className="d-flex justify-content-center">
          <div className="text-center bg-warning py-5  w-50">
            <h1 className="pt-5">User Registration</h1>
            <div className="d-flex flex-column align-items-center">
              <div className="row mt-3 w-75">
                <input
                  className="col form-control"
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="col form-control"
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                className="form-control w-75 mt-3 mx-auto"
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-control w-75 mt-3 mx-auto"
                type="number"
                value={number}
                placeholder="Phone number"
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                className="form-control w-75 mt-3 mx-auto"
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <input
                className="form-control w-75 mt-3 mx-auto"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleConfirmPasswordChange}
              />
              <div className="text-danger">
                {check ? null : "Passwords do not match!"}
              </div>

              <button
                className="btn btn-secondary my-3"
                onClick={handleRegisterClick}
              >
                Register
              </button>
              <div className="text-success">
                {success ? "Registration Successful" : null}
              </div>
              <div className="text-danger">
                {exist ? "User already Exist" : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
