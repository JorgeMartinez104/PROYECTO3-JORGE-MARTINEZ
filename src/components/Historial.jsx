import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Historial() {
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  useEffect(() => {
    
    const storedHistorial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    setHistorialCotizaciones(storedHistorial);
  }, []);

  return (
    <div>
      <h1 className="center separador">Ver Historial 📋</h1>
      <div className="center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
            </tr>
          </thead>
          <tbody>
            {historialCotizaciones.map((cotizacion, id) => (
              <tr key={id}>
                <td>{cotizacion.fechaCotizacion}</td>
                <td>{cotizacion.factorPropiedad}</td>
                <td>{cotizacion.factorUbicacion}</td> 
                <td>{cotizacion.metros2}</td>
                <td>${cotizacion.poliza.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="center separador">
          <Link to="/">
            <button className="button button-outline">VOLVER</button>
          </Link>
        </div>
      </div>
    </div>
  );
}




