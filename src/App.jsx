import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Desserts from "./Desserts";
import Cart from "./Cart";
import Order from "./Order";
import Register from "./Register";
import Login from "./Login";

import "./Food.css";
import "./App.css";

import Swal from "sweetalert2";

import logo from "./assets/logo.svg";

import { useSelector } from "react-redux";

function App() {

  // CART ITEMS

  const cartItems = useSelector(
    (globalState) => globalState.cart
  );

  // TOTAL CART QUANTITY

  const cartQuantity = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // GET USER FROM LOCAL STORAGE

  let user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // LOGOUT FUNCTION

  let logout = () => {

    // Remove user
    localStorage.removeItem("loggedInUser");

    // SweetAlert
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      timer: 1500,
      showConfirmButton: false,
    });

    // Reload after alert
    setTimeout(() => {

      window.location.reload();

    }, 1500);
  };

  return (

    <Router>

      {/* NAVBAR */}

      <nav className="navbar">

        {/* LOGO */}

        <h2 className="logo">

          <img
            src={logo}
            alt="Bitezy Logo"
          />

        </h2>

        {/* NAV LINKS */}

        <div className="nav-links">

          <NavLink to="/">

            <i className="fa-solid fa-house"></i>

            Home

          </NavLink>

          <NavLink to="/veg">

            <i className="fa-solid fa-carrot"></i>

            Veg

          </NavLink>

          <NavLink to="/nonveg">

            <i className="fa-solid fa-drumstick-bite"></i>

            Nonveg

          </NavLink>

          <NavLink to="/desserts">

            <i className="fa-solid fa-martini-glass"></i>

            Desserts

          </NavLink>

          {/* CART */}

          <NavLink
            to="/cart"
            className="cart-nav-link"
          >

            <i className="fa-solid fa-cart-shopping"></i>

            Cart

            <span className="cart-badge">
              {cartQuantity}
            </span>

          </NavLink>

          {/* ORDER */}

          <NavLink
            to="/order"
            className="Order-nav-link"
          >

            <i className="fa-solid fa-list"></i>

            Order

          </NavLink>

          {/* LOGIN / USER SECTION */}

          {
            user ? (

              <div className="user-section">

                <span className="welcome-user">

                  <i className="fa-solid fa-user"></i>

                  Welcome {user.name}

                </span>

                <button
                  className="logout-btn"
                  onClick={logout}
                >

                  <i className="fa-solid fa-right-from-bracket"></i>

                  Logout

                </button>

              </div>

            ) : (

              <NavLink to="/login" className="login-btn">
  Login
</NavLink>
            )
          }

        </div>

      </nav>

      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/veg"
          element={<Veg />}
        />

        <Route
          path="/nonveg"
          element={<Nonveg />}
        />

        <Route
          path="/desserts"
          element={<Desserts />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/order"
          element={<Order />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>

    </Router>
  );
}

export default App;