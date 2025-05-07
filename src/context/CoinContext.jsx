// CoinContext banane ke liye import
import { createContext, useEffect, useState } from "react";

// Context create kiya
export const CoinContext = createContext();

// Provider component
const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // Coin data fetch karne wala function
  const fetchAllCoin = async () => {
    // API call options
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-VG4K5ie9paJGe4nPaB2jRNqm", // API key
      },
    };


    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoins(res))
      .catch((err) => console.error(err));
  };

  // Currency change hone par fetch call
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
  };

  // Children ko context wrap karke return
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
