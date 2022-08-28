import React, {useContext, useState, useEffect} from "react";
import { Context } from "../../store/appContext.js";
import {BiLockAlt} from "react-icons/bi";
import {validateLogin} from "../ValidateErrors/Errors.jsx";
import logo from "../../../../../public/assets/logo.png";
import {useNavigate} from "react-router-dom";


const LoginForm = ({setStage}) => {
    const {actions, store} = useContext(Context);

    const navigate = useNavigate();
    const [login, setLogin] = useState({email: "", password: ""})
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = ({target}) => {
        setLogin({
            ...login,
            [target.name]: target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("iniciando hanlde Submit")
        const errores = validateLogin({email: login.email, password: login.password});
        if (Object.keys(errores).length === 0) {
            let signin = await actions.login({email: login.email, password: login.password})
            console.log(store.alert.msg)
            if (store.alert.msg == "Bad username or password") {
                console.log("Usuario o contraseña incorrectos")
            } else if (store.alert.msg == "You are not a registered user,sign up to continue or go away!!!") {
                console.log("No hay ningun usuario registrado con este email")
            } else {
                setIsSubmitting(true)
                console.log(isSubmitting)
            }
        }
        setErrors(errores);
    };

    useEffect(() => {
        if (isSubmitting) 
            navigate("/dashboard");
        

    }, [isSubmitting]);
    return (

        <form className="col-12 col-xl-7  d-flex align-items-center needs-validation"
            onSubmit={
                e => handleSubmit(e)
        }>
            <div className="container">
                <div className="w-75 m-auto">
                    <div className="col-6 text-center mx-auto ">
                        <img className="text-center"
                            style={
                                {
                                    width: 100 + "%"
                                }
                            }
                            src={logo}/>
                    </div>
                    <div>
                        <div className="col-xxl-12 py-2">
                            <label htmlFor="validationCustom01" className="form-label px-0 mb-0">
                                Correo electronico
                            </label>
                            <input name="email" type="text" className="form-control" id="validationCustom01" placeholder="email " required
                                onChange={
                                    e => handleChange(e)
                                }/> {
                            errors.email && <p> {
                                errors.email
                            }</p>
                        }
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-xxl-12">
                            <label htmlFor="validationCustom02" className="form-label px-0 mb-0">
                                Contraseña
                            </label>
                            <input name="password" type="password" className="form-control" id="validationCustom02" placeholder="password"
                                onChange={
                                    e => handleChange(e)
                                }
                                required/> {
                            errors.password && <p> {
                                errors.password
                            }</p>
                        }
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="align-items-center d-flex justify-content-between py-2">
                            <div>
                                <div>
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <span className="mx-2">Recordar cuenta</span>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-link pe-0 "
                                    onClick={
                                        () => setStage('Send')
                                }>
                                    <span className="mx-2">
                                        <BiLockAlt/>
                                    </span>
                                    Olvide mi contraseña
                                </button>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary col-12" type="submit">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default LoginForm