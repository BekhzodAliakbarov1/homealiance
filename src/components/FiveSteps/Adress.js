import React, { useEffect, useReducer, useState } from "react";
import style from "./Adress.module.css";
import { IoMdClose } from "react-icons/io";
// import { MdLocationOn } from 'react-icons/md'
import { Link, Redirect } from "react-router-dom";
import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";
import Step from "../Steps/Step";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { fetchCurentLocation, fetchAdress } from "../../actions";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

const initialState = {
  street: "",
  district: "",
};
const reducer = (state = [], action) => {
  switch (action.type) {
    case "STREET":
      return {
        ...state,
        street: action.payload,
      };
    case "DISTRICT":
      return {
        ...state,
        district: action.payload,
      };
    case "CLEAR":
      return {
        ...state,
        street: "",
        district: "",
      };
    default:
      return state;
  }
};
const Adress = (props) => {
  const { t } = useTranslation();
  const [modal, setmodal] = useState(false);
  const [modal2, setmodal2] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lat, setLat] = useState(41);
  const [lang, setLang] = useState(62);
  const [loader, setLoader] = useState(true);

  // modal2 && setLoader(true)
  useEffect(() => {
    !modal2 && setLoader(true);
  }, [modal2]);

  const curentposition = () => {
    const location = navigator.geolocation;
    location.getCurrentPosition((e) => {
      setLat(e.coords.latitude);
      setLang(e.coords.longitude);
    });
    setmodal2(true);
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  };
  return (
    <div className={style.main}>
      {props.serviceType.length === 0 && <Redirect push to="/services" />}
      <div className={style.container}>
        <h1>{t("adress.h1")}</h1>
        <h3>{t("adress.h3")}</h3>
        <Step count={5} />
        <div className={style.header}>
          {/* <div className={style.back}>
                        <span><IoMdArrowBack/></span>
                        <p>Back</p>
                    </div> */}
          <h2>{t("adress.h2")}</h2>
          <div className={style.buttons}>
            <div className={style.btn} onClick={curentposition}>
              {t("adress.btns.b1")}
            </div>
            <div className={style.btn} onClick={() => setmodal(true)}>
              {t("adress.btns.b2")}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className={style.modal}>
          <form>
            <div className={style.svg}>
              <h2>{t("adress.modal1.t")}</h2>
              <IoMdClose onClick={() => setmodal(false)} />
            </div>
            <label>{t("adress.modal1.inputs.input1label")}</label>
            <input
              style={{
                padding: "10px",
                borderRadius: "8px",
                margin: "10px 0px",
              }}
              type="text"
              placeholder={t("adress.modal1.inputs.input1placeholder")}
              value={state.street}
              required
              onChange={(e) =>
                dispatch({ type: "STREET", payload: e.target.value })
              }
            />
            <label>{t("adress.modal1.inputs.input2label")}</label>
            <input
              style={{
                padding: "10px",
                borderRadius: "8px",
                margin: "10px 0px",
              }}
              type="text"
              placeholder={t("adress.modal1.inputs.input2placeholder")}
              value={state.district}
              required
              onChange={(e) =>
                dispatch({ type: "DISTRICT", payload: e.target.value })
              }
            />
            <div className={style.buttons}>
              <Link
                to="/service/location"
                className={style.btn}
                onClick={() => {
                  setmodal(false);
                  dispatch({ type: "CLEAR" });
                }}
              >
                {t("adress.modal1.inputs.back")}
              </Link>
              {state.district && state.street ? (
                <Link
                  to="/service/book"
                  className={style.btn}
                  onClick={() => {
                    setmodal(false);
                    props.fetchAdress({
                      street: state.street,
                      district: state.district,
                    });
                  }}
                >
                  {t("adress.modal1.inputs.continue")}
                </Link>
              ) : (
                <Link to="/service/location" className={style.btn}>
                  {t("adress.modal1.inputs.fill")}
                </Link>
              )}
            </div>
          </form>
        </div>
      )}
      {modal2 && (
        <Fragment>
          {loader && (
            <div className={`${style.modalBest} ${style.black}`}>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={300}
                width={300}
                timeout={3000} //3 secs
              />
            </div>
          )}
          <div className={`${style.modal} ${style.black}`}>
            <div className={style.modalContainer}>
              <IoMdClose onClick={() => setmodal2(false)} />
              <YMaps style={{ width: "100%", height: "100vh" }}>
                <Map
                  defaultState={{ center: [lat, lang], zoom: 5 }}
                  style={{ marginTop: "10px", width: "100%", height: "75vh" }}
                >
                  <Placemark geometry={[lat, lang]} />
                  <FullscreenControl options={{ float: "left" }} />
                  <GeolocationControl options={{ float: "right" }} />
                  <ZoomControl options={{ float: "left" }} />
                </Map>
              </YMaps>
              <Link
                className={style.lastbutton}
                to="/service/book"
                onClick={() => {
                  setmodal2(false);
                  props.fetchCurentLocation({
                    lat,
                    lang,
                  });
                }}
              >
                {t("adress.modal1.inputs.continue")}
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    adress: state.adress,
    serviceType: state.serviceType,
  };
};

export default connect(mapStateToProps, { fetchCurentLocation, fetchAdress })(
  Adress
);
