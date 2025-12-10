import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("class", localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) { setTheme("dark"); } 
        else { setTheme("light"); }
    };

    return (
        <label className="swap swap-rotate text-brand-primary">
            <input type="checkbox" onChange={handleToggle} checked={theme === "light" ? false : true} />
            <FaSun className="swap-on fill-current w-6 h-6" />
            <FaMoon className="swap-off fill-current w-6 h-6" />
        </label>
    );
};
export default ThemeToggle;