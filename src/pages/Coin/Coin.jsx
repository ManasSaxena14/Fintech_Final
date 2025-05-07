import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
// URL se coin ID lene ke liye
import { useParams } from "react-router-dom";

// Context se currency ka access
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  // URL se coinId nikaal rahe hain
  const { coinId } = useParams();

  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();

  // Context se currency le rahe hain
  const { currency } = useContext(CoinContext);

  // Coin ki current details fetch karne ka function
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-VG4K5ie9paJGe4nPaB2jRNqm", // API key
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  // Coin ka historical chart data fetch karne ka function
  const fetchHistoricalCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-VG4K5ie9paJGe4nPaB2jRNqm",
      },
    };

    // Last 10 din ka data API se le rahe hain
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  // Jab component mount ho ya currency change ho, to data fetch ho
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalCoinData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        {/* Coin ka image aur naam */}
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>

        {/* Line chart show kar rahe hain */}
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

        {/* Coin ki basic info */}
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    // Agar data load nahi hua to spinner dikhayenge
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
