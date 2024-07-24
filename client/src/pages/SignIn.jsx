import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice"; 
import Oauth from "../components/Oauth";

export default function SignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading,error} = useSelector((state) => state.user);
  const [success, setSuccess] = useState(null);

  const [formdata, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      setSuccess("Login Successful...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      dispatch(signInFailure(error.message)); 
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6 mt-14">
      <h1 className="text-4xl text-center font-bold text-gray-900">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg uppercase hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          type="submit"
        >
          {loading ? <FaSpinner className="animate-spin" /> : 'Sign In'}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5 text-gray-600">
        <p>Dont have an account?</p>
        <Link to="/sign-up" className="text-blue-700 hover:underline">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {success && <p className="text-green-500 mt-5">{success}</p>}
    </div>
  );
}