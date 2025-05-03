import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchProducts,
  setCategoryFilter,
  setRating,
  setSortBy,
} from "../features/clothSlice";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const dispatch = useDispatch();
  const { clothes, status, error, categoryFilter, rating, sortBy, search } =
    useSelector((state) => state.clothes);
  const { category: paramsCategoryFilter } = useParams();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    let updatedFilters = categoryFilter ? [...categoryFilter] : [];

    if (
      categoryFilter?.includes(selectedCategory) ||
      categoryFilter?.includes(paramsCategoryFilter)
    ) {
      updatedFilters = updatedFilters.filter((cat) => cat !== selectedCategory);
    } else {
      updatedFilters.push(selectedCategory);
    }

    dispatch(setCategoryFilter(updatedFilters));
  };
  const filteredClothes = !categoryFilter?.length
    ? clothes
    : clothes?.filter((c) => categoryFilter?.includes(c.category));

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    dispatch(setRating(parseInt(rating)));
  };
  const clothesAfterRating = filteredClothes.filter((c) => c.rating >= rating);

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };
  const sortedClothes = [...clothesAfterRating].sort((a, b) => {
    if (sortBy === "low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "high") return (b.price || 0) - (a.price || 0);
    return 0;
  });
  const searchedProduct =
    search === ""
      ? sortedClothes
      : sortedClothes.filter(
          (p) =>
            p.productName.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)
        );

  useEffect(() => {
    if (paramsCategoryFilter) {
      dispatch(setCategoryFilter([paramsCategoryFilter]));
    } else {
      dispatch(setCategoryFilter([]));
    }
    dispatch(fetchProducts());
  }, [dispatch, paramsCategoryFilter]);
  return (
    <>
      <div className="mx-4 my-3">
        <div className="row">
          <div className="col-lg-2">
            <div className="row">
              <h1 className="col">Filters</h1>
              <div className="col">
                <button
                  onClick={() => {
                    dispatch(setCategoryFilter([]));
                    dispatch(setRating(0));
                    dispatch(setSortBy(""));
                  }}
                  className="btn fs-4 text-secondary link-underline-secondary"
                >
                  Clear
                </button>
              </div>
            </div>
            <div>
              <h3 className="mt-4">Category</h3>
              <input
                type="checkbox"
                name="category"
                value="Men"
                onChange={handleCategoryChange}
                checked={categoryFilter?.includes("Men")}
              />{" "}
              Men
              <br />
              <input
                type="checkbox"
                name="category"
                value="Women"
                onChange={handleCategoryChange}
                checked={categoryFilter?.includes("Women")}
              />{" "}
              Women
              <br />
              <input
                type="checkbox"
                name="category"
                value="Kids"
                onChange={handleCategoryChange}
                checked={categoryFilter?.includes("Kids")}
              />{" "}
              Kids
              <br />
              <input
                type="checkbox"
                name="category"
                value="Others"
                onChange={handleCategoryChange}
                checked={categoryFilter?.includes("Others")}
              />{" "}
              Others
            </div>
            <div>
              <h3 className="mt-5">Rating</h3>
              <input
                type="radio"
                name="rating"
                value="4"
                onChange={handleRatingChange}
                checked={rating === 4}
              />{" "}
              4 stars & above
              <br />
              <input
                type="radio"
                name="rating"
                value="3"
                onChange={handleRatingChange}
                checked={rating === 3}
              />{" "}
              3 stars & above
              <br />
              <input
                type="radio"
                name="rating"
                value="2"
                onChange={handleRatingChange}
                checked={rating === 2}
              />{" "}
              2 stars & above
              <br />
              <input
                type="radio"
                name="rating"
                value="1"
                onChange={handleRatingChange}
                checked={rating === 1}
              />{" "}
              1 stars & above
            </div>
            <div>
              <h3 className="mt-5">Sort by</h3>
              <input
                type="radio"
                name="sort"
                value="low"
                onChange={handleSortChange}
                checked={sortBy === "low"}
              />{" "}
              Price - Low to High
              <br />
              <input
                type="radio"
                name="sort"
                value="high"
                onChange={handleSortChange}
                checked={sortBy === "high"}
              />{" "}
              Price - High to Low
            </div>
          </div>
          <div className="col-lg-10 bg-secondary-subtle rounded">
            <h1 className="py-3 px-3">Showing All Products</h1>
            <ProductList cloth={searchedProduct} />
            {status === "loading" && (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
