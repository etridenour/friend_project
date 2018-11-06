import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

import '../styles/User.css';


class User extends React.Component {
    constructor(props) {
        super(props);
        this.props.findFriends();     
        this.state = ({
            colorArray: ['primary', 'success', 'info', 'warning', 'danger']
        })   
    }

    renderCards = ()=> {
        

        var colorNumber = 0
        var renderedCards = []

        this.props.friends.map((friend, index) =>  {


            renderedCards.push(<Card className='card' inverse color={this.state.colorArray[colorNumber]}>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
                <CardTitle>{friend.name}</CardTitle>
                <CardSubtitle>{friend.email}</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
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

        console.log(renderedCards)

        return renderedCards
            
            
        
    }
    

    render() {
        console.log(this.props)
        return (
            <div className='mainDiv'>
            { 
                this.props.friends ? this.renderCards() : null
                
            }
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        friends: state.friends
    }
}

export default connect(mapStateToProps, actions)(User);
