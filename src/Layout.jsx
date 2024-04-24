import { Outlet, Link } from "react-router-dom";
import Logo from "./assets/logo.png";
import "./App.css";

function Layout() {
  return (
    <div className="container mypro">
      <div className="header1">
        <a href="#" target="_blank" className="logo">
          <img src={Logo} alt="logo" />
        </a>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/newpost">Create Post</Link>
          </li>
          <li>
            <Link to="#">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
