// Component imports
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import AlertComp from "../components/AlertComp";

// Utility imports
import { apiUrl } from "../utils/apiUrl";

// React imports
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { productId } = useParams();
  // console.log("productId from URL:", productId);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const product = await response.json();
        setProductName(product.name);
        setProductPrice(product.price);
        setProductDescription(product.description);
        setProductImage(product.imageUrl);
        setProductCategory(product.category);
        setProductStock(product.stockQuantity);
      } catch (error) {
        console.error(error);
        setError("Failed to load product details.");
      }
    };
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleChange = (field: string) => (value: string) => {
    switch (field) {
      case "name":
        setProductName(value);
        break;
      case "description":
        setProductDescription(value);
        break;
      case "price":
        setProductPrice(value);
        break;
      case "imageUrl":
        setProductImage(value);
        break;
      case "category":
        setProductCategory(value);
        break;
      case "stockQuantity":
        setProductStock(value);
        break;
      default:
        break;
    }
  };

  const fieldConfig = [
    { name: "name", label: "Product Name", type: "text", id: "nameInput" },
    {
      name: "description",
      label: "Description",
      type: "text",
      id: "descriptionInput",
    },
    { name: "price", label: "Price", type: "number", id: "priceInput" },
    { name: "imageUrl", label: "Image URL", type: "text", id: "imageInput" },
    { name: "category", label: "Category", type: "text", id: "categoryInput" },
    { name: "stockQuantity", label: "Stock", type: "number", id: "stockInput" },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setError("");

      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productName,
          price: productPrice,
          description: productDescription,
          imageUrl: productImage,
          category: productCategory,
          stockQuantity: productStock,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid input, please check your data.");
        }
        if (response.status === 403) {
          throw new Error("You are not authorized to update this product.");
        }
        throw new Error(
          "An error occurred while updating the product. Please try again."
        );
      }
      setTimeout(() => {
        navigate("/");
      });
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      {fieldConfig.map(({ name, label, type, id }) => (
        <div className="mb" key={name}>
          <LabelComp htmlFor={id} displayText={label} />
          <InputForm
            id={id}
            type={type}
            value={
              name === "name"
                ? productName
                : name === "description"
                ? productDescription
                : name === "price"
                ? productPrice
                : name === "imageUrl"
                ? productImage
                : name === "category"
                ? productCategory
                : name === "stockQuantity"
                ? productStock
                : ""
            }
            onChange={handleChange(name)}
            ariaDescribe={`${id}Help`}
          />
        </div>
      ))}
      <div>
        <br />
        {error && <AlertComp alertType="alert-danger" text={error} />}
        <br />
        <button className="btn btn-primary" type="submit">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default UpdateProductPage;
