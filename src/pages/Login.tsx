import axios from "axios";
import React, { Component, SyntheticEvent, useState } from "react"
import { Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('login', {
            email,
            password
        });

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate replace to="/" />;
    }

    return (

        <div className="text-center art">
            <main className="form-signin w-100 m-auto">
                <form onSubmit={submit}>
                    <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="johndoe@gmail.com" onChange={e => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingInput" placeholder="***" onChange={e => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
                </form>
            </main>
        </div>
    )
};

export default Login;