import { SegmentedControls } from "react-native-radio-buttons";
import React from "react";

export default props => {
  return (
    <SegmentedControls
      tint={"#f80046"}
      selectedTint={"white"}
      backTint={"white"}
      options={props.options}
      onSelection={props.onChangeRadio.bind(this)}
      selectedOption={props.onSelectedDefault}
      optionStyle={{ fontFamily: "AvenirNext-Medium", fontSize: 15 }}
      optionContainerStyle={{
        borderColor: "#f80046",
        borderWidth: 0.7,
        alignItems: "center",
        justifyContent: "center"
      }}
      containerStyle={{ width: "92%" }}
    />
  );
};
