import * as React from "react";
import area from "@turf/area";

function ControlPanel(props) {
  let polygonArea = 0;
  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }

  return (
    <div className="control-panel">
      {polygonArea > 0 && (
        <p>
          Land Area:
          <span className="p-2 font-bold">
            {Math.round(polygonArea * 100) / 100} M<sup>2</sup>
          </span>
        </p>
      )}
    </div>
  );
}

export default React.memo(ControlPanel);
