// cursor's location in the x and y

import React, { useEffect, useState } from "react";

function MouseTracker() {
  const [track, setTrack] = useState("x");

  useEffect(() => {
    function handleMouseMove(e) {
      if (track === "x") {
        console.log("Mouse X : ", e.clientX);
      } else {
        console.log("Mouse Y : ", e.clientY);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    console.log(`Started Tracking ${track}`);

    // clean up function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      console.log(`Stopped Tracking ${track} `);
    };
  }, [track]);

  return (
    <div>
      <button onClick={() => setTrack("x")}>Track X</button>
      <button onClick={() => setTrack("y")}>Track Y</button>
    </div>
  );
}

export default MouseTracker;
