import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { history } from '../../helpers';

import './Home.scss';

import commonConstant from '../../common/commonConstant';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="home-title">Welcome to Card Game</div>
        <div>
          <img className="home-poker-img" src={commonConstant.pokerIMG} alt="poker" />
        </div>
        <div className="home-button-box">
          <button className="home-button" onClick={() => history.push('/game/cardmatch')}>card match game</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);