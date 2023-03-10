import React, {Dispatch, useEffect, useState} from 'react';
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios";
import {Navigate} from 'react-router-dom';
import {connect} from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";

const Wrapper = (props: any) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('user');

                    props.setUser(new User(
                        data.data.user.id,
                        data.data.user.first_name,
                        data.data.user.last_name,
                        data.data.user.email,
                        data.data.user.role
                    ));
                } catch (e) {
                    setRedirect(true);
                }
            }
        )();
    }, []);

    if (redirect) {
        return <Navigate replace to="/login" />;
    }

    return (
        <>
            <Nav/>

            <div className="container-fluid">
                <div className="row">
                    <Menu/>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
