import "./Home.css";

function Home() {
  return (
    <div className="homePage">
      <section className="hero">
        <div className="heroText">
          <h1>Find Your Dream<br /><span>Car Part</span></h1>
          <p>Quality parts, trusted service, and everything Nunes Auto stands for.</p>
          <button className="heroButton">Shop Now</button>
        </div>
      </section>

      <section className="categories">
        <h2>Categories</h2>
        <p className="categoriesSubtext">Find the car part you are looking for</p>
        <div className="categoryGrid">
          <div className="categoryCard">Wheels &amp; Tires</div>
          <div className="categoryCard">Accessories</div>
          <div className="categoryCard">Engines</div>
          <div className="categoryCard">Lights</div>
        </div>
      </section>
    </div>
  );
}

export default Home;