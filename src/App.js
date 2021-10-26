import { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Formulario from "./Formulario";
import Cita from "./Cita";

function App() {

  // citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // array de citas
  const [citas, setCitas] = useState(citasIniciales)

  // use effect para realizar ciertas operacione cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas])

  const crearCita = (cita) => {
    setCitas([...citas,
      cita]
    )
  }

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas)
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas'

  return (
    <Fragment>
      <h1>Administracion de Pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
                cita={cita}
                key={cita.id}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
