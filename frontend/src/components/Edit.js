import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Edit() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [employeeInput, setEmployee] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {

        axios.get(`/api/edit-employee/${id}`).then( res => {

            if(res.data.status === 200)
            {
                setEmployee(res.data.employee);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/');
            }
        });

// eslint-disable-next-line
    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setEmployee({...employeeInput, [e.target.name]: e.target.value });
    }

    const updateEmployee = (e) => {
        e.preventDefault();

// const id = props.params.id;

        const data = {
            name:employeeInput.name,
            phone:employeeInput.phone,
            email:employeeInput.email,
        }

        axios.put(`/api/update-employee/${id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                navigate('/');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/');
            }
        });
    }

    if(loading)
    {
        return <h4>Employees Data loading...</h4>
    }

    return (
        <div>
            <div className="row header-container justify-content-center">
                <div className="container-fluid mt-4">
                    <div className="row justify-content-center">
                        <section className="col-md-8">
                            <div className="card mb-3">
                                <h5 className="card-title">Update employee data</h5>
                                <div className="card-body">
                                    <form onSubmit={updateEmployee} >
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" name="name" onChange={handleInput} value={employeeInput.name} className="form-control" />
                                            <span className="text-danger">{errorInput.name}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" name="phone" onChange={handleInput} value={employeeInput.phone} className="form-control" />
                                            <span className="text-danger">{errorInput.phone}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" name="email" onChange={handleInput} value={employeeInput.email} className="form-control" />
                                            <span className="text-danger">{errorInput.email}</span>
                                        </div>
                                        <button type="submit" className="btn btn-info">Update</button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Edit;