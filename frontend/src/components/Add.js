import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

function Add() {

    const navigate = useNavigate();

    const [employeeInput, setEmployee] = useState({
        name:'',
        phone:'',
        email:'',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setEmployee({...employeeInput, [e.target.name]: e.target.value })
    }

    const saveEmployee = (e) => {
        e.preventDefault();

        const data = {
            name:employeeInput.name,
            phone:employeeInput.phone,
            email:employeeInput.email,
        }

        axios.post(`/api/add-employee`, data).then(res => {
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setEmployee({
                    name:'',
                    phone:'',
                    email: '',
                    error_list: [],
                });
                navigate('/');
            }
            else if(res.data.status === 422)
            {
                setEmployee({...employeeInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <div>
            <div className="row header-container justify-content-center">
                <div className="header">
                    <h1>Employees Details</h1>
                </div>
            </div>
            <div className="container-fluid mt-4"  id="create-form">
                <div className="row justify-content-center">
                    <section className="col-md-8">
                        <div className="card mb-3">
                            <h5 className="card-title">Please Enter Your information</h5>
                            <div className="card-body">
                                <form onSubmit={saveEmployee} >
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={employeeInput.name}  className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={employeeInput.phone}  className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.phone}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={employeeInput.email} className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.email}</span>
                                    </div>
                                    <button type="submit" className="btn btn-info">Save</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Add;