import ToggleSwitch from "toggle-switch-react-native";
import React from "react";

export default props => {
  return (
    <ToggleSwitch
      isOn={props.isOn}
      onColor="#51A485"
      offColor="#001E20"
      size="small"
      onToggle={isOn => props.onChangeToggle(isOn)}
    />
  );
};
