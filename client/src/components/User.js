import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

import Navbar from './Navbar'
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
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
                <CardTitle>{friend.firstName}</CardTitle>
                <CardSubtitle>{friend.email}</CardSubtitle>
                <CardText>Hobbies</CardText>
                <Button>Button</Button>
            </CardBody>
            </Card>)

            if(colorNumber > 4){
                colorNumber = 0
            }
            else{
                colorNumber += 1
            }

            

        })

        // console.log(renderedCards, this.props.friends)
        // console.log(this.props.user.id)

        return renderedCards
    }
    

    render() {
    
        return (
            <div>
                <Navbar />
                
                {
                    this.props.friends ?  <h2>Total friends: {this.props.friends.length}</h2> : null
                }
                

                <div className='cardContainer'>

                { 
                    this.renderCards()
                    
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
