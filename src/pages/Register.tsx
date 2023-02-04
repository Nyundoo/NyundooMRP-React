import React, { Component, SyntheticEvent } from "react"
import '../Login.css'
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";


class Register extends Component {
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';
    state = {
        redirect: false
    };


    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('register', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm,
        });

        this.setState({
            redirect: true
        });
    }


    render(): React.ReactNode {

        if (this.state.redirect) {
            return <Navigate replace to="/login" />
        }


        return (
            <div className="text-center art">
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={this.submit}>
                        <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                        <h1 className="h3 mb-3 fw-normal">Please register</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="John" onChange={e => this.first_name = e.target.value} />
                            <label>First Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Doe" onChange={e => this.last_name = e.target.value} />
                            <label>Last Name</label>
                        </div>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="johndoe@gmail.com" onChange={e => this.email = e.target.value} />
                            <label>Email</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingInput" placeholder="*****" onChange={e => this.password = e.target.value} />
                            <label>Password</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingInput" placeholder="*****" onChange={e => this.password_confirm = e.target.value} />
                            <label>Password Confirm</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
                    </form>
                </main>
            </div>
        )
    }
}

export default Register;