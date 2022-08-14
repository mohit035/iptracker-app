import React, { useState, useEffect } from "react";
import MainDisplay from "./components/MainDisplay";
import MapDisplay from "./components/MapDisplay";
import ArrowIcon from "./images/icon-arrow.svg";
import loader from "./images/Eclipse-1s-200px (1).gif";

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
    const API_KEY = process.env.REACT_APP_API_KEY;
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
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setErrorMessage(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const ipAddressRegex =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    const hostnameRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (ipAddressRegex.test(searchQuery) || hostnameRegex.test(searchQuery)) {
      getData(searchQuery);
    } else {
      setErrorMessage(true);
    }
  };

  return loading === false ? (
    <div>
      <div className="d-flex flex-column align-items-center main-container">
        <div className="text-white main-text pt-4 pb-3">IP Address Tracker</div>
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
          {errorMessage && (
            <div className="text-white pl-2">
              Invalid domain name or IP address
            </div>
          )}
        </div>
      </div>
      <MainDisplay
        ip={data.ip}
        location={[data.city, data.country, data.postalCode]}
        timezone={data.timezone}
        isp={data.isp}
      />
      <MapDisplay
        center={data.lat && data.lng ? [data.lat, data.lng] : [51.505, -0.09]}
      />
    </div>
  ) : (
    <div className="loader-img">
      <img src={loader} alt="Loading..." width="110"/>
    </div>
  );
};

export default App;
