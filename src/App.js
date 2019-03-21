import React  from 'react';
import Routes from './components/Routes';

class App extends React.Component {
  render() {
    window.onbeforeunload = function() {
      localStorage.clear();
   }
    return (    
        <Routes/>
    );
  }
}

export default App;
