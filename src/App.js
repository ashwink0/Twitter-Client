import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './views/Main';
import HomeScreen from "./views/HomeScreen";

function App() {
	return (
		<main>
			<Switch>
				<Route path="/" component={HomeScreen} exact />
				<Route path="/:username/" component={Main} exact />
			</Switch>
		</main>
	)

}
export default App;
