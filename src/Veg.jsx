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

function Veg() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");


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
  //   useEffect(() => {
  //   axios.get("http://localhost:8080/api/Bitzy/vegItems")
  //     .then((res) => {
  //       setVegItems(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching veg items:", err);
  //     });
  // }, []);

  const product = [
    {
      id: 1,
      name: "Veg Dum Biryani",
      price: 199,
      image: "/images/veg/veg-biryani.jpg",
      description: "Aromatic basmati rice with vegetables",
    },
    {
      id: 2,
      name: "Paneer Biryani",
      price: 229,
      image: "/images/veg/paneer-biryani.jpg",
      description: "Paneer dum biryani",
    },
    {
      id: 3,
      name: "Mushroom Biryani",
      price: 189,
      image: "/images/veg/mushroom-biryani.jpg",
      description: "Spicy mushroom dum biryani",
    },
    {
      id: 4,
      name: "Rice Paper Dumplings",
      price: 80,
      image: "/images/veg/rice.jpg",
      description: "Yummy rice dumplings",
    },
    {
      id: 5,
      name: "Jeera Rice",
      price: 120,
      image: "/images/veg/jeera-rice.jpg",
      description: "Cumin flavored rice",
    },
    {
      id: 6,
      name: "Veg Fried Rice",
      price: 149,
      image: "/images/veg/fried-rice.jpg",
      description: "Restaurant style fried rice",
    },
    {
      id: 7,
      name: "Curd Rice",
      price: 99,
      image: "/images/veg/curd-rice.jpg",
      description: "Cooling curd rice with tempering",
    },
    {
      id: 8,
      name: "Paneer Butter Masala",
      price: 219,
      image: "/images/veg/paneer.jpg",
      description: "Creamy paneer curry",
    },
    {
      id: 9,
      name: "Mushroom Curry",
      price: 199,
      image: "/images/veg/mushroom.jpg",
      description: "Spicy mushroom gravy",
    },
    {
      id: 10,
      name: "Mix Veg Curry",
      price: 180,
      image: "/images/veg/mixveg.jpg",
      description: "Mixed vegetable curry",
    },
    {
      id: 11,
      name: "Dal Tadka",
      price: 140,
      image: "/images/veg/dal.jpg",
      description: "Yellow dal with spices",
    },
    {
      id: 12,
      name: "Butter Naan",
      price: 45,
      image: "/images/veg/naan.jpg",
      description: "Soft butter naan",
    },
    {
      id: 13,
      name: "Chapathi",
      price: 50,
      image: "/images/veg/chapathi.jpg",
      description: "Soft chapathi",
    },
    {
      id: 14,
      name: "Masala Dosa",
      price: 90,
      image: "/images/veg/dosa.jpg",
      description: "Crispy dosa with potato filling",
    },
    {
      id: 15,
      name: "Idli Sambar",
      price: 60,
      image: "/images/veg/idli.jpg",
      description: "Soft idli with sambar",
    },
    {
      id: 16,
      name: "Medu Vada",
      price: 70,
      image: "/images/veg/vada.jpg",
      description: "Crispy vada",
    },
    {
      id: 17,
      name: "Poori Curry",
      price: 90,
      image: "/images/veg/poori.jpg",
      description: "Poori with potato curry",
    },
    {
      id: 18,
      name: "Gobi Manchurian",
      price: 169,
      image: "/images/veg/gobi.jpg",
      description: "Crispy gobi starter",
    },
    {
      id: 19,
      name: "Veg Noodles",
      price: 139,
      image: "/images/veg/noodles.jpg",
      description: "Hakka noodles",
    },
    {
      id: 20,
      name: "South Indian Meals",
      price: 179,
      image: "/images/veg/meals.jpg",
      description: "Rice, sambar, rasam, curries",
    },
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

      <div className="menu-page veg-page">
        <h2 className="page-title">Veg Items 🥦</h2>

        <div className="veg-filter-header">
          <div className="veg-search-box">
            <i className="fas fa-search"></i>

            <input
              type="text"
              placeholder="Search veg items..."
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
            <div className="no-items">No veg items found</div>
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
          src="/images/veg.jpg"
          alt="Veg"
        />

        <h3>Veg Menu</h3>

        <p>
          Delicious healthy vegetarian dishes
          made with fresh ingredients.
        </p>

        <NavLink to="/veg">
  <button>View Menu</button>
</NavLink> */}

      {/* </div> */}
    </div>
  );
}

export default Veg;
