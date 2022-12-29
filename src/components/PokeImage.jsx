import React from "react";

const PokeImage = (props) => {
  const { id } = props;

  return (
    <img
      src={`${process.env.PUBLIC_URL}/image/n${id}.gif`}
      alt=""></img>
  );
};

export default PokeImage;
