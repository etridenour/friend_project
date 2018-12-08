import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, Row, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import Navbar from './Navbar'
import NavbarAdmin from './NavbarAdmin'
import requireAuth from './requireAuth'

import '../styles/User.css';


class User extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        let colorArray = ['primary', 'success', 'info', 'warning', 'danger']; 

        this.state = ({
            cardColor: this.shuffle(colorArray),
            popoverOpen: false
        })   
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
    

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


            renderedCards.push(<Card className='card zoom' inverse color={this.state.cardColor[colorNumber]} key={friend.id}>
            {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
            <CardBody id="Popover1" onClick={this.toggle}>
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
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                    {/* <PopoverHeader>Popover Title</PopoverHeader> */}
                    <PopoverHeader className='popUserHead'>{friend.email}</PopoverHeader>
                    <PopoverHeader className='popUserHead'>{friend.jobDescription}</PopoverHeader>
                    <PopoverHeader className='popUserHead'>{friend.title}</PopoverHeader>
                    <PopoverHeader className='popUserHead'>Friends since {friend.createdAt}</PopoverHeader>
                </Popover>
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
