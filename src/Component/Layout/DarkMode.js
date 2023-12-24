import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch,useSelector } from "react-redux";
import { themeActions } from "../../store/theme";
import "./DarkMode.css";

const DarkMode = () => {
  const dispatch = useDispatch();
 
  const darkMode = useSelector((state)=>state.theme.isDark)
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");

    if (selectedTheme === "dark") {
      setDarkMode();
      console.log("Setting dark mode");
    } else {
      setLightMode();
      console.log("Setting ligth mode");
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const toggleTheme = (e) => {
    if (!darkMode) {
      setDarkMode();
      console.log("Setting dark ");
    } else {
      setLightMode();
      console.log("Setting ligth mode");
    }
    
    dispatch(themeActions.toggleTheme());
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={darkMode}
        
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <FaSun />
        <FaMoon/>
      </label>
    </div>
  );
};

export default DarkMode;
