import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`roles?page=${page}`);

                setRoles(data.data)
                setLastPage(data.meta.last_page)
            }
        )()
    }, [page]);

    const next = () => {
        if (page < lastPage){
            setPage(page + 1);
        }
    }

    const prev = () => {
        if (page >= 1){
            setPage(page - 1);
        }
    }

    const del = async (id: number) => {
        if(window.confirm('Are you sure you want to delete this record?')){
            await axios.delete(`roles/${id}`);

            setRoles(roles.filter((r: Role) => r.id !== id));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     {roles.map((role: Role) => {
                        return (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(role.id)}>Delete</a>
                                    </div>
                                </td>
                            </tr>
                        )
                     })}
                    </tbody>
                </table>
            </div>

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={prev}>Previous</a>
                    </li>
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={next}>Next</a>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    )
}

export default Roles;