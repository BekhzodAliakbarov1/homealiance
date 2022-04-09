import React, { useEffect, useState, useReducer, Fragment } from "react";
import style from "./OrderList.module.css";
import { fetchOrderProducts } from "../../actions";
import { connect } from "react-redux";
// import LoaderComponent from '../admin-dashboard/main-parts/Loader'
import { BsPeopleCircle } from "react-icons/bs";
import { BiPhone, BiTimeFive, BiCalendarExclamation } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";

const initialState = {
  order: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case "RELOAD":
      return initialState;
    default:
      return state;
  }
};

const Orders = (props) => {
  const { t } = useTranslation();
  const [number, setNumber] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    props.fetchOrderProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    props.orders.map((eachOrder) => {
      if (eachOrder.number.includes(number)) {
        dispatch({ type: "ADD_ORDER", payload: eachOrder });
        return null;
      } else {
        return null;
      }
    });
    setNumber("");
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <h1>{t("order.h1")}</h1>
        <h3>{t("order.h3")}</h3>
        <form onSubmit={submitHandler}>
          {state.order.length === 0 && (
            <Fragment>
              <label>{t("order.inputLabel")}</label>
              <input
                placeholder={t("order.inputPlaceholder")}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
              />
            </Fragment>
          )}
          {number.length > 6 && state.order < 1 && (
            <button type="submit">{t("order.btn1")}</button>
          )}
          {state.order.length > 0 ? (
            <div className={style.orders}>
              {state.order.map((item) => (
                <div className={style.order} key={item.id}>
                  <div className={style.information}>
                    <h1>
                      {" "}
                      <div>
                        <BsPeopleCircle />
                      </div>{" "}
                      <span>{t("order.span1")}</span>: {item.name}
                    </h1>
                    <h1>
                      {" "}
                      <div>
                        <BiPhone />
                      </div>
                      <span>{t("order.span2")}</span>: {item.number}
                    </h1>
                    <h1>
                      <div>
                        <FaUserShield />
                      </div>{" "}
                      <span>{t("order.span3")}</span>: {item.serviceType}
                    </h1>
                    <h1>
                      {" "}
                      <div>
                        <BiCalendarExclamation />
                      </div>{" "}
                      <span>{t("order.span4")}</span>: {item.date}
                    </h1>
                    <h1>
                      {" "}
                      <div>
                        <BiTimeFive />
                      </div>{" "}
                      <span>{t("order.span5")}</span>: {item.time}
                    </h1>
                  </div>
                  <div className={style.status}>
                    <div className={style.step}>
                      {item.orderConfirmed === "TRUE" ? (
                        <div className={style.icongreen}>
                          <IoCheckmarkDoneSharp />
                        </div>
                      ) : (
                        <div className={style.iconYellow}>
                          <FiLoader />
                        </div>
                      )}
                      {item.orderConfirmed === "TRUE" ? (
                        <h3>{t("order.confirm1")}</h3>
                      ) : (
                        <h3>{t("order.confirm12")}</h3>
                      )}
                    </div>
                    <div className={style.line}></div>
                    <div className={style.step}>
                      {item.workerSend === "TRUE" ? (
                        <div className={style.icongreen}>
                          <IoCheckmarkDoneSharp />
                        </div>
                      ) : (
                        <div className={style.iconYellow}>
                          <FiLoader />
                        </div>
                      )}
                      {item.workerSend === "TRUE" ? (
                        <h3>{t("order.confirm2")}</h3>
                      ) : (
                        <h3>{t("order.confirm12")}</h3>
                      )}
                    </div>
                    <div className={style.line}></div>
                    <div className={style.step}>
                      {item.orderfinished === "TRUE" ? (
                        <div className={style.icongreen}>
                          <IoCheckmarkDoneSharp />
                        </div>
                      ) : (
                        <div className={style.iconYellow}>
                          <FiLoader />
                        </div>
                      )}
                      {item.orderfinished === "TRUE" ? (
                        <h3>{t("order.confirm3")}</h3>
                      ) : (
                        <h3>{t("order.confirm12")}</h3>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => dispatch({ type: "RELOAD" })}
              >
                {t("order.btn2")}
              </button>
            </div>
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order[0],
  };
};

export default connect(mapStateToProps, { fetchOrderProducts })(Orders);
