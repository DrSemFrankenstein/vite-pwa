import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ReduxPage from "./Pages/ReduxPage";
import ThemeToggle from "./Components/ThemeToggle";
import ScreenMode from "./Components/ScreenMode";
import DrawerMenu from "./Components/DrawerMenu"; // Import DrawerMenu
import "./App.css"; // Assuming this includes the styles
import Tester from "./Pages/Tester";
import Tester2 from "./Pages/Tester2";

function App() {

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
    },
    {
      title: <Link to="/about">About</Link>,
    },
    // {
    //   title: <Link to="/reduxpage">Redux</Link>,
    // },
    {
      title: <Link to="/test">Tester</Link>,
    },
    {
      title: <Link to="/test2">Tester2</Link>,
    },
  ];

  return (
    <>
      <ScreenMode />
      <Router>
        <div>
          {/* Static Breadcrumb Navigation and Drawer Menu for Small Screens */}
          <div
            className="breadcrumb-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Breadcrumb for larger screens */}
            <div className="breadcrumb-for-large">
              <Breadcrumb style={{ margin: 0 }} items={breadcrumbItems} />
            </div>

            <ThemeToggle />

            {/* Drawer Menu for smaller screens */}
            <div className="breadcrumb-for-small">
              <DrawerMenu />
            </div>
          </div>

          {/* Routes with margin-top for content */}
          <div className="body-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/reduxpage" element={<ReduxPage />} /> */}
              <Route path="/test" element={<Tester />} />
              <Route path="/test2" element={<Tester2 />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
