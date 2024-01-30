import { Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlink:href="#bootstrap"></use>
              </svg>
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/home" className="nav-link px-2 link-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="nav-link px-2 link-dark">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="nav-link px-2 link-dark">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="nav-link px-2 link-dark">
                  Services
                </Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <Link to="/logout" className="nav-link px-2 link-dark">
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="nav-link px-2 link-dark">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="nav-link px-2 link-dark">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <p>Welcome {user.username}</p>&nbsp;
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
