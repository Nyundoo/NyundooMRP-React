import axios from 'axios';
import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import Wrapper from "../../components/Wrapper";

const OrderItemEdit = () => {
    const [order_idx, setOrderId] = useState('');
    const [product_idx, setProductId] = useState('');
    const [pricex, setPrice] = useState('');
    const [quantityx, setQuantity] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`order-items/${id}`);

                setOrderId(data.data.order_items.order_id);
                setProductId(data.data.order_items.product_id);
                setPrice(data.data.order_items.price);
                setQuantity(data.data.order_items.quantity);
            }
        )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`order-items/${id}`, {
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
                           defaultValue={order_idx}
                           onChange={e => setOrderId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Product Id</label>
                    <input className="form-control"
                           defaultValue={product_idx}
                           onChange={e => setProductId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input className="form-control"
                           defaultValue={pricex}
                           onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Quantity</label>
                    <input className="form-control"
                           defaultValue={quantityx}
                           onChange={e => setQuantity(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default OrderItemEdit;
