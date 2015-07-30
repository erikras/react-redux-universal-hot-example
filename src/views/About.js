import React, {Component} from 'react';
import MiniInfoBar from '../components/MiniInfoBar';

export default class About extends Component {
  state = {
    kitten: false
  }

  handleToggleKitten() {
    this.setState({kitten: !this.state.kitten});
  }

  render() {
    const {kitten} = this.state;
    return (
      <div>
        <div className="container">
          <h1>About Us</h1>

          <p>This project was orginally created by Erik Rasmussen
            (<a href="https://twitter.com/erikras" target="_blank">@erikras</a>), but has since seen many contributions
            from the open source community. Thank you to <a
              href="https://github.com/erikras/react-redux-universal-hot-example/graphs/contributors"
              target="_blank">all the contributors</a>.
          </p>

          <h3>Mini Bar <span style={{color: '#aaa'}}>(not that kind)</span></h3>

          <p>Hey! You found the mini info bar! The following component is display-only. Note that it shows the same
            time as the info bar.</p>

          <MiniInfoBar/>

          <h3>Images</h3>

          <p>
            Psst! Would you like to see a kitten?

            <button className={'btn btn-' + (kitten ? 'danger' : 'success')}
                    style={{marginLeft: 50}}
                    onClick={::this.handleToggleKitten}>
              {kitten ? 'No! Take it away!' : 'Yes! Please!'}</button>
          </p>

          {kitten && <div><img src={require('./kitten.jpg')}/></div>}
        </div>
      </div>
    );
  }
}
