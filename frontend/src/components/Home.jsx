import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3 text-center mb-3 ">
            <Link
              to="/product/Men"
              className="link-underline link-underline-opacity-0"
            >
              <img
                className="img-fluid rounded"
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
                alt="Men Clothing"
              />
              <p className="text-secondary">Men Clothing</p>
            </Link>
          </div>
          <div className="col-md-3 text-center mb-3 ">
            <Link
              to="/product/Women"
              className="link-underline link-underline-opacity-0"
            >
              <img
                className="img-fluid rounded"
                src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Women Clothing"
              />
              <p className="text-secondary">Women Clothing</p>
            </Link>
          </div>
          <div className="col-md-3 text-center mb-3 ">
            <Link
              to="/product/Kids"
              className="link-underline link-underline-opacity-0"
            >
              <img
                className="img-fluid rounded"
                src="https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Kids Clothing"
              />
              <p className="text-secondary">Kids Clothing</p>
            </Link>
          </div>
          <div className="col-md-3 text-center mb-3 ">
            <Link
              to="/product/Others"
              className="link-underline link-underline-opacity-0"
            >
              <img
                className="img-fluid rounded"
                src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Others"
              />
              <p className="text-secondary">Others</p>
            </Link>
          </div>
        </div>
        <div>
          <Link to="/product">
            <img
              className="rounded img-fluid "
              src="https://placehold.co/1500x600?text=All+Collections"
              alt="All Collection"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
