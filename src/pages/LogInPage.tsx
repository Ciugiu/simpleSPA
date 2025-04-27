import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import { useState } from "react";
import { checkEmail } from "../utils/checkFormErrors";
import AlertComp from "../components/AlertComp";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (changedValue: string) => {
    setEmail(changedValue);
  };
  const handlePasswordChange = (changedValue: string) => {
    setPassword(changedValue);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!checkEmail.checkEmpty(email))
        throw new Error("Email cannot be empty.");
      if (!checkEmail.checkFormat(email))
        throw new Error("Invalid email format.");

      setError("");

      const response = await fetch("https://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 401) {
        throw Error(
          "Invalid credentials, please check your email and password."
        );
      }
      const token = await response.json();
      localStorage.setItem("token", token);
    } catch (error: any) {
      console.error("Invalid mail format");
      setError(`Invalid mail format: ${error}`);
    }
  };

  return (
    <form
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <h1 className="text-center">Log In</h1>

      <div className="mb-3">
        <LabelComp htmlFor="emailInput" displayText="Email" />
        <InputForm
          onChange={handleEmailChange}
          value={email}
          type="email"
          id="emailInput"
          ariaDescribe="emailHelp"
        />
      </div>
      <div>
        <LabelComp htmlFor="passwordInput" displayText="Password" />
        <InputForm
          onChange={handlePasswordChange}
          value={password}
          type="password"
          id="passwordInput"
          ariaDescribe="passwordHelp"
        />
      </div>
      {error && <AlertComp alertType="alert-danger" text={error} />}
      <div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default LogIn;
