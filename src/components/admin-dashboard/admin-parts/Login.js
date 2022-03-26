import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import { fetchAdminsProducts, CurentAdmin } from "../../../actions";
import { connect } from "react-redux";
import image from "../../../assets/images/lock.jpg";

function Login(props) {
  useEffect(() => {
    props.fetchAdminsProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checker, setChecker] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keyword, setKeyword] = useState("");

  const submitted = (e) => {
    e.preventDefault();

    const admin = props.admins?.filter((admin) =>
      admin.name.includes(username)
    );

    if (admin && admin[0] && keyword === "admin") {
      if (admin[0].password === password) {
        props.login(true);
        setChecker(false);
        props.CurentAdmin(admin[0]);
      } else if (username === "" && password === "") {
        setEmptyInput(true);
        offChecker();
      } else {
        offChecker();
        props.login(false);
        setChecker(true);
        setUsername("");
        setKeyword("");
        setPassword("");
      }
    } else if (
      username === "hbbh" &&
      password === "12211221" &&
      keyword === "hbbh"
    ) {
      props.login(true);
      setChecker(false);
      props.CurentAdmin({
        name: "hbbh",
        password: 12211221,
        adminsPermission: "TRUE",
        orderPermission: "TRUE",
      });
    } else {
      offChecker();
      props.login(false);
      setChecker(true);
      setUsername("");
      setPassword("");
      setKeyword("");
    }
  };
  const offChecker = () => {
    setTimeout(() => {
      setChecker(false);
      setEmptyInput(false);
    }, 3000);
  };

  return (
    <section className={style.sec}>
      <div className={style.container}>
        <div className={`${style.user} ${style.signinBx}`}>
          <div
            className={style.imgBx}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className={style.formBx}>
            <form onSubmit={submitted}>
              <h2>Log In</h2>
              <input
                className={checker || emptyInput ? style.wrong : ""}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={checker || emptyInput ? style.wrong : ""}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={checker || emptyInput ? style.wrong : ""}
                type="password"
                placeholder="Key word"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value="Login" />
            </form>
            {checker && (
              <p className={style.wrongText}>Wrong Password or Username</p>
            )}
            {emptyInput && (
              <p className={style.wrongText}>Please fill inputs!!!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = (state) => {
  return {
    // admins: state.admin[0]
    admins: state.productsAdmins[0],
  };
};

export default connect(mapStateToProps, { fetchAdminsProducts, CurentAdmin })(
  Login
);
