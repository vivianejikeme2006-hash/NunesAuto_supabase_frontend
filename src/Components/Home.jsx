import NavBar from "./NavBar";
import "./Home.css";

function Home() {
  return (
    <div className="homePage">
      <NavBar />

      <section className="hero">
        <div className="heroText">
          <div className="searchBar">
            <div className="searchField">Select Car</div>
            <div className="searchField">Select Part</div>
            <button className="searchButton">Search Now</button>
          </div>

          <h1>
            Find Your Dream<br />
            <span>Car Part</span>
          </h1>
          <p>Quality parts, trusted service, and everything Nunes Auto stands for.</p>
          <button className="heroButton">Shop Now</button>
        </div>

        <div className="heroImage">
          <img src="/homeCar.jpg" alt="Featured car"  />
        </div>
      </section>

      <section className="categories">
        <h2>Categories</h2>
        <p className="categoriesSubtext">Find the car part you are looking for</p>
        <div className="categoryGrid">
          <div className="categoryCard">
            <img src="/homeTires.jpg" alt="Wheels & Tires" />
            <span>Wheels &amp; Tires</span>
          </div>
          <div className="categoryCard">
            <img src="/homeInterior.jpg" alt="Accessories" />
            <span>Accessories</span>
          </div>
          <div className="categoryCard">
            <img src="/homeEngine.jpg" alt="Engines" />
            <span>Engines</span>
          </div>
          <div className="categoryCard">
            <img src="/homeLights.jpg" alt="Lights" />
            <span>Lights</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;