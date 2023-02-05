import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import Wrapper from "../../components/Wrapper";
import ImageUpload from "../../components/ImageUpload";
import { Navigate } from 'react-router-dom';

const OrderCreate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState(false);
    const today = new Date();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('orders', {
            first_name,
            last_name,
            email,
            phone_number,
            created_at: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate replace to="/orders" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control"
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control"
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control"
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default OrderCreate;
function now(): any {
    throw new Error('Function not implemented.');
}

