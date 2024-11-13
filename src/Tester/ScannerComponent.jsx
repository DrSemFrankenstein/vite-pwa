import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import beepSound from "../assets/beep.mp3";
import { useMediaQuery } from "react-responsive";

export default function ScannerComponent() {
  const [scannedData, setScannedData] = useState([]);
  const [cameraActive, setCameraActive] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [lastScannedTime, setLastScannedTime] = useState(0);

  // Responsive width and height using react-responsive
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const scannerWidth = isSmallScreen ? 300 : 500;
  const scannerHeight = isSmallScreen ? 300 : 500;

  const SCAN_DELAY = 2000; // 2 seconds delay

  const handleScan = (result) => {
    const currentTime = Date.now();
    if (result && currentTime - lastScannedTime > SCAN_DELAY) {
      setLastScannedTime(currentTime);
      setScannedData((prevData) => {
        const existingItem = prevData.find((item) => item.data === result.text);
        if (existingItem) {
          return prevData.map((item) =>
            item.data === result.text
              ? { ...item, count: item.count + 1 }
              : item
          );
        } else {
          return [...prevData, { data: result.text, count: 1 }];
        }
      });
      makeBeep();
      flashScreen();
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const makeBeep = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  const flashScreen = () => {
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    flash.style.zIndex = "9999";
    flash.style.pointerEvents = "none";
    document.body.appendChild(flash);
    setTimeout(() => {
      document.body.removeChild(flash);
    }, 100);
  };

  return (
    <div>
      {cameraActive && (
        <BarcodeScannerComponent
          width={scannerWidth}
          height={scannerHeight}
          onUpdate={(err, result) => {
            if (result) handleScan(result);
            if (err) handleError(err);
          }}
          facingMode="environment"
          torch={flashEnabled}
        />
      )}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setCameraActive(!cameraActive)}
          style={{ marginRight: 10 }}
        >
          {cameraActive ? "Stop Camera" : "Start Camera"}
        </button>
        <button
          onClick={() => setFlashEnabled(!flashEnabled)}
          style={{ marginRight: 10 }}
        >
          {flashEnabled ? "Turn Flash Off" : "Turn Flash On"}
        </button>
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
