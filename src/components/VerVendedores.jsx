import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";
// import { eliminar } from "../../../backend/src/controller/Vendedor.controller";
import Swal from "sweetalert2";

function BasicSearch() {
  const [vendedores, setVendedores] = useState([]);

  const [idVendedor, setIdVendedor] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [ventas, setVentas] = useState([]);
  const [ventasSelect, setVentasSelect] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    obtenerVendedores();
    setVentas(['si', 'no', 'Primera Venta'])
    setVentasSelect('no')
  }, []);

  const obtenerVendedores = async () => {
    const id = sessionStorage.getItem("idUsuario");
    const token = sessionStorage.getItem("token");
    const respuesta = await Axios.get(
      "/vendedor/listarVendedorSucursal/" + id,
      {
        headers: { autorizacion: token },
      }
    );

    console.log(respuesta);
    setVendedores(respuesta.data);
  };

  const obtenerVendedor = async (idParametro) => {

    setShow(true)
    const id = idParametro;
    const token = sessionStorage.getItem("token");
    const respuesta = await Axios.get("/vendedor/listar/" + id, {
      headers: { autorizacion: token },
    });

    console.log(respuesta);

    setIdVendedor(respuesta.data._id)
    setNombre(respuesta.data.nombre);
    setApellidos(respuesta.data.apellidos);
    setVentasSelect(respuesta.data.ventas);
  };

  const actualizar = async (e) => {

    e.preventDefault();
    const id = idVendedor;
    const token = sessionStorage.getItem('token');
    const vendedor = {
      nombre,
      apellidos,
      ventas: ventasSelect
    }

    const respuesta = await Axios.put('/vendedor/actualizar/'+id, vendedor,{
      headers: { autorizacion: token },
    })

    const mensaje = respuesta.data.mensaje
    obtenerVendedores()

    Swal.fire({
      icon: "success",
      title: "Vendedor Actualizado",
      showConfirmButton: false,
      timer: 1500,
    });

    setShow(false)

  }

  const eliminar = async (id) =>{

    const token = sessionStorage.getItem("token");
    const respuesta = await Axios.delete('/vendedor/eliminar/'+id,{
      headers: { autorizacion: token },
    })

    const mensaje = respuesta.data.mensaje

    Swal.fire({
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
    
    obtenerVendedores()

  }





  const data = vendedores.map((vendedor) => ({
    id: vendedor._id,
    nombre: vendedor.nombre,
    apellidos: vendedor.apellidos,
    ventas: vendedor.ventas,
  }));

  return (
    <div className="container">
      <br />
      <MaterialTable
        title="Vendedores de la Sucurcal"
        columns={[
          { title: "ID", field: "id" },
          { title: "NOMBRE", field: "nombre" },
          { title: "APELLIDOS", field: "apellidos" },
          { title: "VENTAS", field: "ventas" },
        ]}
        data={data}
        options={{
          search: true,
          actionsColumnIndex: -1,
          initialPage: 1,
        }}
        actions={[
          {
            icon: "delete",
            tooltio: "Eliminar",
            onClick: (event, rowData) => eliminar(rowData.id)
          },
          {
            icon: "edit",
            tooltio: "Editar",
            onClick: (event, rowData) => obtenerVendedor(rowData.id)
          },
        ]}
      />

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-7  mx-auto">
                <div className="card">
                  <div className="container text-center fa-5x">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="card-header bg-info text-center">
                    <h4>Actualizando...</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={'guardar'}>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Nombre</label>
                          <input
                            type="text"
                            className="form-control required"
                            onChange={(e) => setNombre(e.target.value)} value = {nombre}
                          />
                        </div>

                        <div className="col-md-6">
                          <label>Apellidos</label>
                          <input
                            type="text"
                            className="form-control required"
                            onChange={(e) => setApellidos(e.target.value)} value = {apellidos}
                          />
                        </div>

                        <div className="col-md-6">
                          <label>Ventas</label>
                          <select
                            className="form-control"
                            onChange={(e) => setVentasSelect(e.target.value)} value = {ventasSelect}
                          >
                            {ventas.map((venta) => (
                              <option key={venta}>{venta}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={actualizar}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default BasicSearch;
