import React from "react";
import { View } from "@tarojs/components";
import "./divider.scss";

const Divider = ({
  color = "silver",
  titleBar = false,
  size = 20,
  left = 0
}) => {
  return (
    <View
      className={`divide ${titleBar && "title_bar"}`}
      style={{
        backgroundColor: color,
        marginBottom: size + "px",
        marginTop: titleBar ? 0 : size + "px",
        marginLeft: left ? left + "px" : 0
      }}
    />
  );
};
export default Divider;
