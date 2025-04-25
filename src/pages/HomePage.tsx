import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProducts";

const HomePage = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err: string | any) {
        console.error("Error loading products:", err);
        setLoading(false);
        setError(err.message);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!product && "No products found"}
      {error && <p>Error loading products: {error}</p>}
      <ul>
        {product.map((product: any) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
