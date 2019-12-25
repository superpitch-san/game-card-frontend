import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Topbar, Card, Modal } from '../../components';
import { encrypt, decrypt } from '../../helpers';
import { fetchGetScore, fetchCreateScore } from '../../actions';

import './Game.scss';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'valueOfCard': [],
      'clicked': 0,
      'myBestScore': 0,
      'matched': [],
      'first': null,
      'second': null,
      'isDisable': false,
      'isSuccess': false,
    };
    props.dispatch(fetchGetScore());
  }

  componentDidMount() {
    this.handleAssignValue();
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const { first, second, matched, isDisable, clicked, myBestScore } = nextState;
    const { getScore } = nextProps;
    if (first && second) {
      if (first === second) {
        const activeClass = document.querySelectorAll('.active');
        activeClass.forEach(card => {
          card.classList.add('matched');
          card.classList.remove('active');
        });
        this.setState({ 'matched': [...matched, first, second], 'first': null, 'second': null, 'isDisable': false });
      } else {
        setTimeout(() => {
          const activeClass = document.querySelectorAll('.active');
          activeClass.forEach(card => {
            card.innerText = '';
            card.classList.remove('active');
          });
          this.setState({ 'first': null, 'second': null, 'isDisable': false });
        }, 500);
      }
    }
    if (isDisable) {
      this.setState({ 'isDisable': false });
    }
    if (matched.length === 12) {
      if (myBestScore === 0 || myBestScore > clicked) {
        this.setState({ 'myBestScore': clicked });
      }
      if (clicked < getScore || getScore === 0) {
        this.props.dispatch(fetchCreateScore(clicked));
        this.props.dispatch(fetchGetScore());
      }
      this.setState({ 'matched': [], 'isSuccess': true });
    }
  }

  handleNewGame = () => {
    this.handleAssignValue();
    const card = document.querySelectorAll('.front');
    card.forEach(element => {
      element.classList.remove('matched');
      element.classList.remove('active');
      element.innerText = '';
    });
    this.setState({ 'clicked': 0, 'matched': [], 'first': null, 'second': null, 'isSuccess': false });
  };

  handleAssignValue = () => {
    const cardValue = [];
    for (let i = 1; cardValue.length < 12; i++) {
      const value = Math.floor(Math.random() * 7);
      const filter = cardValue.filter(data => data === value);
      if (filter && filter.length >= 2) {
        if (cardValue.length === 12) {
          return this.setState({ 'valueOfCard': cardValue });
        }
      } else if (value > 0) {
        cardValue.push(value);
        if (cardValue.length === 12) {
          return this.setState({ 'valueOfCard': cardValue });
        }
      }
    }
  }

  handleFlipCard = e => {
    const { clicked, first } = this.state;
    if (!e.target.innerText) {
      document.getElementById(e.target.id).classList.add('active');
      e.target.innerText = decrypt(e.target.dataset.value);
      if (first && first !== e.target.dataset.value) {
        this.setState({ 'second': decrypt(e.target.dataset.value), 'isDisable': true });
      } else {
        this.setState({ 'first': decrypt(e.target.dataset.value), 'isDisable': true });
      }
    } else {
      document.getElementById(e.target.id).classList.remove('active');
      e.target.innerText = '';
      this.setState({ 'first': null, 'second': null, 'isDisable': true });
    }
    this.setState({ 'clicked': clicked + 1 });
  }

  render() {
    const { getScore } = this.props;
    const { valueOfCard, clicked, myBestScore, isDisable, isSuccess } = this.state;
    return (
      <div className="Game">
        <Topbar handleClicked={clicked} handleMyBestScore={myBestScore} handleNewGame={this.handleNewGame} handleTopScore={getScore > 0 ? getScore  : 0} />
        {
          valueOfCard && valueOfCard.length > 0 ?
            <>
              <div className="game-card-section">
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[0])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[1])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[2])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[3])} />
              </div>
              <div className="game-card-section">
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[4])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[5])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[6])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[7])} />
              </div>
              <div className="game-card-section">
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[8])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[9])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[10])} />
                <Card handleFlipCard={this.handleFlipCard} handleIsDisable={isDisable} handleValue={encrypt(valueOfCard[11])} />
              </div>
            </>
            : null
        }
        {
          isSuccess ?
            <Modal handleDescription={`your score is: ${clicked}`} handleTitle="FINISHED" handleNewGame={this.handleNewGame} />
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = ({ getScore }) => ({
  'getScore': getScore.data
});

export default withRouter(connect(mapStateToProps)(Game));
