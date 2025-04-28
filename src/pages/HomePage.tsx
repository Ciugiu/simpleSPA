// Compoenent imports
import CardComponent from "../components/CardComponent";

// React imports
import { useEffect, useState } from "react";

// Utils imports
import { fetchProducts } from "../utils/fetchProducts";

const HomePage = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

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
      {token && (
        <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {product.map((product: any) => (
            <CardComponent
              key={product._id}
              title={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
