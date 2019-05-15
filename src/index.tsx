import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

(window.console as any).safeError = (...params: any) => {
  const now = new Date()
  const time = now.toTimeString().split(' ')[0]
  console.log(`%c 🚧 (${time}) SAFE ERROR: ${params.join(' ')}`, 'color: #bada55');
} 

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
