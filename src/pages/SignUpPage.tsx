// Component imports
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import AlertComp from "../components/AlertComp";

// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Environment variable import
const apiUrl = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [error, setError] = useState("");

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fieldConfig = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      id: "firstNameInput",
    },
    { name: "lastName", label: "Last Name", type: "text", id: "lastNameInput" },
    { name: "email", label: "Email", type: "email", id: "emailInput" },
    { name: "password", label: "Password", type: "password", id: "pwdInput" },
    { name: "role", label: "Role", type: "text", id: "roleInput" },
    { name: "imageUrl", label: "Avatar", type: "text", id: "imageInput" },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      console.log("Form submitted:", formData);

      setError("");

      const response = await fetch(`${apiUrl}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid input, please check your data.");
        }
        throw new Error(
          "An error occurred while signing up. Please try again."
        );
      }

      if (response.status === 201) {
        const data = await response.json();
        console.log("User signed up successfully:", data);
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <form
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-center">Sign up</h1>
      {fieldConfig.map(({ name, label, type, id }) => (
        <div className="mb-3" key={name}>
          <LabelComp htmlFor={id} displayText={label} />
          <InputForm
            id={id}
            type={type}
            value={typeof formData[name] === "string" ? formData[name] : ""}
            onChange={handleChange(name)}
            ariaDescribe={`${id}Help`}
          />
        </div>
      ))}
      {error && <AlertComp alertType="alert-danger" text={error} />}
      <div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignUp;
