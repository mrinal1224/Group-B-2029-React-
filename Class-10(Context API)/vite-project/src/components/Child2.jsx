import { useContext } from "react";

import { ParkContext } from "./ParkContext";

function Child2() {
  const data = useContext(ParkContext);

  return <div className="children">Child 2 : RollerCoaster {data.rollerCoaster}   {data.ticketForRollerCoaster()}</div>;
}

export default Child2;
