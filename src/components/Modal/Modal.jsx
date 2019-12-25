import React, { Component } from 'react';
import { history } from '../../helpers';

import './Modal.scss';

export default class Modal extends Component {
  render() {
    const { handleTitle, handleDescription, handleNewGame } = this.props;
    return (
      <div className="Modal">
        <div className="modal-sub-box">
          <div className="modal-title">{handleTitle ? handleTitle : 'Finished'}</div>
          <div className="modal-description">{handleDescription ? handleDescription : 'your score is: 12'}</div>
          <div className="modal-button-box">
            <button className="game-button" onClick={handleNewGame}>new game</button>
            <button className="game-button" onClick={() => history.push('/home')}>back to homepage</button>
          </div>
        </div>
      </div>
    );
  }
}
