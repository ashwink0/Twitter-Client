import React from 'react';
import Searchbar from "../components/Searchbar";

class HomeScreen extends React.Component {
	render() {
		return (
			<div className={'App-header'}>
				<h1>Twitter Client</h1>
				<h3>Enter a Twitter username:</h3>
				<Searchbar/>
			</div>
		);
	}
}


export default HomeScreen
