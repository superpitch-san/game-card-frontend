import React, { Component } from 'react';

import './Topbar.scss';

export default class Topbar extends Component {
  render() {
    const { handleClicked, handleMyBestScore, handleNewGame, handleTopScore } = this.props;
    return (
      <div className="Topbar">
        <div className="topbar-title">Card match Game</div>
        <div className="topbar-score-box">
          <div className="topbar-click-box">
            <div className="topbar-click-title">click:</div>
            <div className="topbar-click-score">{handleClicked}</div>
          </div>
          <div className="topbar-click-box">
            <div className="topbar-click-title">my best:</div> 
            <div className="topbar-click-score">{handleMyBestScore}</div>
          </div>
          <div className="topbar-click-box">
            <div className="topbar-click-title">top score:</div>
            <div className="topbar-click-score">{handleTopScore ? handleTopScore : 0}</div>
          </div>
        </div>
        <div className="topbar-button-box">
          <button className="topbar-button" onClick={handleNewGame}>New game</button>
        </div>
      </div>
    );
  }
}
