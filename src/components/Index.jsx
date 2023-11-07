import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Index() {
  const [datosPropiedad, setDatosPropiedad] = useState([]);
  const [datosUbicacion, setDatosUbicacion] = useState([]);
  const [data, setData] = useState({
    factorPropiedad: null,
    factorUbicacion: null,
    metros2: 20,
    costoM2: 35.86,
    poliza: 0.0
  });

  const [campoPropiedadVacio, setCampoPropiedadVacio] = useState(false);
  const [campoUbicacionVacio, setCampoUbicacionVacio] = useState(false);
  const [campoMetros2Vacio, setCampoMetros2Vacio] = useState(false);

  
  const cotizarPoliza = () => {
    const { costoM2, factorPropiedad, factorUbicacion, metros2 } = data;
    if (factorPropiedad !== null && factorUbicacion !== null) {
      const poliza = costoM2 * factorPropiedad * factorUbicacion * metros2;
      setData({ ...data, poliza });
      guardarCotizacionEnHistorial(); 
    } else {
      if (factorPropiedad === null) setCampoPropiedadVacio(true);
      if (factorUbicacion === null) setCampoUbicacionVacio(true);
    }
  };
  

  const guardarCotizacionEnHistorial = () => {
    if (data.factorPropiedad !== null && data.factorUbicacion !== null) {
      const cotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        factorPropiedad: data.factorPropiedad,
        factorUbicacion: data.factorUbicacion,
        metros2: data.metros2,
        poliza: data.poliza,
      };
      
      
      const historialCotizaciones = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
  
      
      historialCotizaciones.push(cotizacion);
  
      
      localStorage.setItem("historialCotizaciones", JSON.stringify(historialCotizaciones));
    }
  };
  

  
  const cargarDatosPropiedad = () => {
    
    axios.get('https://653831aaa543859d1bb14d53.mockapi.io/propiedades')
      .then((response) => setDatosPropiedad(response.data))
      .catch((error) => console.error("Error al obtener datos de propiedad:", error));
  };

  
  const cargarDatosUbicacion = () => {
    
    axios.get('https://demo5205683.mockable.io/ubicacion')
      .then((response) => setDatosUbicacion(response.data))
      .catch((error) => console.error("Error al obtener datos de ubicación:", error));
  };

  useEffect(() => {
    cargarDatosPropiedad(); 
    cargarDatosUbicacion(); 
  }, []);


  return (
    <div>
      <div className="historial">
        <Link to="/historial">
          <span title="Ver Historial">📋</span>
        </Link>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>
        
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
      <select
        id="propiedad"
        onChange={(e) => {
          const factorPropiedad = parseFloat(e.target.value);
          setData({ ...data, factorPropiedad });
          setCampoPropiedadVacio(false);
        }}
      >
        <option value="" disabled selected>...</option> 
        {datosPropiedad.map(({ factor, tipo }, id) => (
          <option key={id} value={factor}>{tipo}</option>
        ))}
      </select>
      {campoPropiedadVacio && <p className="text-rojo">Selecciona una propiedad</p>}
      
      <label htmlFor="ubicacion">Selecciona su ubicación</label>
      <select
        id="ubicacion"
        onChange={(e) => {
          const factorUbicacion = parseFloat(e.target.value);
          setData({ ...data, factorUbicacion });
          setCampoUbicacionVacio(false);
        }}
      >
        <option value="" disabled selected>...</option> 
        {datosUbicacion.map(({ factor, tipo }, id) => (
          <option key={id} value={factor}>{tipo}</option>
        ))}
      </select>
      {campoUbicacionVacio && <p className="text-rojo">Selecciona una ubicación</p>}
      
      <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
      <input
        type="number"
        id="metros2"
        min="20"
        max="500"
        value={data.metros2}
        onChange={(e) => {
          const metros2 = parseInt(e.target.value);
          setData({ ...data, metros2 });
          setCampoMetros2Vacio(false);
        }}
        required
      />
      {campoMetros2Vacio && <p className="text-rojo">Ingresa los metros cuadrados</p>}

      <div className="center separador">
        <button onClick={cotizarPoliza} className="button button-outline">
          Cotizar
        </button>
        <button onClick={() => setData({ ...data, poliza: 0 })} className="button button-outline">
          Borrar
        </button>
      </div>
      <div className="center separador">
        <p className="importe">
          Precio estimado: $ <span id="valorPoliza">{data.poliza.toFixed(2)}</span>
          <span className="guardar ocultar" title="Guardar en historial">
            💾
          </span>
        </p>
      </div>
    </div>
    </div>
  );
}



