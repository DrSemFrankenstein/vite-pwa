import React, { useState, useEffect } from "react";

const CurrentTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontSize: "48px",
        fontWeight: "bold",
        textAlign: "center",
        color: "var(--text-color)", // Dynamically change text color
      }}
    >
      {time}
    </div>
  );
};

export default CurrentTime;
