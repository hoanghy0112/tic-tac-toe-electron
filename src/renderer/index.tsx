import { render } from 'react-dom';
import React from 'react';
import App from './components/App';

import { Provider } from 'react-redux';
import store from './app/store';

render(
	<React.StrictMode>
		<Provider store={store}>
			<App></App>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
