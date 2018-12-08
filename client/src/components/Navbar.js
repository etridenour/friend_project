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
  Alert,
  Col } from 'reactstrap';

  import '../styles/Navbar.css';


class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      modal: false,
      friendModal: false,
      pin: null,
      friendPin: '',
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
    this.props.clearMessages();
    this.setState({ 
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let newPinData = {
      id: this.props.user.id,
      pin: this.state.pin,
      newFirstName: this.state.firstName,
      newLastName: this.state.lastName,
      newJobDescription: this.state.jobDescription,
      newTitle: this.state.title
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
      } 
    }

    if (this.props.user.secretpin === this.state.friendPin){
      thisIsMe = true;
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
      this.props.clearMessages();
      this.setState({
        friendPin: ''
      })

    }

  }

  

  render() {
    
    const {user} = this.props;


    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader className='modalHeader' toggle={this.toggleModal}>My Profile</ModalHeader>
          <ModalBody className='modalBody'>
            <Form  onSubmit={this.onSubmit}>
              <FormGroup row>
                <Label className="modalLabels" for="startTime" md={4}>
                  Email
                </Label>
                <Col md={3}>
                  <Input plaintext>{user.email}</Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="modalLabels" for="nameOfEvent" md={4}>
                  First Name
                </Label>
                <Col md={3}>
                  <Input className='inputs createInput' name='firstName' type='text' onChange={this.onChange} defaultValue={user.firstName}></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="modalLabels" for="nameOfEvent" md={4}>
                  Last Name
                </Label>
                <Col md={3}>
                  <Input className='inputs createInput' name='lastName' type='text' onChange={this.onChange} defaultValue={user.lastName}></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="modalLabels" for="startDate" md={4}>
                  Pin
                </Label>
                <Col md={3}>
                  <Input  className='inputs createInput' name="pin" type='text' onChange={this.onChange} defaultValue={user.secretpin}></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="modalLabels" for="startDate" md={4}>
                  Job Description
                </Label>
                <Col md={3}>
                  <Input  className='inputs createInput' name="jobDescription" type='text' onChange={this.onChange} defaultValue={user.jobDescription}></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="modalLabels" for="startDate" md={4}>
                  Title
                </Label>
                <Col md={3}>
                  <Input  className='inputs createInput' name="title" type='text' onChange={this.onChange} defaultValue={user.title}></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button
                  color='danger'
                  className="modalButton cancelButton buttonStyle"
                  style={{ marginTop: "2rem" }}
                  onClick={this.toggleModal}>
                  Cancel
                </Button>
                <Button
                  color='success'
                  className="modalButton submitButton buttonStyle"
                  type='submit'
                  style={{ marginTop: "2rem" }}>
                  Save
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.friendModal} toggle={this.toggleFriendModal}>
          <ModalHeader className='friendModal' toggle={this.toggleFriendModal}>New Friend</ModalHeader>
          <ModalBody className='modalBody'>
            <Form  onSubmit={this.onSubmitFriend}>
              <FormGroup row>
                <Label className="friendLabel" for="nameOfEvent" md={3}>
                  Friend Pin
                </Label>
                <Col md={5}>
                  <Input value={this.state.friendPin} className='inputs pinInput' name='friendPin' type='text' onChange={this.onChange}></Input>
                </Col>
              </FormGroup>
              <FormGroup className='messages' row>
                { this.props.user.friendSuccess ? <h5 className='addFriendSuccess'>Friend added</h5> : null }
                <h5 className='addFriendError'>{this.props.errorMessage}</h5>
              </FormGroup>
              <FormGroup row>
                <Button
                  color='danger'
                  className="modalButton cancelButton buttonStyle"
                  onClick={()=>{
                    this.toggleFriendModal()
                    this.props.clearMessages()
                  }}>
                  Cancel
                </Button>
                <Button
                  color='success'
                  className="modalButton submitButton buttonStyle"
                  type='submit'>
                  Add Friend
                </Button>
                <Button
                  color='warning'
                  className="modalButton cancelButton buttonStyle"
                  onClick={()=>{
                    this.toggleFriendModal()
                    this.props.clearMessages()
                  }}>
                  Done
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>


        <Navbar  className='expansion'expand="md">
          <NavbarBrand className='white navbarTitle'>Water Cooler</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
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
                  <DropdownItem className='signoutDrop'>
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