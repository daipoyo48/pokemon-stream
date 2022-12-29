import React from "react";
import PokeImage from "./PokeImage";

const PokeOutput = (props) => {
  const { number, type, id } = props;

  return (
    <div
      className="view-item"
      data-input_id={number}
      data-type={type}>
      <div className="view-bg"></div>
      <PokeImage id={id}></PokeImage>
    </div>
  );
};

export default PokeOutput;
