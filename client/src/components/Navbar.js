import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import * as authActions from '../actions/authActions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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


class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      modal: false
    };
  }


  toggleModal = () => {
      this.setState({
          modal: !this.state.modal
      });
  };


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onSubmit = e => {
    e.preventDefault();

    console.log(this.state.firstName)

    // this.toggleModal();

  };

  render() {

    const {user} = this.props;
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader className='eventConfirmationForm1' toggle={this.toggleModal}>Profile</ModalHeader>
          <ModalBody className='eventConfirmationForm2'>
            <Form  onSubmit={this.onSubmit}>
              <FormGroup row>
                <Label className="modalLabels" for="nameOfEvent" md={3}>
                  Name
                </Label>
                <Col md={3}>
                  <Input className='createInput' plaintext>{user.firstName} {user.lastName}</Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="modalLabels" for="startTime" md={3}>
                  Email
                </Label>
                <Col md={3}>
                  <Input plaintext>{user.email}</Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="modalLabels" for="startDate" md={3}>
                  Pin
                </Label>
                <Col md={3}>
                  <Input name='pin' defaultValue={user.secretpin}></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button
                  className="cancelButton buttonStyle"
                  style={{ marginTop: "2rem" }}
                  onClick={this.toggleModal}>
                  Cancel
                </Button>
                <Button
                  className="submitButton buttonStyle"
                  type='submit'
                  style={{ marginTop: "2rem" }}>
                  Edit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>


        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Water Cooler</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/signup">Sign Up</Link>
              </NavItem>
              <NavItem>
                <Link to="/signin">Sign In</Link>
              </NavItem>
              <NavItem>
                <Link to="/signout">Sign Out</Link>
              </NavItem>
              <NavItem>
                <Button onClick={this.toggleModal}>Profile</Button>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
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
      user: state.auth
  }
}

export default connect(mapStateToProps, {actions, authActions})(AppNavbar);