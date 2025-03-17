import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authContext';
import '../styles/nav.css';
import MobileMenu from './moblieMenu';

function Nav() {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        boxSizing: "border-box"
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span style={{ color: "#FFD700", fontSize: "1.5rem" }}>Todo App</span>
        </Link>

        <button
          className="navbar-toggler"
          onClick={toggleMenu}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#todoNavbar"
          aria-controls="todoNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "#FFD700" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        <MobileMenu isOpen={menuOpen} onClose={closeMenu} user={user} logOut={logOut} />

        <div className="collapse navbar-collapse" id="todoNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{ color: "#FFD700", fontSize: "1.2rem" }}
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/createTask"
                    style={{ color: "#FFD700", fontSize: "1.2rem" }}
                  >
                    Create Task
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={logOut}
                    style={{ color: "#FFD700", fontSize: "1.2rem", cursor: "pointer" }}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={{ color: "#FFD700", fontSize: "1.2rem" }}
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: "#FFD700", fontSize: "1.2rem" }}
                  >
                    Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
