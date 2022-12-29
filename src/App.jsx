import React, { useState, useEffect } from "react";
import PokeInput from "./components/PokeInput";
import PokeOutput from "./components/PokeOutput";
import Data from "./data.json";
import "./App.css";

let json = [];
Data.forEach((val) => {
  json.push({
    id: val.num,
    name: val.name.replace("\n", ""),
    type: val.type1,
  });
});

// データの保存関数;
const storePokeData = async (pokeData) => {
  await window.db.storePokeData(pokeData);
};

function App() {
  // useState定義
  const [pokeData, setPokeData] = useState({
    poke1: "",
    poke2: "",
    poke3: "",
    poke4: "",
    poke5: "",
    poke6: "",
  });

  // 保存データ読み込み
  const loadPokeData = async () => {
    await window.db.loadPokeData().then((res) => {
      let blankDatas = {};
      const blankData = {
        id: "",
        name: "",
        type: "ノーマル",
      };
      console.log(res);
      if (res !== null) {
        Object.values(res).forEach((data, index) => {
          blankDatas[`poke${index + 1}`] = data;
        });
      } else {
        blankDatas = {
          poke1: blankData,
          poke2: blankData,
          poke3: blankData,
          poke4: blankData,
          poke5: blankData,
          poke6: blankData,
        };
      }

      setPokeData(blankDatas);
    });
  };

  // 起動時にデータ読み込み
  useEffect(() => {
    loadPokeData();
  }, []);

  // データの削除関数;
  const deletePokeData = () => {
    window.db.deletePokeData();
    loadPokeData();
  };

  // inputに入力があったときの処理
  const onChangeName = (e) => {
    let inputId = e.target.dataset.input_id;
    let inputValue = e.target.value;

    // 入力値に応じたデータを取得
    const inputData = json.find((data) => data.name === inputValue);

    // バックスペースで文字を削除したときなどに反応しないように
    if (typeof inputData !== "undefined") {
      // 取得したデータをオブジェクトに整形
      const setObject = {
        id: inputData.id,
        name: inputValue,
        type: inputData.type,
      };

      // 永続保存用のデータ作成
      let saveData = { ...pokeData };

      if (inputId === "0") {
        setPokeData((pokeData) => ({
          ...pokeData,
          poke1: setObject,
        }));
        saveData.poke1 = setObject;
      } else if (inputId === "1") {
        setPokeData((pokeData) => ({
          ...pokeData,
          poke2: setObject,
        }));
        saveData.poke2 = setObject;
      } else if (inputId === "2") {
        setPokeData((pokeData) => ({
          ...pokeData,
          poke3: setObject,
        }));
        saveData.poke3 = setObject;
      } else if (inputId === "3") {
        setPokeData((pokeData) => ({
          ...pokeData,
          poke4: setObject,
        }));
        saveData.poke4 = setObject;
      } else if (inputId === "4") {
        setPokeData((pokeData) => ({
          ...pokeData,
          poke5: setObject,
        }));
        saveData.poke5 = setObject;
      } else if (inputId === "5") {
        setPokeData((pokeData) => ({
          ...pokeData,
          poke6: setObject,
        }));
        saveData.poke6 = setObject;
      }

      // データ保存関数呼び出し
      storePokeData(saveData);
    }
  };

  return (
    <>
      <section className="selector">
        <datalist id="pokeData">
          {json.map((data, index) => {
            return (
              <option
                value={data.name}
                key={`jsonData${index}${data.id}`}></option>
            );
          })}
        </datalist>
        <div className="input-wrapper">
          {Object.values(pokeData).map((data, index) => {
            return (
              <PokeInput
                number={index}
                func={onChangeName}
                value={data.name}
                key={`input${index}`}></PokeInput>
            );
          })}
        </div>
        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={deletePokeData}>
            リセット
          </button>
        </div>
      </section>
      <section className="view">
        {Object.values(pokeData).map((data, index) => {
          return (
            <PokeOutput
              number={index}
              type={data.type}
              id={data.id}
              key={`output${index}`}></PokeOutput>
          );
        })}
      </section>
    </>
  );
}

export default App;
