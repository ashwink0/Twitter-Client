import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './views/Main';

function App() {
	return (
		<main>
			<Switch>
				<Route path="/" component={Main} exact />
				<Route path="/:username/" component={Main} exact />
			</Switch>
		</main>
	)

}
export default App;
