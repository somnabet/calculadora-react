import { useState } from "react";
import "./App.css";
import Boton from "./components/Boton";
import Pantalla from "./components/Pantalla";
import { evaluate } from "mathjs";

function App() {
  const [input, setInput] = useState("");
  const [memory, setMemory] = useState(0);

  const agregarInput = (val) => {
    // No podemos empezar con un operador
    if (input === "0" && isNaN(val)) {
      return;
    }

    // No podemos escribir dos operadores seguidos
    if (isNaN(val) && isNaN(input[input.length - 1])) {
      return;
    }

    // Máximo 17 números para que no salgan de la pantalla
    if (input.length < 17) {
      setInput(input + val);
    }
  };

  const calcularResultado = () => {
    if (input) {
      setInput(evaluate(input.toString()));
    } else {
      alert("Ingrese valores para realizar cálculos");
    }
  };

  const eliminarUltimoCaracter = () => {
    setInput(input.slice(0, -1));
  };

  const limpiarPantalla = () => {
    setInput("");
  };

  const calcularRaizCuadrada = () => {
    if (input) {
      setInput(Math.sqrt(parseFloat(input)).toString());
    }
  };

  const cambiarSigno = () => {
    // Verificar si el número actual es positivo o negativo y cambiar su signo
    if (input !== "" && input !== "0") {
      setInput(input.startsWith("-") ? input.slice(1) : "-" + input);
    }
  };

  const agregarAMemoria = () => {
    if (input !== "") {
      setMemory(parseFloat(memory) + parseFloat(input)); // Agrega el valor en pantalla a la memoria
    }
  };

  const restarDeMemoria = () => {
    if (input !== "") {
      setMemory(parseFloat(memory) - parseFloat(input)); // Resta el valor en pantalla de la memoria
    }
  };

  const recuperarMemoria = () => {
    setInput(memory.toString()); // Mostrar el valor almacenado en la memoria en la pantalla
  };

  const borrarMemoria = () => {
    setMemory(0); // Borrar el contenido almacenado en la memoria
  };

  return (
    <div className="App">
      <div className="contenedor-calculadora">
        <Pantalla input={input} />

        <div className="fila">
          <Boton manejarClic={agregarAMemoria}>M+</Boton>
          <Boton manejarClic={restarDeMemoria}>M-</Boton>
          <Boton manejarClic={recuperarMemoria}>MR</Boton>
          <Boton manejarClic={borrarMemoria}>MC</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={limpiarPantalla}>AC</Boton>
          <Boton manejarClic={eliminarUltimoCaracter}>&larr;</Boton>
          <Boton manejarClic={cambiarSigno}>+/-</Boton>
          <Boton manejarClic={calcularRaizCuadrada}>√</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>
        </div>

        <div className="fila">
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>
      </div>
    </div>
  );
}

export default App;
