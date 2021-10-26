import React, { Fragment, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types'
const Formulario = ({crearCita}) => {
  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora:'',
    sintomas: ''
  });

  const [error, setError] = useState(false)

  // Funcion que ee ejecuta cuando apretas el name input
  const handleChange = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }
  const { mascota, propietario, fecha, hora, sintomas} = cita;

  // Submit formulario
  const submitCita = (e) => {
    e.preventDefault();

    // validar
    if (mascota.trim() === '' || propietario.trim() === '' ||
    fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
      setError(true);
      return;
    }
    setError(false);

    // asignar id
    cita.id = uuidv4();
    // crear una cita
    crearCita(cita)
    // reiniciar el form
    setCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora:'',
      sintomas: ''
    })
  }
  
  return ( 
    <Fragment>
      <h2>Crear Cita</h2> 
      { error ? <p className='alerta-error'>Todos los campos son obligatorios</p>
        : null }    
      <form
        onSubmit={submitCita}
      >
        <label htmlFor="">Nombre Mascota</label>
        <input type="text"
               name="mascota"
               className="u-full-width"
               placeholder="Nombre Mascota"
               onChange={handleChange}
               value={mascota}
         />
        <label htmlFor="">Nombre Dueño</label>
        <input type="text"
               name="propietario"
               className="u-full-width"
               placeholder="Nombre propietario"
               onChange={handleChange}
               value={propietario}
         />
        <label htmlFor="">Fecha</label>
        <input type="date"
               name="fecha"
               className="u-full-width"
               placeholder="Nombre Mascota"
               onChange={handleChange}
               value={fecha}
         />
        <label htmlFor="">Hora</label>
        <input type="time"
               name="hora"
               className="u-full-width"
               onChange={handleChange}
               value={hora}
         />
        <label htmlFor="">Sintomas</label>
        <textarea name="sintomas" id="" cols="30" rows="10"
               className="u-full-width"
               onChange={handleChange}
               value={sintomas}
        ></textarea>
        <button
        type='submit'
        className="button button-primary"
        >Guardar</button>
      </form>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}
 
export default Formulario;