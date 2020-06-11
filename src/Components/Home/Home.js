import React, { useState, useEffect } from "react";
import app from "firebase/app";
import { withRouter } from "react-router-dom";
import Navigation from "../NavBar/Navigation";
import * as ROUTES from "../Routes/Routes";
import "firebase/database";
import "./Home.css";

import _ from "lodash";
import { Chart } from "react-google-charts";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

function Home(props) {
  const [allCases, setAllCases] = useState([]);
  var dates = [];
  const [positivos, setPositivos] = useState([]);
  const [negativos, setNegativos] = useState([]);
  const [fallecido, setFallecido] = useState([]);
  const [curado, setCurado] = useState([]);
  const [UCI, setUCI] = useState([]);
  const [casa, setCasa] = useState([]);
  const [hospital, setHospital] = useState([]);
  var unique = [];
  var date_counter_array = [];
  var [xy, setXy] = useState([]);
  var ini = [["Dias"], ["Casos"]];

  let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

  useEffect(() => {
    getAllCases();
  }, []);
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const getAllCases = () => {
    firebase
      .database()
      .ref("/casos/")
      .on("value", (snapshot) => {
        var allFBData = _.toArray(snapshot.val());
        setAllCases(allFBData);
      });
  };

  const handleSubmit1 = () => {
    //PIE - Casos Negativos/positivos

    var contadorP = 0;
    var contadorN = 0;
    for (var i = 1; i < allCases.length; i++) {
      var casosparcial = Object.values(allCases[i]);

      if (casosparcial[14] != "Negativo" || casosparcial[10] == "Fallecido") {
        contadorP = contadorP + 1;
      } else if (casosparcial[14] == "Negativo") {
        contadorN = contadorN + 1;
      }
    }
    setPositivos(contadorP);
    setNegativos(contadorN);
    console.log(allCases);

    var date_counter_array = [];

    for (var i = 1; i < allCases.length; i++) {
      var casosparcial = Object.values(allCases[i]);
      dates.push(casosparcial[6]);
    }
    unique = dates.filter(onlyUnique);
    unique.sort(function (a, b) {
      var aa = a.split("/").reverse().join(),
        bb = b.split("/").reverse().join();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    });

    console.log(unique);
    var date_counter_array_aux = new Array(unique.length).fill(0);

    for (var i = 1; i < allCases.length; i++) {
      var casosparcial = Object.values(allCases[i]);

      for (var j = 0; j < unique.length; j++) {
        if (
          (casosparcial[14] != "Negativo" || casosparcial[10] == "Fallecido") &&
          casosparcial[6] == unique[j]
        ) {
          date_counter_array_aux[j] = date_counter_array_aux[j] + 1;
          date_counter_array[j] = date_counter_array_aux[j];
        } else if (
          casosparcial[14] == "Negativo" &&
          casosparcial[6] == unique[j]
        ) {
          date_counter_array[j] = date_counter_array_aux[j];
        }
      }
    }
    unique = ["Dias"].concat(unique);
    date_counter_array = ["Casos"].concat(date_counter_array);

    setXy(zip(unique, date_counter_array));

    var contadorMuer = 0;
    var contadorCur = 0;
    for (var i = 1; i < allCases.length; i++) {
      var casosparcial = Object.values(allCases[i]);

      if (casosparcial[5] == "Curado") {
        contadorCur = contadorCur + 1;
      } else if (casosparcial[5] == "Fallecido") {
        contadorMuer = contadorMuer + 1;
      }
    }

    setFallecido(contadorMuer);
    setCurado(contadorCur);

    var contadorUCI = 0;
    var contadorCasa = 0;
    var contadorHos = 0;

    for (var i = 1; i < allCases.length; i++) {
      var casosparcial = Object.values(allCases[i]);

      if (casosparcial[5] == "Positivo en casa") {
        contadorCasa = contadorCasa + 1;
      } else if (casosparcial[5] == "Positivo en hospital") {
        contadorHos = contadorHos + 1;
      } else if (casosparcial[5] == "Positivo en UCI") {
        contadorUCI = contadorUCI + 1;
      }
    }

    setCasa(contadorCasa);
    setUCI(contadorUCI);
    setHospital(contadorHos);
    console.log(positivos);
  };
  console.log(xy);
  return (
    <div>
      <Navigation />
      <div className="welcome">
        Haga clic en "Ir" para observar las estadísticas
        <button
          style={{
            height: "4vh",
            border: "0",
            borderRadius: "5px",
            marginTop: "5vh",
            marginBottom: "5vh",
            marginLeft: "5vw",
            background: "#36ad9e",
            color: "white",
            width: "9vw",
            fontFamily: "'Jost', sans-serif",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleSubmit1}
        >
          Ir
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <Chart
          className="chart"
          width={"600px"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={xy}
          options={{
            title: "Casos Diarios",
            hAxis: {
              title: "Días",
            },
            vAxis: {
              title: "Casos",
            },
          }}
        />

        <Chart
          className="chart2"
          width={"600px"}
          height={"400px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Casos", "Infectado/Fallecido/Curado"],
            ["Infectados", positivos - fallecido - curado],
            ["Fallecidos", fallecido],
            ["Curados", curado],
          ]}
          options={{
            title: "Casos Totales Registrados",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>

      <div style={{ display: "flex" }}>
        <div className={"Casos N/P"}>
          <Chart
            className="chart"
            width={"600px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Casos", "Negativo/Positivo"],
              ["Casos Positivos", positivos],
              ["Casos Negativos", negativos],
            ]}
            options={{
              title: "Casos Positivos / Negativos",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>

        <Chart
          className="chart2"
          width={"600px"}
          height={"400px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Casos", "Infectados"],
            ["Fallecidos", fallecido],
            ["Positivo en UCI", UCI],
            ["Positivo en casa", casa],
            ["Positivo en hospital", hospital],
          ]}
          options={{
            title: "Situación Infectados",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
}

export default withRouter(Home);
