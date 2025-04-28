// Component imports
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import AlertComp from "../components/AlertComp";

// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utils imports
import { apiUrl } from "../utils/apiUrl";

const CreateProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [error, setError] = useState("");

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      // console.log("Form submitted:", formData);

      setError("");

      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid input, please check your data.");
        }
        if (response.status === 403) {
          throw new Error("You are not authorized to create a product.");
        }
        throw new Error(
          "An error occurred while creating the product. Please try again."
        );
      }

      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      {fieldConfig.map(({ name, label, type, id }) => (
        <div className="mb" key={name}>
          <LabelComp htmlFor={id} displayText={label} />
          <InputForm
            id={id}
            type={type}
            value={typeof formData[name] === "string" ? formData[name] : ""}
            onChange={handleChange(name)}
            ariaDescribe="{`${field.id}Help`}"
          />
        </div>
      ))}
      <div>
        <br />
        {error && <AlertComp alertType="alert-danger" text={error} />}
        <br />
        <button className="btn btn-primary" type="submit">
          Create Product
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
