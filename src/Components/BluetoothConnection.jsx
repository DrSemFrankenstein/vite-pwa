import React, { useState } from "react";
import { Button, Badge } from "antd";

const BluetoothConnection = () => {
  const [connected, setConnected] = useState(false);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      console.log("Connected to device:", device.name);
      setConnected(true);
    } catch (error) {
      console.error("Bluetooth connection failed:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "16px" }}>
      <Button
        type="primary"
        onClick={connectBluetooth}
        style={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)" }}
      >
        Connect Bluetooth
      </Button>
      <div style={{ marginTop: "8px", color: "var(--text-color)" }}>
        <Badge
          status={connected ? "success" : "error"}
          text={
            <span style={{ color: "var(--text-color)" }}>
              {connected ? "Connected" : "Disconnected"}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default BluetoothConnection;
