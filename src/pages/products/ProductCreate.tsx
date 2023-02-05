import axios from 'axios';
import React, {SyntheticEvent, useRef, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import ImageUpload from "../../components/ImageUpload";
import { Navigate } from 'react-router-dom';

const ProductCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [pricex, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);    
    const ref = useRef<HTMLInputElement>(null);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('products', {
            title,
            description,
            image,
            price: parseFloat(pricex)
        });

        setRedirect(true);
    }

    const updateImage = (url: string) => {
        if (ref.current) {
            ref.current.value = url;
        }
        setImage(url);
    }

    if (redirect) {
        return <Navigate replace to="/products" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control"
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                              onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input className="form-control"
                               value={image}
                               onChange={e => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control"
                           onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductCreate;
