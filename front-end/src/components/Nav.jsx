import logo from "../assets/logo.png";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import InputForm from "./InputForm";
import { Link } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(!!token);

  const closeModal = () => {
    setIsOpen(false);
  };

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleToken = () => setIsLogin(!!token);
    handleToken();
  }, [token]);
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg mt-3 ">
          <a className="navbar-brand" href="#">
            <img src={logo} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav px-2 mx-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/favourites">
                  My Favourites
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/my-recipes">
                  My Recipes
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-lg-3"
                  style={{ borderRadius: "8px" }}
                  onClick={checkLogin}
                >
                  {isLogin ? "Logout" : "Login"}
                </button>
              </li>
              <button style={{ borderRadius: "8px" }} onClick={checkLogin}>
                {isLogin ? "Logout" : "Login"}
              </button>
            </ul>
          </div>
        </nav>
      </header>
      {isOpen && (
        <Modal onClose={closeModal}>
          <InputForm />
        </Modal>
      )}
    </>
  );
}

export default Navbar;
