import React from "react";

const CurrentDate = () => {
  const date = new Date().toLocaleDateString();

  return (
    <div
      style={{
        fontSize: "18px",
        textAlign: "center",
        marginTop: "8px",
        color: "var(--text-color)", // Dynamically change text color
      }}
    >
      {date}
    </div>
  );
};

export default CurrentDate;
