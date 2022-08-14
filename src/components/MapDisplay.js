import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";

const MapDisplay = ({ center }) => {
  function FlyMapTo(props) {
    const map = useMap();

    useEffect(() => {
      map.flyTo(props.center, props.zoom);
    });

    return null;
  }

  return (
    <div className="leaflet-container">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>
            Latitide: {center[0]} <br /> Longitude: {center[1]}
          </Popup>
        </Marker>

        <FlyMapTo center={center} zoom={13} />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
