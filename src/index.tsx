import React from 'react';
import ReactDOM from 'react-dom';

import App from 'containers/App';
import * as serviceWorker from './serviceWorker';

import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

declare global {
	namespace Talkien {
		type Event<T = string> = {
			dataset?: { [name: string]: string };
			id?: string;
			// Use by radio button to invalidate others inputs with same id
			invalidateOthers?: boolean;
			name: string;
			value: T;
		};
	}
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
