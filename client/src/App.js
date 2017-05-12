import React from 'react';
import Login from './components/page/Login';
import Loading from './components/atom/Loading';
import Error from './components/page/Error';
import Main from './components/page/Main';
import API from './Utilities/API.js';

const AUTH_WAITING = 'chill bruh!';
const AUTH_FALSE   = 'who are you?';
const AUTH_TRUE    = 'sup dawg';
const AUTH_ERROR   = 'well... shoot';

class App extends React.Component {

  constructor(){
    super();
    
    this.state = {
      authStatus: AUTH_WAITING
    };

    API.checkAuth().then((res) => {
      if(res.ok){
        this.setState({
          authStatus: AUTH_TRUE
        });
      } else {
        this.setState({
          authStatus: AUTH_FALSE
        });
      }
    }).catch((err) => this.setState({
        authStatus: AUTH_ERROR
      })
    );
  }

  render() {
    var stateToRender = this.getRenderFromState(this.state.authStatus);
    return (
      <div>
        {stateToRender}
      </div>
    );
  }

  getRenderFromState(state){
    if(state === AUTH_WAITING){
      return (<Loading width="100%"/>);
    }
    if(state === AUTH_FALSE) {
      return (<Login />);
    }
    if(state === AUTH_TRUE) {
      return (<Main />);
    }
    if(state === AUTH_ERROR) {
      return (<Error />);
    }
  }
}

export default App;
