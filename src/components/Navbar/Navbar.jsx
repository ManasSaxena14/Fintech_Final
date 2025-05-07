import React, { useContext } from "react";
import "./Navbar.css"; 
import logo from "../../assets/logo.png"; 
import { CoinContext } from "../../context/CoinContext"; // Context to manage currency selection globally
import { Link } from "react-router-dom"; 

const Navbar = () => {
  // Destructure the setCurrency function from CoinContext
  const { setCurrency } = useContext(CoinContext);

  const handleCurrencyChange = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "euro":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    // Navbar container
    <div className="navbar">
      {/* Logo linking to the home page */}
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      {/* Currency selection dropdown */}
      <select onChange={handleCurrencyChange}>
        <option value="usd">USD</option>
        <option value="euro">EUR</option>
        <option value="inr">INR</option>
      </select>
    </div>
  );
};

export default Navbar; 
