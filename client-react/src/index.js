import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';

ReactDOM.render(
	<Fragment>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Fragment>,
	document.getElementById('root')
);
