import {useState, useEffect } from 'react';
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPaciente from "./components/ListadoPaciente"

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState([]);

  useEffect( () => {
    const obtenerLocalStorage = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];

      setPacientes(pacientesLS);
    }

    obtenerLocalStorage();
  }, []);

  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  });

  const eliminarPaciente = (id) => {
    //Traer todos los elementos que sean diferente al id que se le esta pasando
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);

    //Asignar el nuevo paciente
    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-10">
        <Header/> 
        <div className="mt-12 md:flex">
          <Formulario
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
          />
          <ListadoPaciente 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
          />
        </div>

    </div>
  )
}

export default App;
