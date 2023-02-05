import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = (props: {user: User}) => {  

    const logout =async () => {
        await axios.post('logout', {});
    }

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">Nyundoo</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link to="/profile" className="nav-link px-3">{props.user.name}</Link>
                </div>
                <div className="nav-item text-nowrap">
                    <Link to="/login" className="nav-link px-3" onClick={logout}>Sign out</Link>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Nav);