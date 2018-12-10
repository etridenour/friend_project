import React from 'react';
import { Card, 
    CardImg, 
    CardText, 
    CardBody, 
    CardTitle, 
    CardSubtitle, 
    Button, 
    Col, 
    Row, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form,
    FormGroup,
    Label,
    Input } 
    from 'reactstrap';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import Navbar from './Navbar'
import NavbarAdmin from './NavbarAdmin'
import requireAuth from './requireAuth'

import '../styles/User.css';


class User extends React.Component {
    constructor(props) {
        super(props);

        let colorArray = ['primary', 'success', 'info', 'warning', 'danger']; 

        this.state = ({
            modal: false,
            cardColor: this.shuffle(colorArray)
        })   
    }
    
    toggleModal = (friend) => {
        this.setState({
            modal: !this.state.modal,
            name: friend.firstName + ' ' + friend.lastName,
            email: friend.email,
            jobDescription: friend.jobDescription,
            title: friend.title,
            createdAt: friend.createdAt
        });
    };
    

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    
    renderCards = () => {
        
        var colorNumber = 0
        var renderedCards = []
    
        this.props.friends.map((friend) =>  {

            renderedCards.push(<Card className='card zoom' inverse color={this.state.cardColor[colorNumber]} key={friend.id} onClick={() => this.toggleModal(friend)}>
            {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
            <CardBody>
                <Row>
                    <Col className='box2' xs={4}>
                        <div></div>
                    </Col>
                    <Col className='box1' xs={8}>
                        <CardTitle className='cardFriendName'>{friend.firstName} {friend.lastName}</CardTitle>
                        {/* <CardSubtitle>{friend.email}</CardSubtitle> */}
                        {/* <CardText>Hobbies</CardText> */}
                        {/* <Button>Button</Button> */}
                    </Col>
                </Row>
                <div className='box2' md={4}>
                    <div className='stamp'>{friend.firstName[0].toUpperCase()}{friend.lastName[0].toUpperCase()}</div>
                </div>
            </CardBody>
            </Card>)

            if(colorNumber > 3){
                colorNumber = 0
            }
            else{
                colorNumber += 1
            }       
        })


        return renderedCards
    }
    

    render() {

        var navbar;
        if(this.props.user.privilege === 'admin' || this.props.user.privilege === 'boss'){
        navbar = <NavbarAdmin />
        } else {
        navbar = <Navbar />
        }
    
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader className='modalHeader' toggle={this.toggleModal}>{this.state.name}</ModalHeader>
                    <ModalBody className='modalBody'>
                        <Form>
                        <FormGroup row>
                            <Label className="modalLabels" for="startTime" md={4}>
                            Email
                            </Label>
                            <Col md={8}>
                            <Input plaintext>{this.state.email}</Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label className="modalLabels" for="startTime" md={4}>
                            Department
                            </Label>
                            <Col md={8}>
                            <Input plaintext>{this.state.jobDescription}</Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label className="modalLabels" for="startTime" md={4}>
                            Title
                            </Label>
                            <Col md={8}>
                            <Input plaintext>{this.state.title}</Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label className="modalLabels" for="startTime" md={4}>
                            Friends Since 
                            </Label>
                            <Col md={8}>
                            <Input plaintext>{this.state.createdAt}</Input>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                            <Button
                            color='success'
                            className="modalButton cancelButton buttonStyle"
                            style={{ marginTop: "2rem" }}
                            onClick={this.toggleModal}>
                            Ok
                            </Button>
                        </FormGroup>
                        </Form>
                    </ModalBody>
                    </Modal>

                {navbar}
                <div className='background'>
                    <div className='totalFriendsBox'>
                        {
                            this.props.friends.length ?  <h4 className='friendTotal'>Total friends: {this.props.friends.length}</h4> : <h4 className='friendTotal'>Total friends: 0</h4>
                        }
                    </div>

                    <div className='cardContainer'>

                    { 
                        this.props.friends.length ? this.renderCards() : null
                        
                    }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        friends: state.friends,
        user: state.auth
    }
}

export default requireAuth(connect(mapStateToProps, actions)(User));
