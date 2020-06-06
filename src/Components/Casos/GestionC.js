import React, { useState } from "react";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [estadoActualizado, setEstadoActualizado] = useState("");

  const [Name, setName] = React.useState();
  let data = [];
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
      var userRef = firebase.database().ref("/casos/");
      var userQuery = userRef.orderByChild("id").equalTo(parseInt(Name, 10));
      userQuery.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
          data = Object.values(child.val());
          console.log(data);

          var row = (
            <tr>
              <td>{data}</td>
              <td>{data[1]}</td>
              <td>{data[2]}</td>
              <td>{data[3]}</td>
              <td>{data[4]}</td>
              <td>{data[5]}</td>
              <td>{data[6]}</td>
              <td>{data[7]}</td>
              <td>{data[8]}</td>
              <td>{data[9]}</td>
            </tr>
          );

          var el_table = document.getElementById("tabla");

          el_table.insertAdjacentHTML("beforeend", row);
        });
      });
    }
    // Cedula
    if (selectedIndex == 1) {
      var userRef = firebase.database().ref("/casos/");
      var userQuery = userRef.orderByChild("cedula").equalTo(Name);
      userQuery.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
          data = Object.values(child.val());
          console.log(data);
          var row = `<tr>
          <td>${data[0]}</td>
          <td>${data[1]}</td>
          <td>${data[2]}</td>
          <td>${data[3]}</td>
          <td>${data[4].substr(0, data[4].indexOf("T"))}</td>
          <td>${data[5].substr(0, data[5].indexOf("T"))}</td>
          <td>${data[6]}</td>
          <td>${data[7]}</td>
          <td>${data[8]}</td>
          <td>${data[9]}</td>
          </tr>`;

          var el_table = document.getElementById("tabla");

          el_table.insertAdjacentHTML("beforeend", row);
        });
      });
    }
    // Nombre
    if (selectedIndex == 2) {
      var userRef = firebase.database().ref("/casos/");
      var userQuery = userRef.orderByChild("nombre").equalTo(Name);
      userQuery.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
          data = Object.values(child.val());
          console.log(data);
          var row = `<tr>
          <td>${data[0]}</td>
          <td>${data[1]}</td>
          <td>${data[2]}</td>
          <td>${data[3]}</td>
          <td>${data[4]}</td>
          <td>${data[5]}</td>
          <td>${data[6]}</td>
          <td>${data[7]}</td>
          <td>${data[8]}</td>
          <td>${data[9]}</td>
          </tr>`;

          var el_table = document.getElementById("tabla");

          el_table.insertAdjacentHTML("beforeend", row);
        });
      });
    }
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Búsqueda de casos por:"
          onClick={handleClickListItem}
          style={{ background: "#84c2ba" }}
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
            marginTop: "3vh",
            marginBottom: "5vh",
            marginLeft: "21vw",
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

      <TableContainer style={{ width: "60vw" }} component={Paper}>
        <Table
          style={{ width: "50vw" }}
          id="tabla"
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Apellido</TableCell>
              <TableCell align="right">Cédula</TableCell>
              <TableCell align="right">Dirección de residencia</TableCell>
              <TableCell align="right">Dirección de trabajo</TableCell>
              <TableCell align="right">Fecha de examen</TableCell>
              <TableCell align="right">Fecha de nacimiento</TableCell>
              <TableCell align="right">ID Caso</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Resultado de examen</TableCell>
              <TableCell align="right">Sexo</TableCell>
              <TableCell align="right">Estado</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}
