import React, { useState, useEffect } from "react";
import MainDisplay from "./components/MainDisplay";
import MapDisplay from "./components/MapDisplay";
import ArrowIcon from "./images/icon-arrow.svg";
import Loader from "./images/Dual Ring-1s-191px (1).gif";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    ip: "",
    city: "",
    country: "",
    lat: 0.0,
    lng: 0.0,
    postalCode: "",
    timezone: "",
    isp: "",
  });

  useEffect(() => {
    getData();
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const getData = async (searchQuery = "") => {
    const API_KEY = process.env.REACT_APP_IPFY_KEY;
    await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${searchQuery}&domain=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData({
          ip: data.ip,
          city: data.location.city,
          country: data.location.country,
          lat: parseFloat(data.location.lat),
          lng: parseFloat(data.location.lng),
          postalCode: data.location.postalCode,
          timezone: data.location.timezone,
          isp: data.isp,
        });
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err);
      });
  };

  const handleChange = (e) => {};
  const handleSubmit = (e) => {};

  return loading === false ? (
    <div>
      <div>
        <div>IP Address Tracker</div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search for any IP address or domain"
              className="input-box"
            />
            <button type="submit" className="submit-btn">
              <img src={ArrowIcon} alt="submit" />
            </button>
          </form>
          {errorMessage && <div>Invalid domain name or IP address</div>}
        </div>
      </div>
      <MainDisplay />
      <MapDisplay />
    </div>
  ) : (
    <div>
      <img src={Loader} alt="Loading..." />
    </div>
  );
};

export default App;
