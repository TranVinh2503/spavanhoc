import React, { useRef, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import "./header.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const navLinks = [
  {
    display: "Trang chủ",
    display: "Trang Chủ",
    url: "/",
  },

  {
    display: "Khoá học",
    url: "/courses",
  },
  {
    display: "Đăng kí",
    display: "Gói chữa bài",
    url: "/courses",
  },
  {
    display: "Đăng Kí",
    url: "/register",
  },
  {
    display: "Đăng nhập",
    url: "/login",
  },
];

const navLinksLogined = [
  {
    display: "Trang chủ",
    display: "Trang Chủ",
    url: "/",
  },

  {
    display: "Khóa học",
    url: "/courses",
  },
  {
    display: "Khóa học của tôi",
    display: "Các gói",
    url: "/courses",
  },
  {
    display: "các gói của tôi",
    url: "/my_course",
  },
];

const Header = () => {
  const { user } = useContext(AppContext);
  const menuRef = useRef();
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const handleLogout = ()=>{
    localStorage.removeItem('access-token')
    window.location.href = "/"
  }
  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
              <i className="ri-pantone-line"></i> SpaVanHoc.
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {!user
                  ? navLinks.map((item, index) => (
                      <li key={index} className="nav__item">
                        <Link to={item.url}>{item.display}</Link>
                      </li>
                    ))
                  : navLinksLogined.map((item, index) => (
                      <li key={index} className="nav__item">
                        <Link to={item.url}>{item.display}</Link>
                      </li>
                    ))}
                    {
                      user && 
                      <li  className="nav__item">
                      <Link  onClick={handleLogout}> Đăng xuất </Link>
                      <Link  onClick={handleLogout}>Đăng Xuất</Link>
                    </li>
                    }
              </ul>
            </div>

            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <i className="ri-phone-line"></i> +88 0123456789
              </p>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
