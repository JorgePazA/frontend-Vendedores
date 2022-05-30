import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Swal from "sweetalert2";


export default function RegistrarVendedor() {

  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [ventas, setVentas] = useState([])
  const [ventasSelect, setVentasSelect] = useState([])

  useEffect(() =>{
    setVentas(['si', 'no', 'Primera Venta'])
    setVentasSelect('no')

  }, [])

  const guardar = async(e) =>{
    e.preventDefault()
    const usuario = {
      nombre,
      apellidos,
      ventas:ventasSelect,
      sucursal: sessionStorage.getItem('idUsuario'),
      sucursalNombre: sessionStorage.getItem('nombre')
    }

    if(nombre === ""){
      Swal.fire({
        icon: "error",
        title: "Debes ingresar nombre",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else if(apellidos === ""){
      Swal.fire({
        icon: "error",
        title: "Debes ingresar apellido",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else{
      const token = sessionStorage.getItem('token')
      const respuesta = await Axios.post("/vendedor/crear", usuario,{
        headers:{'autorizacion':token}
      })
      const mensaje= respuesta.data.mensaje
      console.log(mensaje)

      Swal.fire({
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
      });


      e.target.reset();
      setNombre("");
      setApellidos("")

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
              <h4>Registrar Vendedor</h4>
            </div>
            <div className="card-body">
              <form onSubmit={guardar}>
                <div className="row">
                  <div className="col-md-6">
                    <label>Nombre</label>
                    <input type="text" className="form-control required" onChange= {(e) => setNombre(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                    <label>Apellidos</label>
                    <input type="text" className="form-control required" onChange= {(e) => setApellidos(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                      <label>Ventas</label>
                      <select className='form-control' onChange={(e) => setVentasSelect(e.target.value)}>
                        {
                          ventas.map(venta =>(
                            <option key={venta}>
                              {venta}
                            </option>
                          ))
                        }
                      </select>
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
