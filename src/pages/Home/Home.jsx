import React, { useContext, useEffect, useState } from "react";
import "./Home.css"; 
import { CoinContext } from "../../context/CoinContext"; 
import { Link } from "react-router-dom"; 

const Home = () => {
  // Access global coin data and currency symbol from context
  const { allCoins, currency } = useContext(CoinContext);

  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  // Handle typing in the search input
  const inputHandler = (e) => {
    setInput(e.target.value);

    // If input is cleared, show all coins again
    if (e.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };

  // Handle search karne ke liye
  const searchHandler = async (e) => {
    e.preventDefault();

    // Filter coins based on name 
    const coins = await allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(input.toLowerCase())
    );

    setDisplayCoins(coins);
  };

  // On initial load or when allCoins updates, set displayCoins
  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>
          Largest <br />
          The Crypto Nexus
        </h1>
        <p>
        Enter the ultimate hub for real-time crypto intel — track, analyze, and conquer the digital economy.
        </p>

        {/* Search Form */}
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto..."
            required
          />

          {/* Datalist for auto-suggestions */}
          <datalist id="coinlist">
            {allCoins.map((coin, index) => (
              <option key={index} value={coin.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      {/* Crypto Table */}
      <div className="crypto-table">
        {/* Table Header Row */}
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {/* Display top 10 filtered coins */}
        {displayCoins.slice(0, 10).map((coin, index) => (
          <Link to={`./coin/${coin.id}`} className="table-layout" key={index}>
            <p>{coin.market_cap_rank}</p>
            <div>
              <img src={coin.image} alt="" />
              <p>{coin.name + " - " + coin.symbol}</p>
            </div>
            <p>
              {currency.symbol} {coin.current_price.toLocaleString()}
            </p>
            <p
              className={
                coin.price_change_percentage_24h > 0 ? "green" : "red"
              }
            >
              {Math.floor(coin.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {coin.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 
