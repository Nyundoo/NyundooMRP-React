import React, { useEffect, useState } from 'react';
import Wrapper from "../../components/Wrapper";
import Paginator from "../../components/Paginator";
import axios from 'axios';
import { Order } from "../../models/order";
import { OrderItem } from "../../models/order-item";
import { Link, Navigate } from 'react-router-dom';

const hide = {
    maxHeight: 0,
    transition: '1000ms ease-in'
}

const show = {
    maxHeight: '150px',
    transition: '1000ms ease-out'
}

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [selected, setSelected] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`orders?page=${page}`);

                setOrders(data.data);
                setLastPage(data.meta.last_page);

                const response = await axios.get('products/${id}');

                setProducts(response.data.data.product);
            }
        )();
    }, [page]);

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`orders/${id}`);

            setOrders(orders.filter((p: Order) => p.id !== id));
        }

        setRedirect(true);

    }

    const del2 = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`order-items/${id}`);

            setOrders(orders.filter((p: OrderItem) => p.id !== id));
        }
        setRedirect(true);
    }

    const select = (id: number) => {
        setSelected(selected !== id ? id : 0);
    }

    if (redirect) {
        return <Navigate replace to="/orders" />;
    }

    const handleExport = async () => {
        const { data } = await axios.post('export', {}, { responseType: 'blob' });
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.csv';
        link.click();
    }

    return (
        <Wrapper>

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={handleExport}>Export</a>
                    </li>
                    <li className="page-item">
                        <Link to="/orders/create" className="page-link">Add Order</Link>
                    </li>
                    <li className="page-item">
                        <Link to="/order-items/create" className="page-link">Add Order Item</Link>
                    </li>
                </ul>
            </nav>

            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o: Order) => {
                            return (
                                <>
                                    <tr key={o.id}>
                                        <td>{o.id}</td>
                                        <td>{o.name}</td>
                                        <td>{o.email}</td>
                                        <td>{o.phone_number}</td>
                                        <td>{o.total}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <a href="#" className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => select(o.id)}
                                                >View</a>

                                                <Link to={`/orders/${o.id}/edit`}
                                                    className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                <a href="#" className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => del(o.id)}
                                                >Delete</a>
                                            </div>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="overflow-hidden" style={selected === o.id ? show : hide}>
                                                <table className="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Product Id</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {o.order_items.map((i: OrderItem) => {
                                                            return (
                                                                <tr>
                                                                    <td>{i.id}</td>
                                                                    <td>{i.product_id}</td>
                                                                    <td>{i.quantity}</td>
                                                                    <td>{i.price}</td>
                                                                    <td>
                                                                        <div className="btn-group mr-2">
                                                                            <Link to={`/order-items/${i.id}/edit`}
                                                                                className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                                                                onClick={() => del2(i.id)}
                                                                            >Delete</a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
        </Wrapper>
    );
};

export default Orders;
function setRedirect(arg0: boolean) {
    throw new Error('Function not implemented.');
}

