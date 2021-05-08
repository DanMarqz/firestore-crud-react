import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { toast } from "react-toastify";
import { db } from "../firebase";

const Links = () => {
  // Para enseñarlos en la página
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  // función para conectarse a la base de datos y agregar documentos
  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast.success("New link added!", {
          autoClose: 2000,
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast.info("Link updated succesfully!", {
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Función para eliminar el link
  const onDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      await db.collection("links").doc(id).delete();
      toast.warning("Link Removed Successfully!", {
        autoClose: 2000,
      });
    }
  };

  // función para enseñar los datos de firebase
  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  // useeffect refresca la página y ejecuta una función en cada refresh
  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-md-12 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>

      <div className="col-md-12">
        {links.map((link) => (
          <div className="card text-white bg-primary mb-3" style={{maxWidth: "20rem"}}  key={link.id}>
            <div>
              <div className="d-flex justify-content-between">
                <h4 className="card-title pl-2 pt-2">{link.name}</h4>
                  <i
                    className="material-icons text-danger p-2"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons text-warning p-2"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
              </div>
              <h6 className="card-title pl-2">{link.description}</h6>
              <a className="card-text text-dark p-2" href={link.url} target="_blank" rel="noopener noreferrer">
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
