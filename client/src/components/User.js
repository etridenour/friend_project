import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
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
            cardColor: this.shuffle(colorArray)
        })   
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


            renderedCards.push(<Card className='card' inverse color={this.state.cardColor[colorNumber]} key={friend.id}>
            {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
            <CardBody>
                <Row>
                    <Col className='box2' xs={4}>
                        <div></div>
                    </Col>
                    <Col className='box1' xs={8}>
                        <CardTitle>{friend.firstName} {friend.lastName}</CardTitle>
                        <CardSubtitle>{friend.email}</CardSubtitle>
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
                {navbar}
                
                {
                    this.props.friends.length ?  <h4 className='friendTotal'>Total friends: {this.props.friends.length}</h4> : <h4 className='friendTotal'>Total friends: 0</h4>
                }
                

                <div className='cardContainer'>

                { 
                    this.props.friends.length ? this.renderCards() : null
                    
                }
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
