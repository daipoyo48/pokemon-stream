import React from "react";

const InputName = (props) => {
  const { number, value = null, func } = props;

  return (
    <label>
      <span>{Number(number) + 1}匹目</span>
      <input
        type="text"
        list="pokeData"
        data-input_id={number}
        className="nameInput"
        name={`poke-${number}`}
        defaultValue={value}
        onChange={func}></input>
    </label>
  );
};

export default InputName;
