import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";

const ModalNotes = () => {
  let navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({
    id: "",
    data: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateInfo(values) {
    let errors = {};

    if (!values.data.trim()) {
      errors.name = "El campo nota no puede estar vacio.";
    } else if (!/^[a-zA-Z]+$/.test(values.data)) {
      errors.name = "Ingresa una nota";
    }
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateInfo({
      id: notes.id,
      data: notes.data,
    });
    if (Object.keys(errors).length === 0) {
      actions.register({
        id: notes.id,
        data: notes.data,
      });

      setIsSubmitting(true);
      console.log(store.status);
    }
    setErrors(errors);
  };

  useEffect(() => {
    if (isSubmitting) navigate("/dashboard");
  }, [isSubmitting]);

  return (
    <div>
      <div className="container-fluid fw-bold">
        <div className="row">
          <form
            className="col-12 col-xl-7 d-flex align-items-center needs-validation"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="container">
              <div className="w-75 mx-auto">
                <div class="modal" tabindex="-1">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Nueva nota</h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div className="col-6">
                          <label
                            for="validationCustom01"
                            className="form-label m-0"
                          >
                            Nota
                          </label>
                          <input
                            type="text"
                            className="form-control my-1"
                            name="data"
                            required
                            onChange={(e) => handleChange(e)}
                          />{" "}
                          {errors.name && (
                            <p className="text-danger"> {errors.data}</p>
                          )}{" "}
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancelar
                        </button>
                        <button type="button" class="btn btn-primary">
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalNotes;
