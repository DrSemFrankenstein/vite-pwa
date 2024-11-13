import React, { useState, useEffect } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    } else {
      setTheme("light");
      document.body.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      style={{
        fontSize: "20px",
        marginLeft: "auto",
        padding: "5px 10px",
        backgroundColor: "var(--background-color)",
        borderRadius: "4px",
        marginRight:"24px"
      }}
    >
      {theme === "light" ? (
        <MoonOutlined style={{ fontSize: "20px", color: "#000" }} />
      ) : (
        <SunOutlined style={{ fontSize: "20px", color: "#fff" }} />
      )}
    </button>
  );
}


export default ThemeToggle;
