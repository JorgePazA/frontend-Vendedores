import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Swal from "sweetalert2";

export default function RegistrarSucursal() {

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')


  const registro = async(e) =>{
    e.preventDefault();
    const usuario = {nombre, correo, contrasena}
    const respuesta = await axios.post('./sucursal/crear', usuario)
    console.log(respuesta)
    const mensaje = respuesta.data.mensaje

    if(mensaje !== 'Bienvenido'){
      Swal.fire({
        icon: "error",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else{
      // const token = respuesta.data.token
      // const nombre = respuesta.data.nombre
      // const idUsuario = respuesta.data.id
      // sessionStorage.setItem('token', token)
      // sessionStorage.setItem('nombre', nombre)
      // sessionStorage.setItem('idUsusario', idUsuario)

      Swal.fire({
        icon: "success",
        title: "Sucursal Creada",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href='/'
      }, 1600)
  

    }
  }
    


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-7  mx-auto">
          <div className="card">
            <div className="container text-center fa-5x">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="card-header bg-info text-center">
              <h4>Registrar Sucursal</h4>
            </div>
            <div className="card-body">
              <form onSubmit={registro}>
                <div className="row">

                  <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control required" onChange= {(e) => setNombre(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Correo</label>
                    <input type="text" className="form-control required" onChange= {(e) => setCorreo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Contraseña</label>
                    <input type="text" className="form-control required" onChange= {(e) => setContrasena(e.target.value)} />
                  </div>

                </div>
                <br />
                <button type="submit" class="btn btn-outline-info">
                  <span class="fa fa-save"></span> Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
