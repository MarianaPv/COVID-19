import React, { useState, useEffect } from "react";
import "./Main.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import "firebase/auth";
import "firebase/database";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    table: {
      minWidth: 650,
    },
  },
}));

const options = ["ID", "Cédula", "Nombre"];
const consulta = new Map();

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [estadoActualizado, setEstadoActualizado] = useState("");
  const [estado, setEstado] = useState("");

  const [Name, setName] = React.useState();
  const [allCases, setAllCases] = useState([]);
  const [temporaryFilter, setTemporaryFilter] = useState([]);
  let data = [];

  useEffect(() => {
    getAllCases();
  }, []);
  useEffect(() => {
    console.log(allCases);
    if (selectedIndex == 0) {
      setTemporaryFilter(
        allCases.filter((ele, index) => {
          if (index !== 0) {
            return ele.id === parseInt(Name);
          }
        })
      );
    }
    // Cedula
    if (selectedIndex == 1) {
      setTemporaryFilter(
        allCases.filter((ele, index) => {
          if (index !== 0) {
            return ele.cedula === Name;
          }
        })
      );
    }
    // Nombre
    if (selectedIndex == 2) {
      setTemporaryFilter(
        allCases.filter((ele, index) => {
          if (index !== 0) {
            return (
              ele.nombre.toLowerCase().trim() === Name.toLowerCase().trim()
            );
          }
        })
      );
    }
  }, [allCases]);

  const getAllCases = () => {
    firebase
      .database()
      .ref("/casos")
      .on("value", (snapshot) => {
        const allFBData = _.toArray(snapshot.val());
        setAllCases(allFBData);
      });
  };
  const handleUpdate = (id) => {
    firebase
      .database()
      .ref("/casos/" + id)
      .once("value", (snapshot) => {
        let estado = snapshot.val().estadoTemp;
        let array = snapshot.val().arrayStates;
        Number.prototype.padLeft = function (base, chr) {
          let len = String(base || 10).length - String(this).length + 1;
          return len > 0 ? new Array(len).join(chr || "0") + this : this;
        };
        let d = new Date(),
          dform = [
            (d.getMonth() + 1).padLeft(),
            d.getDate().padLeft(),
            d.getFullYear(),
          ].join("/");
        let fechaEstado = estado + "@" + dform;
        array.push(fechaEstado);
        firebase
          .database()
          .ref("/casos/" + id)
          .update({ resultadoExamen: estado, arrayStates: array });
      });
  };

  const handleChange = (target, id) => {
    firebase
      .database()
      .ref("/casos/" + id)
      .update({ estadoTemp: target });
  };

  let filterArray =
    temporaryFilter.length > 0 &&
    temporaryFilter.map((ele, index) => {
      return (
        <tr>
          <td>{ele.apellido}</td>
          <td>{ele.cedula}</td>
          <td>{ele.direccionResidencia}</td>
          <td>{ele.direccionTrabajo}</td>
          <td>{ele.fechaExamen}</td>
          <td>{ele.fechaNacimiento}</td>
          <td>{ele.id}</td>
          <td>{ele.nombre}</td>
          <td>
            {
              <div>
                {" "}
                <div>{ele.resultadoExamen}</div>
                {}
                {ele.resultadoExamen !== "Fallecido" && (
                  <select
                    onChange={(e) => handleChange(e.target.value, ele.id)}
                    className="menu2"
                    style={{
                      width: "14vw",
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "2vw",
                    }}
                  >
                    <option
                      value={ele.resultadoExamen}
                      style={{ color: "grey" }}
                    >
                      Seleccione nuevo estado
                    </option>
                    <option value="Positivo en casa">Positivo en casa</option>
                    <option value="Positivo en hospital">
                      Positivo en hospital
                    </option>
                    <option value="Positivo en UCI">Positivo en UCI</option>
                    <option value="Curado">Curado</option>
                    <option value="Fallecido">Fallecido</option>
                  </select>
                )}
                {ele.resultadoExamen !== "Fallecido" && (
                  <button
                    style={{
                      height: "4vh",
                      border: "0",
                      borderRadius: "5px",

                      background: "#36ad9e",
                      color: "white",
                      width: "9vw",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleUpdate(ele.id)}
                  >
                    Actualizar
                  </button>
                )}
              </div>
            }
          </td>
          <td>{ele.sexo}</td>
          <td>
            {ele.arrayStates.map((ele) => {
              return <div>{ele}</div>;
            })}
          </td>
        </tr>
      );
    });

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = () => {
    // //ID
    if (selectedIndex == 0) {
      setTemporaryFilter(
        allCases.filter((ele, index) => {
          if (index !== 0) {
            return ele.id === parseInt(Name);
          }
        })
      );
    }
    // Cedula
    if (selectedIndex == 1) {
      setTemporaryFilter(
        allCases.filter((ele, index) => {
          if (index !== 0) {
            return ele.cedula === Name;
          }
        })
      );
    }
    // Nombre
    if (selectedIndex == 2) {
      setTemporaryFilter(
        allCases.filter((ele, index) => {
          if (index !== 0) {
            return (
              ele.nombre.toLowerCase().trim() === Name.toLowerCase().trim()
            );
          }
        })
      );
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ marginLeft: "2vw", marginTop: "5vh" }}>
        <div style={{ marginTop: "5vh", width: "50%" }}>
          <List component="nav" aria-label="Device settings">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Búsqueda de casos por:"
              onClick={handleClickListItem}
              style={{ background: "#bddbd7" }}
            >
              <ListItemText
                primary="Clic aquí para filtrar:"
                secondary={options[selectedIndex]}
              />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              value={Name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              id="outlined-basic"
              label="Buscar"
              variant="outlined"
            />
          </form>
          <div className="boton">
            <button
              style={{
                height: "4vh",
                border: "0",
                borderRadius: "5px",
                marginTop: "5vh",
                marginBottom: "5vh",
                marginLeft: "0vw",
                background: "#36ad9e",
                color: "white",
                width: "9vw",
                fontFamily: "'Jost', sans-serif",
                fontSize: "15px",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              Ir
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "2vw", width: "40vw" }}>
        <table className="tableClosed2">
          <tr>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Dirección de residencia</th>
            <th>Dirección de trabajo</th>
            <th>Fecha de examen</th>
            <th>Fecha de nacimiento</th>
            <th>ID Caso</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Sexo</th>
            <th>Historial</th>
          </tr>

          {filterArray}
        </table>
      </div>
    </div>
  );
}
