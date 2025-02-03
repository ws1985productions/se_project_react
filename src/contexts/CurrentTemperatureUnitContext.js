import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  CurrentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export default CurrentTemperatureUnitContext;