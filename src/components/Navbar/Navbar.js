import React from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/icon.jpeg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  if (window.location.pathname.includes("admin")) {
    return null;
  }
  return (
    <div className={style.main}>
      <div className={style.container}>
        <Link to="/">
          <div
            className={style.left}
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
        </Link>
        <div className={style.center}>
          <ul>
            <li>
              <Link to="/services">{t("navbar.link1")}</Link>
            </li>
            <li>
              <Link to="/about">{t("navbar.link2")}</Link>
            </li>
            <li>
              <Link to="/orders">{t("navbar.link3")}</Link>
            </li>
          </ul>
        </div>
        <div className={style.right}>
          <button onClick={() => changeLanguage("ru")}>RU</button>
          <button onClick={() => changeLanguage("uz")}>UZ</button>
          <h2>+998 (99) 602 66 11</h2>
          <div className={style.button}>
            <Link to="/services">{t("navbar.btn")}</Link>
          </div>
          <hr />
          <hr />
          <div className={style.button}>
            <Link to="/services">{t("profile.enter")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
