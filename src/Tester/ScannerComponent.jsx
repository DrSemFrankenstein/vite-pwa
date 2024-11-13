import * as React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function ScannerComponent() {
  const [scannedData, setScannedData] = React.useState([]);

  const handleScan = (result) => {
    if (result) {
      setScannedData((prevData) => {
        // Check if the result already exists in the list
        const existingItem = prevData.find(item => item.data === result);
        if (existingItem) {
          // Increment the counter for this result
          return prevData.map(item => 
            item.data === result ? { ...item, count: item.count + 1 } : item
          );
        } else {
          // Add new result with count 1
          return [...prevData, { data: result, count: 1 }];
        }
      });
    }
  };

  return (
    <div>
   {/* <Scanner onScan={(result) => console.log(result)}/> */}
      <Scanner onScan={handleScan} />
      <div style={{ marginTop: 20 }}>
        <h3>Scanned Results:</h3>
        <ul>
          {scannedData.map((item, index) => (
            <li key={index}>
              Data: {item.data} | Count: {item.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
