import logo from "./assets/logo.svg"; // ✅ add this (if file exists)




function Home() {
  return (
    <div className="home-container">

      {/* Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="home-content">

        {/* Logo */}
        <img src={logo} alt="logo" style={{ width: "130px" }} style={{
      color: "#ed4e6b",
      fontSize: "45px",
      fontWeight: "bold",
      margin: 0,
    }} />

        <h1 className="hero-title">Welcome to Bitezy 🍴</h1>
        <p>Delicious food at your fingertips</p>
      </div>


      <button class="menu-btn explore-btn" id="exploreBtn">
  Explore Menu
</button>
  
     <div class="explore-popup" id="explorePopup">
  <div class="explore-box">
    <button class="close-explore" id="closeExplore">×</button>

    <h2>Choose Your Menu</h2>
    <p>Fresh, hot, and delicious food is waiting for you.</p>

    <div class="explore-options">
      <a href="veg.html" class="explore-card veg-card">
        <span>🥕</span>
        <h3>Veg Menu</h3>
        <p>Healthy and tasty vegetarian dishes</p>
      </a>

      <a href="nonveg.html" class="explore-card nonveg-card">
        <span>🍗</span>
        <h3>Nonveg Menu</h3>
        <p>Spicy chicken, fish, mutton and more</p>
      </a>
    </div>
  </div>
</div>

        

      
      



    </div>
  );
}

export default Home;