import React, { Fragment } from 'react';
import ChatWindowComponent from './ChatWindowComponent';

import { ChatContextProvider } from './ChatWindowContext';

const App = () => {
	return (
		<Fragment>
			<ChatContextProvider>
				<ChatWindowComponent />
			</ChatContextProvider>
		</Fragment>
	);
};

export default App;
