import axios from 'axios';
import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import Wrapper from "../../components/Wrapper";

const OrderEdit = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const { id } = useParams();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`orders/${id}`);

                setFirstName(data.data.order.first_name);
                setLastName(data.data.order.last_name);
                setEmail(data.data.order.email);
                setPhoneNumber(data.data.order.phone_number);
            }
        )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`orders/${id}`, {
            first_name,
            last_name,
            email,
            phone_number,
            updated_at: new Date().toLocaleString(),
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
                           defaultValue={first_name}
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control"
                           defaultValue={last_name}
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control"
                           defaultValue={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Phone Number</label>
                    <input className="form-control"
                           defaultValue={phone_number}
                           onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default OrderEdit;
function now(): any {
    throw new Error('Function not implemented.');
}

