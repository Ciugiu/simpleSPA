import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState<Record<string, string | File>>({});

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
    { name: "image", label: "Avatar", type: "file", id: "imageInput" },
  ];

  return (
    <form
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
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
      <div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default SignUp;
