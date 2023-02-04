import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const AddEmployeeComponent = () => {
    
    const [first_name,setFirstName] = useState('')
    const [last_name,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

    const saveEmployee = (e) =>{
        e.preventDefault();
        const employee = {first_name, last_name, email}
        EmployeeService.createEmployee(employee).then((response) => {
            
            console.log(response.data)
            navigate('/employees')
        }).catch(error => {console.log(error)})
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
            return <h2 className='text-center'> Update Employee</h2>
        }else{
            return <h2 className='text-center'> Add Employee</h2>
        }
    }
  return (
    <div>
        <br/>
        <div className='container'>
            <div className = "row">
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <br/>
                    {
                        title()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type="text"
                                    placeholder='Enter First Name'
                                    name='firstname'
                                    className='form-control'
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}>
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Last Name'
                                    name='lastname'
                                    className='form-control'
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}>
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type="email"
                                    placeholder='Enter Email'
                                    name='email'
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>
                                </input>
                            </div>
                            <button className='btn btn-success' onClick={(e) => saveEmployee(e)}>Submit</button>
                            <Link to="/employees" className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent