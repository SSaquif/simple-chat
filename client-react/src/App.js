import React, { Fragment } from 'react';
import './App.css';

function App() {
	return (
		<Fragment>
			<div className="log-events-wrapper">
				<h3>Chat Away</h3>
				<ul id="log-events"></ul>
			</div>
			<div className="message-box-wrapper">
				<form>
					<input type="text" id="chat-box" />
					<button type="submit">Send</button>
				</form>
			</div>
		</Fragment>
	);
}

export default App;
