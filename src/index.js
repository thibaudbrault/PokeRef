import React from 'react';
import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import { UserContextProvider } from './helpers/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<UserContextProvider>
			<App />
		</UserContextProvider>
	</React.StrictMode>
);

serviceWorkerRegistration.register();