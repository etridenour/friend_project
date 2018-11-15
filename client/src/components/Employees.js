import React from 'react';
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import Navbar from './Navbar';
import NavbarAdmin from './NavbarAdmin';
import requireAuthP1 from './requireAuthP1';
import { Table } from 'reactstrap';
// import requireAuthP1 from './requireAuthP1'
// import AppNavbarClient from './AppNavbarClient'
import {
    Input,
    Button,
    Form,
    FormGroup,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    Col,
    Popover,
    PopoverHeader,
    PopoverBody
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
            id: this.id
            
        };
    }

    onAdminChange = (privilege, id) => {

        if(this.props.user.id === id){

            console.log('nope')

        } else {

            this.props.privilegeChange(privilege, id)
        }

    }


    toggle = (name, id) => {
        this.setState({
        modal: !this.state.modal,
        name: name,
        id: id
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



        return (
            <div >
                {navbar}
    
                <div className='clientBackground'>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader className='eventConfirmationForm1' toggle={this.headerToggle}>Warning</ModalHeader>
                            <ModalBody className='eventConfirmationForm2'>
                        
                                <FormGroup row>
                                    <Label className="modalLabels" md={3}>
                                
                                    </Label>
                                    <Col md={9}>
                                        Are you sure you want to delete this employee? {this.state.firstName} {this.state.lastName}
                                    
                                    </Col>
                                </FormGroup>
                                <button onClick={() => {
                                    this.props.deleteEmployee(this.state.id);
                                    this.toggle();
                                    }}>Delete</button>
                                <button onClick={() => this.toggle()}>Cancel</button>
                        
                            </ModalBody>
                            </Modal>
            
                    <h2 className='employeeTitle'>Admins</h2>
                        <Table bordered>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Friend Count</th>
                                        <th>Privilege</th>
                                    </tr>
                                </thead>
                                    { employees? sortedP1.map((employee, index) => {
                                        return <tbody key={employee.email}>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{employee.firstName}</td>
                                                <td>{employee.lastName}</td>
                                                <td>{employee.email}</td>
                                                <td></td>
                                                
                                                {
                                                    this.props.user.id === employee.id ? 
                                                    <td>
                                                        <select defaultValue={employee.privilege} onChange={(e) => this.onAdminChange(e.target.value, employee.id)}>
                                                            <option id='opt1' value='admin'>Admin</option></select><img className='q1' id="Popover1" src={q} onClick={this.toggleQ}></img>
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
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Friend Count</th>
                                        <th>Privilege</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                    { employees? sortedP2.map((employee, index) => {
                                        return <tbody key={employee.email}>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{employee.firstName}</td>
                                                <td>{employee.lastName}</td>
                                                <td>{employee.email}</td>
                                                <td></td>
                                                <td>
                                                    <select defaultValue={employee.privilege}
                                                        onChange={(e) => this.props.privilegeChange(e.target.value, employee.id)}>
                                                        <option id='opt1' value='admin'>Admin</option>
                                                        <option id='opt2' value='employee'>Employee</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button className='DBC' onClick={() => this.toggle(employee.email, employee.id)}>X</button>
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

// export default requireAuthP1(connect(mapStateToProps, actions)(Employees));

export default requireAuthP1(connect(mapStateToProps, actions)(Employees));