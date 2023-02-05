import axios from 'axios';
import React, {SyntheticEvent, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import { Navigate } from 'react-router-dom';

const OrderItemCreate = () => {
    const [order_idx, setOrderId] = useState('');
    const [product_idx, setProductId] = useState('');
    const [pricex, setPrice] = useState('');
    const [quantityx, setQuantity] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('order-items', {
            order_id: parseInt(order_idx),
            product_id: parseInt(product_idx),
            price:  parseFloat(pricex),
            quantity:  parseInt(quantityx)
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
                    <label>Order Id</label>
                    <input className="form-control"
                           onChange={e => setOrderId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Product Id</label>
                    <input className="form-control"
                           onChange={e => setProductId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input className="form-control"
                           onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Quantity</label>
                    <input className="form-control"
                           onChange={e => setQuantity(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default OrderItemCreate;
