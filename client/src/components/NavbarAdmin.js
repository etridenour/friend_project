import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import {
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
UncontrolledDropdown,
DropdownToggle,
DropdownMenu,
DropdownItem,
Input,
Button,
Form,
FormGroup,
Label,
Modal,
ModalHeader,
ModalBody,
Col } from 'reactstrap';

import '../styles/NavbarAdmin.css';


class AppNavbar extends React.Component {
constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
    isOpen: false,
    modal: false,
    friendModal: false,
    pin: null,
    friendPin: null,
    friendId: null
    };
}



componentWillReceiveProps = (nextProps) => {

    if(nextProps.user.secretpin){
    this.state.pin = nextProps.user.secretpin;
    }
    
}

toggleModal = () => {
    this.setState({
        modal: !this.state.modal
    });
};

toggleFriendModal = () => {
    // this.props.clearMessages();
    this.setState({
        friendModal: !this.state.friendModal
    });
};


toggle() {
    this.setState({
    isOpen: !this.state.isOpen
    });
}

onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
};

onSubmit = e => {
    e.preventDefault();

    let newPinData = {
    id: this.props.user.id,
    pin: this.state.pin,
    newFirstName: this.state.firstName,
    newLastName: this.state.lastName
    }
    
    this.props.changeProfile(newPinData);

    this.toggleModal();

};

onSubmitFriend = e => {
    e.preventDefault();

    let alreadyFriend = false;
    let thisIsMe = false;
    let friendFirstName = '';
    let friendLastName = '';
    
    for(let friend of this.props.friends) { 

    if(friend.secretpin === this.state.friendPin){
        alreadyFriend = true;
        friendFirstName = friend.firstName;
        friendLastName = friend.lastName;
        break;
    } else if (this.props.user.secretpin === this.state.friendPin){
        thisIsMe = true;
    }

    }


    if(thisIsMe === true) {

        this.props.thisIsMe();

    } else if(alreadyFriend === true){

        this.props.alreadyFriends(friendFirstName, friendLastName)

    } else {

    let newFriendData = {
        id: this.props.user.id,
        friendCount: this.props.user.friendCount,
        friendPin: this.state.friendPin
    }

    this.props.newFriend(newFriendData);
    

    this.toggleFriendModal();
    this.props.clearMessages();
    }

}


render() {

    const {user} = this.props;

    return (
    <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
        <ModalHeader className='eventConfirmationForm1' toggle={this.toggleModal}>My Profile</ModalHeader>
        <ModalBody className='eventConfirmationForm2'>
            <Form  onSubmit={this.onSubmit}>
            <FormGroup row>
                <Label className="modalLabels" for="startTime" md={3}>
                Email
                </Label>
                <Col md={3}>
                <Input plaintext>{user.email}</Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label className="modalLabels" for="nameOfEvent" md={3}>
                First Name
                </Label>
                <Col md={3}>
                <Input className='createInput' name='firstName' type='text' onChange={this.onChange} defaultValue={user.firstName}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label className="modalLabels" for="nameOfEvent" md={3}>
                Last Name
                </Label>
                <Col md={3}>
                <Input className='createInput' name='lastName' type='text' onChange={this.onChange} defaultValue={user.lastName}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label className="modalLabels" for="startDate" md={3}>
                Pin
                </Label>
                <Col md={3}>
                <Input  className='createInput' name="pin" type='text' onChange={this.onChange} defaultValue={user.secretpin}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Button
                color='danger'
                className="cancelButton buttonStyle"
                style={{ marginTop: "2rem" }}
                onClick={this.toggleModal}>
                Cancel
                </Button>
                <Button
                color='success'
                className="submitButton buttonStyle"
                type='submit'
                style={{ marginTop: "2rem" }}>
                Save
                </Button>
            </FormGroup>
            </Form>
        </ModalBody>
        </Modal>

        <Modal isOpen={this.state.friendModal} toggle={this.toggleFriendModal}>
        <ModalHeader className='eventConfirmationForm1' toggle={this.toggleFriendModal}>New Friend</ModalHeader>
        <ModalBody className='eventConfirmationForm2'>
            <Form  onSubmit={this.onSubmitFriend}>
            <FormGroup row>
                <Label className="modalLabels" for="nameOfEvent" md={3}>
                Friend Pin
                </Label>
                <Col md={3}>
                <Input className='createInput' name='friendPin' type='text' onChange={this.onChange}></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <h2>{this.props.errorMessage}</h2>
                <Button
                color='danger'
                className="cancelButton buttonStyle"
                style={{ marginTop: "2rem" }}
                onClick={()=>{
                    this.toggleFriendModal()
                    this.props.clearMessages()
                }}>
                Cancel
                </Button>
                <Button
                color='success'
                className="submitButton buttonStyle"
                type='submit'
                style={{ marginTop: "2rem" }}>
                Add Friend
                </Button>
            </FormGroup>
            </Form>
        </ModalBody>
        </Modal>


        <Navbar color="dark" className='fixedTop' light expand="md">
        <NavbarBrand className='white'>Water Cooler</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <Link to="/user"><Button className='homeButton' color='primary'>Home</Button></Link>
            </NavItem>
            <NavItem>
                <Link to="/employees"><Button className='employeeButton' color='warning'>Employees</Button></Link>
            </NavItem>
            <NavItem>
                <Button className='addFriendButton' color='success' onClick={this.toggleFriendModal}>Add Friend</Button>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className='userName white' nav caret>
                    {user.firstName} {user.lastName}
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem className='profile' onClick={this.toggleModal}>
                    Profile
                </DropdownItem>
                <DropdownItem>
                    
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    <Link to="/signout">Sign Out</Link>
                </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>
        </Collapse>
        </Navbar>
    </div>
    );
}
}


function mapStateToProps(state){
return{
    user: state.auth,
    friends: state.friends,
    errorMessage: state.auth.errorMessage
}
}

export default connect(mapStateToProps, actions)(AppNavbar);