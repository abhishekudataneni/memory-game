import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import './Card.css';

const Card = (props) => {
  let style  ={};
  if(props.showing){
    style.backgroundColor = props.backgroundColor;
  }
  return (
    <div 
      onClick={props.onClick} 
      className="card-container" 
      style={style}
    >
    </div>
    )
}
const CardState = {
      HIDING: 0,
      SHOWING: 1,
      MATCHING: 2
    }
    
class App extends Component {
  constructor(props){
    super(props)
    
    let cards = [
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
    ];
    // const boxesColorsArr = Array(12).fill().map(() => (this.getRandomColor()))
    cards = this.shuffle(cards)
    this.state = {cards,noClick:false}
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  shuffle(array) {
    let cards = array.slice();
    for (let i = cards.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = cards[i];
      cards[i] = cards[randomIndex];
      cards[randomIndex] = temp;
    }
    return cards;
  } 
  
  handleClick(id){
      const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    const foundCard = this.state.cards.find(c => c.id === id);
    
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    
    let noClick = false;
    
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    
    const showingCards =  cards.filter((c) => c.cardState === CardState.SHOWING);
    
    const ids = showingCards.map(c => c.id);
    
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      
      noClick = true;
      
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });
      return;
    }
    
    this.setState({cards, noClick});
  };
  
  handleNewGame(){
    let cards = this.state.cards.map(c => ({
      ...c,cardState: CardState.HIDING
    }));
    cards = this.shuffle(cards);
    this.setState({cards});
  }

// getRandomColor(){
  // let index = Math.floor(Math.random() * allColors.length)
  // return allColors[index]
  // }
  
  render() {
    const cards = this.state.cards.map((card) => (
      <Card 
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => {
         console.log(this + "one");
        return this.handleClick(card.id)}}
        />
    ))
    return (
     <div >
        <Navbar onNewGame={this.handleNewGame}/>
        {cards}
     </div>
    );
  }
}


// Card.propTypes = {
//   showing: PropTypes.bool.isRequired,
//   backgroundColor: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired
// }




export default App;
