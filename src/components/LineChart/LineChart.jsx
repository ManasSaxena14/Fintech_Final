import React, { useEffect, useState } from "react";
import Chart from "react-google-charts"; 

// LineChart component receives historicalData as a prop
const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    // Create a copy of the initial structure
    let dataCopy = [["Date", "Prices"]];

    if (historicalData.prices) {
      historicalData.prices.map((price) => {
        dataCopy.push([
          `${new Date(price[0]).toLocaleDateString().slice(0, -5)}`, // Convert timestamp to readable date (e.g., "1/20")
          price[1], // Price value
        ]);
      });

      // Update chart data
      setData(dataCopy);
    }
  }, [historicalData]); // Re-run when historicalData changes

  // Render Google LineChart 
  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};

export default LineChart; 
