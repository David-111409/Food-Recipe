import logo from "../assets/logo.png";

function Navbar() {
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  My Favourites
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#"> My Recipes</a>
              </li>

              <li className="nav-item">
                <a className="nav-link " href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
