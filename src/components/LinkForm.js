import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const LinkForm = (props) => {
  // Define los values del state por si hay que cambiarlos
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };

  // Define el estado en react
  const [values, setValues] = useState(initialStateValues);

  // Función para extraer los datos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  
  // constante para cada vez que el form haga submit
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  // Función para editar un registro por su id
  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Input del url */}
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://someurl.com"
          name="url"
          onChange={handleInputChange}
          value={values.url}
        />
      </div>

      {/* Input del nombre */}
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Website name"
          onChange={handleInputChange}
          value={values.name}
        />
      </div>

      {/* Textarea de descripción */}
      <div className="form-group">
        <textarea
          name="description"
          rows="3"
          className="form-control"
          placeholder="Indica una descripción"
          onChange={handleInputChange}
          value={values.description}
        ></textarea>
      </div>

      {/* Botón */}
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default LinkForm;
