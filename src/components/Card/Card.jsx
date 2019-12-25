import React, { Component } from 'react';

import './Card.scss';

export default class Card extends Component {
  render() {
    const { handleFlipCard, handleValue, handleIsDisable } = this.props;
    return (
      <div className={`Cards ${handleIsDisable ? 'disable' : ''}`}>
        <div className="card">
          <div className="front" id={handleValue} data-value={handleValue} onClick={handleFlipCard}></div>
        </div>
      </div>
    );
  }
}
