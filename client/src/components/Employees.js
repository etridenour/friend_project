import React from 'react';
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import Navbar from './Navbar'
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
    Col
  } from "reactstrap";

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.props.findEmployees();

        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false,
            firstName: this.firstName,
            lastName: this.lastName,
            id: this.id
            
        };
    }



    toggle = (name, id) => {
        this.setState({
        modal: !this.state.modal,
        name: name,
        id: id
        });
    };

    headerToggle = () => {
        this.setState({
        modal: !this.state.modal,
        });
    };

    render() {
        // var navbar;
        // if(this.props.authData.privilege === 'employee'){
        // navbar = <AppNavbarClient />
        // } else {
        // navbar = <AppNavbar />
        // }

        const {employees} = this.props;


        var p1Array = [];
        var p2Array = [];

        if(employees && employees.length){

            employees.map(
                (index) => {
                if(index.privilege === 'boss'){
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
                {/* {navbar} */}
                <Navbar />
                <div className='title'>Employee</div>
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
                {   
                    employees? sortedP1.map((employee) => {
                        return <div id='employee' key={employee.email}>
                                <div id='clientInfo'>Admin - {employee.email} {employee.firstName}
                                <select id='clientPriv' defaultValue={employee.privilege}
                                        onChange={(e) => this.props.privilegeChange(e.target.value, employee.id)}>
                                    <option id='opt1' value='boss'>Boss</option>
                                    <option id='opt2' value='employee'>Employee</option>
                                </select>
                                
                                </div>
                            </div>
                    }) : null}

                { 
                    employees? sortedP2.map((employee) => {
                        return <div id='employee' key={employee.email}>
                                <div id='clientInfo'>{employee.email} {employee.firstName}
                                <select id='clientPriv' defaultValue={employee.privilege}
                                        onChange={(e) => this.props.privilegeChange(e.target.value, employee.id)}>
                                    <option id='opt1' value='boss'>Boss</option>
                                    <option id='opt2' value='employee'>Employee</option>
                                </select>

                                
                                <button className='DBC' onClick={() => this.toggle(employee.email, employee.id)}>X</button>
                                

                                    
                                </div>
                            </div>
                    }) : null
                }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        employees: state.employees,
        authData: state.auth
    }
}

// export default requireAuthP1(connect(mapStateToProps, actions)(Employees));

export default connect(mapStateToProps, actions)(Employees);