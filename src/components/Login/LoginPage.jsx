import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogoSLI from "../../assets/logoSLI.png";
import BackUrl from "../../Axios/backUrl";

import RatingContext from "../../context/RatingContext";

const apiUrl = BackUrl;

function LoginPage() {
  const { showToast } = useContext(RatingContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      navigate("/home");
    } catch (error) {
      showToast(error.message , {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-cream h-screen flex justify-center pt-36">
      <div className="flex flex-col gap-16">
        <img
          src={LogoSLI}
          alt="Logo SLI"
          className="w-8.5/10  mx-auto border rounded-full"
        />
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-md p-2 w-full"
              placeholder="Votre email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded-md p-2 w-full"
              placeholder="Votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
