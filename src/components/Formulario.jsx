import { useState, useEffect } from 'react';
import Error from './Error'

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {

  //Debe ir dentro del componente pero antes del return
  //No pueden ir dentro de condicionales
  //No debe hacer un return previo
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintoma, setSintoma] = useState('');

  const [error, setError] = useState(false);

  //se va realizar unicamente cuando paciente cambie
  useEffect( () => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintoma(paciente.sintoma);
    }
  }, [paciente] )

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del formulario
    if( [nombre,propietario,email,alta,sintoma].includes('') ){
      setError(true);
      return;
    }

    setError(false);

    //Objeto de pacientes

    const objetoPacientes = {
      nombre,
      propietario,
      email,
      alta, 
      sintoma
    }

    if( paciente.id ) {
      //Editando el registro
      objetoPacientes.id = paciente.id;

     //Identifica el paciente y lo sustituye por el nuevo
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPacientes : pacienteState);

      //Enviamos el nuevo objeto
      setPacientes(pacientesActualizados);

      setPaciente({});


    }else{
      //Creando el registro
      objetoPacientes.id = generarId();
      setPacientes([...pacientes, objetoPacientes]);
    }

    //Reinciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setAlta('');
    setSintoma('');
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">
          Seguimiento Pacientes
        </h2>

        <p className="text-lg mt-5 text-center mb-10">
          Añade pacientes y {' '} 
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
          { error && <Error><p>Todos los campos son obligatorios</p></Error>}
            {/* Inputs del formulario           */}
            <div className="mb-5">
              <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
              <input id="nombre" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" value={nombre} onChange={ (e) => setNombre(e.target.value) } placeholder="Nombre de la Mascota" />
            </div>
            {/* Inputs del formulario           */}
            <div className="mb-5">
              <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
              <input id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" value={propietario} onChange={ (e) => setPropietario(e.target.value) } placeholder="Nombre del Propietario" />
            </div>
            {/* Inputs del formulario           */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
              <input id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" value={email} onChange={ (e) => setEmail(e.target.value) } placeholder="Email Contacto Propietario" />
            </div>
            {/* Inputs del formulario           */}
            <div className="mb-5">
              <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
              <input id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" value={alta} onChange={ (e) => setAlta(e.target.value) }/>
            </div>
              {/* Inputs del formulario           */}
              <div className="mb-5">
              <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
              <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los síntomas" value={sintoma} onChange={ (e) => setSintoma(e.target.value) }></textarea>
            </div>

            <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } />
        </form>
    </div>
  )
}

export default Formulario