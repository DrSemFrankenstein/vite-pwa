import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import beepSound from "../assets/beep.mp3";

export default function ScannerComponent() {
  const [scannedData, setScannedData] = useState([]);
  const [cameraActive, setCameraActive] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(false);

  const handleScan = (result) => {
    if (result) {
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
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) handleScan(result);
            if (err) handleError(err);
          }}
          facingMode="environment"
          torch={flashEnabled}
        />
      )}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setCameraActive(!cameraActive)}>
          {cameraActive ? "Stop Camera" : "Start Camera"}
        </button>
        <button onClick={() => setFlashEnabled(!flashEnabled)}>
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
