import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
const { useState, useEffect } = React;
const { faker } = require("@faker-js/faker");

const root = ReactDOM.createRoot(document.querySelector("#root"));

const App = () => {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const loadColors = async () => {
      try {
        const response = await axios.get("/api/colors");
        setColors(response.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    loadColors();
  }, []);

  const destroyColor = async (color) => {
    try {
      await axios.delete(`/api/colors/${color.id}`);
      setColors(colors.filter((col) => col.id !== color.id));
    } catch (ex) {
      console.log(ex);
    }
  };

  const createColor = async () => {
    try {
      const rgb = faker.color.rgb();
      const response = await axios.post("/api/colors", { rgb });
      const color = response.data;
      setColors([...colors, color]);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <h1> React-ive Colors </h1>
      <button id="generate" onClick={createColor}>
        <strong>New Color</strong>
      </button>
      <ul>
        {colors.map((color) => {
          return (
            <li key={color.id} style={{ backgroundColor: color.rgb }}>
              {color.rgb} <br />
              <button onClick={() => destroyColor(color)}>
                <strong> x </strong>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

root.render(<App />);
