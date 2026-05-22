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
import "./app.css";
import "./Food.css";

function Desserts() {
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


  // DESSERT ITEMS

  const product = [
    { id: 1, name: "Chocolate Lava Cake", price: 249, image: "/images/desserts/lava-cake.jpg", description: "Warm chocolate cake with molten center" },

    { id: 2, name: "Red Velvet Pastry", price: 199, image: "/images/desserts/red-velvet.jpg", description: "Soft creamy red velvet delight" },

    { id: 3, name: "Blueberry Cheesecake", price: 299, image: "/images/desserts/cheesecake.jpg", description: "Creamy cheesecake topped with blueberries" },

    { id: 4, name: "Brownie Sundae", price: 229, image: "/images/desserts/brownie.jpg", description: "Chocolate brownie with ice cream" },

    { id: 5, name: "Tiramisu", price: 349, image: "/images/desserts/tiramisu.jpg", description: "Classic Italian coffee dessert" },

    { id: 6, name: "Belgian Waffle", price: 259, image: "/images/desserts/waffle.jpg", description: "Crispy waffle with chocolate syrup" },

    { id: 7, name: "Macarons Box", price: 399, image: "/images/desserts/macarons.jpg", description: "Premium colorful French macarons" },

    { id: 8, name: "Strawberry Pancakes", price: 279, image: "/images/desserts/pancakes.jpg", description: "Fluffy pancakes with strawberries" },

    { id: 9, name: "Chocolate Truffle", price: 189, image: "/images/desserts/truffle.jpg", description: "Rich chocolate truffle cake" },

    { id: 10, name: "Ice Cream Delight", price: 219, image: "/images/desserts/icecream.jpg", description: "Premium vanilla & chocolate scoop combo" },

    { id: 11, name: "Fruit Tart", price: 249, image: "/images/desserts/tart.jpg", description: "Fresh fruit tart with cream filling" },

    { id: 12, name: "Mango Mousse", price: 199, image: "/images/desserts/mousse.jpg", description: "Smooth mango flavored mousse" },

    { id: 13, name: "Choco Donut", price: 149, image: "/images/desserts/donut.jpg", description: "Soft donut with chocolate glaze" },

    { id: 14, name: "Caramel Custard", price: 179, image: "/images/desserts/custard.jpg", description: "Classic caramel pudding dessert" },

    { id: 15, name: "Vanilla Cupcake", price: 129, image: "/images/desserts/cupcake.jpg", description: "Soft vanilla cupcake with cream" },

    { id: 16, name: "Ferrero Shake", price: 299, image: "/images/desserts/shake.jpg", description: "Premium Ferrero Rocher milkshake" },

    { id: 17, name: "Oreo Milkshake", price: 249, image: "/images/desserts/oreo.jpg", description: "Creamy Oreo flavored shake" },

    { id: 18, name: "Falooda Special", price: 199, image: "/images/desserts/falooda.jpg", description: "Royal falooda with ice cream" },

    { id: 19, name: "Rasmalai", price: 159, image: "/images/desserts/rasmalai.jpg", description: "Soft rasmalai in saffron milk" },

    { id: 20, name: "Gulab Jamun", price: 139, image: "/images/desserts/gulabjamun.jpg", description: "Hot gulab jamun with syrup" }
  ];

  // PAGINATION

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

      <div className="menu-page desserts-page">
        <h2 className="page-title"> Premium Desserts 🍰</h2>

        <div className="veg-filter-header">
          <div className="veg-search-box">
            <i className="fas fa-search"></i>

            <input
              type="text"
              placeholder="Search cake, ice cream, sweets..."
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
            <div className="no-items">No desserts found</div>
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
          src="/images/dessert.jpg"
          alt="Dessert"
        />

        <h3>Desserts</h3>

        <p>
          Sweet desserts and ice creams to
          complete your meal.
        </p>

        <NavLink to="/desserts">
  <button>View Menu</button>
</NavLink>

      </div> */}
    </div>
  );
}

export default Desserts;