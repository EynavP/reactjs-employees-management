import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import '../App.css'
import { Button, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';




const ListEmployeeComponent = () => {

    const [employees,setEmployees] = useState([])

    useEffect(()=> {
        getAllEmployees();
    },[])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error => {console.log(error);})
    }

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then(response => {
            getAllEmployees();
        }).catch(error => { console.log(error);})
    }

  return (
    <div className='container'>
        <div className='autolayer'>
            <h2 className='title'>Employees List</h2>
            <Fab color="primary" component={Link} to = "/add-employee" aria-label='add'> <AddIcon /></Fab>
        </div>
        <TableContainer component={Paper}>
            <Table>
                <TableHead className='table-head'>
                    <TableRow>
                        <TableCell className='row-table'>Employee Id</TableCell>
                        <TableCell className='row-table'>Employee First Name</TableCell>
                        <TableCell className='row-table'>Employee Last Name</TableCell>
                        <TableCell className='row-table'>Employee Email</TableCell>
                        <TableCell className='row-table'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        employees.map(
                            employee =>
                            <TableRow key={employee.id}>
                                <TableCell className='details-style'>{employee.id}</TableCell>
                                <TableCell className='details-style'>{employee.first_name}</TableCell>
                                <TableCell className='details-style'>{employee.last_name}</TableCell>
                                <TableCell className='details-style'>{employee.email}</TableCell>
                                <TableCell>
                                    <Button className='btn' variant='outlined' color='success' component={Link} to={`/edit-employee/${employee.id}`}>
                                            Update
                                    </Button>
                                    <Button variant='outlined' color='error' onClick={()=> deleteEmployee(employee.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default ListEmployeeComponent