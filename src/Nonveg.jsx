import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./Cart.css";
import "./App.css";
import "./Food.css";

function Nonveg() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const itemsPerPage = 4;

  const priceOptions = [
    { label: "All", value: "all" },
    { label: "Under ₹100", value: "under-100" },
    { label: "₹100 - ₹200", value: "100-200" },
    { label: "Above ₹200", value: "above-200" },
  ];

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added successfully 🛒`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setPriceFilter(value);
    setCurrentPage(1);
  };


  const product = [
    { id: 1, name: "Chicken", price: 200, image: "/images/nonveg/chicken.jpg", description: "Fresh farm chicken" },
    { id: 2, name: "Mutton", price: 500, image: "/images/nonveg/mutton.jpg", description: "Tender goat meat" },
    { id: 3, name: "Fish", price: 300, image: "/images/nonveg/fish.jpg", description: "Fresh river fish" },
    { id: 4, name: "Garlic Chicken", price: 350, image: "/images/nonveg/garlic.jpg", description: "Spicy garlic flavored chicken" },
    { id: 5, name: "Prawns", price: 400, image: "/images/nonveg/prawns.jpg", description: "Juicy sea prawns" },
    { id: 6, name: "Crab", price: 450, image: "/images/nonveg/crab.jpg", description: "Fresh coastal crab" },
    { id: 7, name: "Chicken Curry", price: 220, image: "/images/nonveg/curry.jpg", description: "Traditional spicy curry" },
    { id: 8, name: "Fried Chicken", price: 250, image: "/images/nonveg/fried.jpg", description: "Crispy deep fried chicken" },
    { id: 9, name: "Grilled Chicken", price: 300, image: "/images/nonveg/grill.jpg", description: "Healthy grilled chicken" },
    { id: 10, name: "Chicken Wings", price: 280, image: "/images/nonveg/wings.jpg", description: "Hot and spicy wings" },
    { id: 11, name: "Chicken Biryani", price: 180, image: "/images/nonveg/biryani.jpg", description: "Hyderabadi style biryani" },
    { id: 12, name: "Mutton Biryani", price: 250, image: "/images/nonveg/mbiryani.jpg", description: "Rich mutton biryani" },
    { id: 13, name: "Fish Fry", price: 320, image: "/images/nonveg/fishfry.jpg", description: "Crispy fried fish" },
    { id: 14, name: "Chicken 65", price: 260, image: "/images/nonveg/65.jpg", description: "Spicy South Indian starter" },
    { id: 15, name: "Kebab", price: 350, image: "/images/nonveg/kebab.jpg", description: "Juicy grilled kebabs" },
    { id: 16, name: "Tandoori", price: 400, image: "/images/nonveg/tandoori.jpg", description: "Charcoal cooked chicken" },
    { id: 17, name: "Egg Curry", price: 120, image: "/images/nonveg/eggcurry.jpg", description: "Boiled eggs in gravy" },
    { id: 18, name: "Mutton Head", price: 600, image: "/images/nonveg/head.jpg", description: "Special mutton delicacy" },
    { id: 19, name: "Lobster", price: 800, image: "/images/nonveg/lobster.jpg", description: "Premium seafood item" },
    { id: 20, name: "Squid", price: 500, image: "/images/nonveg/squid.jpg", description: "Soft and tasty squid" }
  ];



  const filteredProducts = product.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "under-100"
          ? item.price < 100
          : priceFilter === "100-200"
            ? item.price >= 100 && item.price <= 200
            : item.price > 200;

    return matchesSearch && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div id="menu-section" className="menu-container">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="menu-page nonveg-page">
        <h2 className="page-title">Nonveg Items 🍗</h2>

        <div className="veg-filter-header">
          <div className="veg-search-box">
            <i className="fas fa-search"></i>

            <input
              type="text"
              placeholder="Search chicken, mutton, fish..."
              value={search}
              onChange={handleSearchChange}
            />

            {search && (
              <button
                className="clear-search-btn"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          <div className="veg-price-filter">
            {priceOptions.map((option) => (
              <button
                key={option.value}
                className={`price-pill ${priceFilter === option.value ? "active" : ""
                  }`}
                onClick={() => handlePriceChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="food-container">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="food-card" key={item.id}>
                <div className="img-box">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="food-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>

                  <div className="food-bottom">
                    <span className="price">₹{item.price}</span>

                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-items">No nonveg items found</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`page-btn ${currentPage === index + 1 ? "active" : ""
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>



      {/* <div className="menu-card">

        <img
          src="/images/nonveg.jpg"
          alt="NonVeg"
        />

        <h3>NonVeg Menu</h3>

        <p>
          Tasty chicken and meat dishes full
          of spicy flavors.
        </p>

        <NavLink to="/nonveg">
  <button>View Menu</button>
</NavLink>

      </div> */}
    </div>
  );
}

export default Nonveg;