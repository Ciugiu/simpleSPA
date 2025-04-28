// Components import
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import AlertComp from "../components/AlertComp";

// Utility imports
import { checkEmail } from "../utils/checkFormErrors";
import { apiUrl } from "../utils/apiUrl";

// React imports
import { useState } from "react";

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
      if (!checkEmail.checkEmpty(email)) {
        throw new Error("Email cannot be empty.");
      }
      if (!checkEmail.checkFormat(email)) {
        throw new Error("Invalid email format.");
      }

      setError("");

      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Invalid credentials, please check your email and password."
          );
        }
        throw new Error(
          "An error occurred while logging in. Please try again."
        );
      }

      const token = await response.text();

      if (!token) {
        throw new Error("No token received from the server.");
      }

      localStorage.setItem("token", token);
      // console.log("Login successful!");

      window.location.href = "/";
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
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
      <br />
      {error && <AlertComp alertType="alert-danger" text={error} />}
      <br />
      <div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default LogIn;
