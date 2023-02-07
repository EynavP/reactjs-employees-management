import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
import { Button, TextField } from '@mui/material';

const AddEmployeeComponent = () => {
    
    const [first_name,setFirstName] = useState('')
    const [last_name,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    const saveOrUpdateEmployee = (e) =>{
        e.preventDefault();
        const employee = {first_name, last_name, email}

        if(id){
            if(last_name === 0 || last_name.length === 0 || email.length ===0 ){
                toast.error("Fields can't be empty!")
            }
            else if(!regex.test(email)){
                toast.error("Email address is not valid!")
            }else{
                EmployeeService.updateEmployee(id, employee).then(response =>{
                    console.log(response.data)
                    navigate('/employees');
                }).catch(error => {console.log(error);});
            }
        }
        else{
            if(last_name.length === 0 || last_name.length === 0 || email.length ===0 ){
                toast.error("Fields can't be empty!")
            }
            else if (!regex.test(email)){
                toast.error("Email address is not valid!")
            }else{
                EmployeeService.createEmployee(employee).then(response => {
                    console.log(response.data)
                    navigate('/employees');
            }).catch(error => {console.log(error)});
            }
        }  
    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((response) => {
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setEmail(response.data.email)
        }).catch(error => {console.log(error)})
    },[])

    const title = () => {
        if(id){
            return <h2 className='title'> Update Employee</h2>
        }else{
            return <h2 className='title'> Add Employee</h2>
        }
    }
  return (
    <div>
        <br/>
        <div className='autolayer'>
        {
            title()
        }
        </div>
        <div className='container'>
            <div className = "row">
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <br/>
                    
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <TextField
                                    type="text"
                                    label = "First Name"
                                    name=''
                                    className='form-control'
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}>
                                </TextField>
                            </div>
                            <div className='form-group mb-2'>
                                <TextField
                                    type="text"
                                    label="Last Name"
                                    className='form-control'
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}>
                                </TextField>
                            </div>
                            <div className='form-group mb-2'>
                                <TextField
                                    type="email"
                                    label='Email'
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>
                                </TextField>
                            </div>
                            <div className='autolayer'>
                                <Button className='btn' variant='contained' color='success' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</Button>
                                <Button className='btn' variant='contained' color='error' component={Link} to="/employees">Cancel</Button>
                            </div>
                            <ToastContainer/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default AddEmployeeComponent