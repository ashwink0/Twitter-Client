import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Main from './views/Main';
import HomeScreen from "./views/HomeScreen";
import TrendArchive from './views/TrendArchive'
import RedirMain from "./components/RedirMain";

function App() {
	return (
			<Switch>
				<Route path="/" component={HomeScreen} exact />
				<Route path="/archive" component={TrendArchive} exact />
				<Route path="/user/:username" component={Main}/>
				<Route path="/user/" component={RedirMain}/>
			</Switch>
	)
}
export default App;
