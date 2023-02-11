"use client";
import React, { useState, useCallback } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import DrawControl from "./(components)/draw-controls";
import ControlPanel from "./(components)/control-panel";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoid2lja2Vkd29ybGQiLCJhIjoiY2xlMDRxcm9oMHphbTNwcDZpYmw5MndscyJ9.LORY6Y09lmuIVWNhMnGJEQ";

function HomePage() {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <>
      <div className="w-full h-[90vh] flex gap-4 flex-col items-center justify-center">
        <p>A Demo For Mr Jigga</p>
        <Map
          initialViewState={{
            longitude: -91.874,
            latitude: 42.76,
            zoom: 12,
          }}
          style={{ width: 350, height: 500 }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <DrawControl
            position="top-left"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </Map>
        <ControlPanel polygons={Object.values(features)} />
      </div>
    </>
  );
}

export default HomePage;
