import React from 'react';
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import Navbar from './Navbar';
import NavbarAdmin from './NavbarAdmin';
import requireAuthP1 from './requireAuthP1';
import { Table } from 'reactstrap';


import {
    Button,
    FormGroup,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    Col,
    Popover,
    PopoverHeader,
    PopoverBody,
} from "reactstrap";

import '../styles/Employees.css';
import q from '../img/q.png';

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.props.findEmployees();

        this.toggle = this.toggle.bind(this);
        this.toggleQ = this.toggleQ.bind(this);
        this.state = {
            modal: false,
            popoverOpen: false,
            firstName: this.firstName,
            lastName: this.lastName,
            id: this.id,
            sortList: '',
            dropdownOpen: false

            
        };
    }

    onSortChange = (value) => {
        this.setState({
            sortList: value
        })
    }

    onAdminChange = (privilege, id) => {

        if(this.props.user.id === id){

            console.log('nope')

        } else {

            this.props.privilegeChange(privilege, id)
        }

    }


    toggle = (firstName, lastName, id, email) => {
        this.setState({
        modal: !this.state.modal,
        firstName: firstName,
        lastName: lastName,
        id: id,
        email: email
        });
    };

    toggleQ() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    headerToggle = () => {
        this.setState({
        modal: !this.state.modal,
        });
    };

    
    render() {
        var navbar;
        if(this.props.user.privilege === 'employee'){
        navbar = <Navbar />
        } else {
        navbar = <NavbarAdmin />
        }

        const {employees} = this.props;


        var p1Array = [];
        var p2Array = [];

        if(employees && employees.length){

            employees.map(
                (index) => {
                if(index.privilege === 'admin'){
                    p1Array.push(index);
                } else if (index.privilege === 'employee'){
                    p2Array.push(index);
                } })
        }
    
        //sorting for employee list
        if(this.state.sortList === 'firstName'){
            var sortedP1 = p1Array.sort((a, b) => {
                var nameA=a.firstName.toLowerCase(), nameB=b.firstName.toLowerCase()
                if (nameA < nameB) 
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            })

            var sortedP2 = p2Array.sort((a, b) => {
                var nameA=a.firstName.toLowerCase(), nameB=b.firstName.toLowerCase()
                if (nameA < nameB) 
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            })
        } else if(this.state.sortList === 'lastName'){
            var sortedP1 = p1Array.sort((a, b) => {
                var nameA=a.lastName.toLowerCase(), nameB=b.lastName.toLowerCase()
                if (nameA < nameB) 
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            })

            var sortedP2 = p2Array.sort((a, b) => {
                var nameA=a.lastName.toLowerCase(), nameB=b.lastName.toLowerCase()
                if (nameA < nameB) 
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            })
        } else {
            var sortedP1 = p1Array.sort((a, b) => {
                var nameA=a.friendCount, nameB=b.friendCount
                if (nameA < nameB) 
                    return 1 
                if (nameA > nameB)
                    return -1
                return 0
            })

            var sortedP2 = p2Array.sort((a, b) => {
                var nameA=a.friendCount, nameB=b.friendCount
                if (nameA < nameB) 
                    return 1
                if (nameA > nameB)
                    return -1
                return 0
            })
        }

        



        return (
            <div >
                {navbar}

                <h3>Sort by:</h3>
                <select defaultValue='Friend Count' onChange={(e) => this.onSortChange(e.target.value)}>
                    <option value='friendCount'>Friend Count</option>
                    <option value='firstName'>First Name</option>
                    <option value='lastName'>Last Name</option>
                </select>
    
                <div className='clientBackground'>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader className='eventConfirmationForm1' toggle={this.headerToggle}>Warning</ModalHeader>
                            <ModalBody className='eventConfirmationForm2'>
                        
                                <FormGroup row>
                                    <Label className="modalLabels" md={3}>
                                
                                    </Label>
                                    <Col md={12}>
                                        Are you sure you want to delete {this.state.firstName} {this.state.lastName}?
                                    
                                    </Col>
                                </FormGroup>
                                <Button  className='empButton' color='warning' onClick={() => this.toggle()}>Cancel</Button>
                                <Button  className='empButton' color='danger' onClick={() => {
                                    this.props.deleteEmployee(this.state.id, this.props.user.id);
                                    this.toggle();
                                    }}>Delete</Button>
                            </ModalBody>
                            </Modal>
            
                    <h2 className='employeeTitle'>Admins</h2>
                        <Table bordered>
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">First Name</th>
                                        <th className="text-center">Last Name</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Friend Count</th>
                                        <th className="text-center">Privilege</th>
                                    </tr>
                                </thead>
                                    { employees? sortedP1.map((employee, index) => {
                                        return <tbody key={employee.email}>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td align='center'>{employee.firstName}</td>
                                                <td align='center'>{employee.lastName}</td>
                                                <td align='center'>{employee.email}</td>
                                                <td align='center'>{employee.friendCount}</td>
                                                
                                                {
                                                    this.props.user.id === employee.id ? 
                                                    <td>
                                                        <select defaultValue={employee.privilege} onChange={(e) => this.onAdminChange(e.target.value, employee.id)}>
                                                            <option id='opt1' value='admin'>Admin</option></select><img className='q1' alt='question' id="Popover1" src={q} onClick={this.toggleQ}></img>
                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggleQ}>
                                <PopoverHeader>Privilege</PopoverHeader>
                                <PopoverBody>To prevent losing admin access, only another admin can change your privilege setting. </PopoverBody>
                            </Popover>
                                                    </td>
                                                            
                                                        : <td>
                                                            <select defaultValue={employee.privilege} onChange={(e) => this.onAdminChange (e.target.value, employee.id)}>
                                                            <option id='opt1' value='admin'>Admin</option>
                                                            <option id='opt2' value='employee'>Employee</option>
                                                        </select>
                                                    </td>
                                                }
                                                
                                            </tr>
                                        </tbody>
                                    }) : null}
                        </Table>
                    <h2 className='employeeTitle'>Employees</h2>    
                        <Table bordered>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th className="text-center">Last Name</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Friend Count</th>
                                        <th className="text-center">Privilege</th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                </thead>
                                    { employees? sortedP2.map((employee, index) => {
                                        return <tbody key={employee.email}>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td align='center'>{employee.firstName}</td>
                                                <td align='center'>{employee.lastName}</td>
                                                <td align='center'>{employee.email}</td>
                                                <td align='center'>{employee.friendCount}</td>
                                                <td align='center'>
                                                    <select defaultValue={employee.privilege}
                                                        onChange={(e) => this.props.privilegeChange(e.target.value, employee.id)}>
                                                        <option id='opt1' value='admin'>Admin</option>
                                                        <option id='opt2' value='employee'>Employee</option>
                                                    </select>
                                                </td>
                                                <td align='center'>
                                                    <Button className='DBC' color='danger' onClick={() => this.toggle(employee.firstName, employee.lastName, employee.id, employee.email)}>X</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }) : null}
                        </Table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        employees: state.employees,
        user: state.auth
    }
}

export default requireAuthP1(connect(mapStateToProps, actions)(Employees));