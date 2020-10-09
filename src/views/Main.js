import React from 'react';

import '../App.css';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import TweetTile from "../components/TweetTile";
import AccountTile from "../components/AccountTile";

require('dotenv').config()

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			tweets: {},
			user: {},
			response: 0,
			ready: false,
			readyUser: false
		}
	}

	componentDidMount() {
		setTimeout(() => {
			fetch(process.env.REACT_APP_API + 'tweets/jack/')
				.then(response => this.retRes(response))
				.then(data => {
					console.log(data);
					this.setState({
						tweets: data,
						ready: true
					})

				})
		}, 1000)

		setTimeout(() => {
			fetch(process.env.REACT_APP_API + 'user/jack/')
				.then(response => this.retRes(response))
				.then(data => {
					console.log(data);
					this.setState({
						user: data,
						readyUser: true
					})

				})
		}, 1000)
	}

	retRes(response) {
		console.log(response.status)
		this.setState({
			response: response.status
		})
		return response.json()
	}

	render() {
		let disp;

		let userTile;

		if (this.state.response === 0) {
			disp = <CircularProgress/>
		}
		else if (this.state.response !== 200) {
			disp = <h1>Error Code: {this.state.response}</h1>
		}
		else if (this.state.ready && this.state.readyUser) {

			if (this.state.tweets.meta.result_count === 0) {
				disp = <h1>No Tweets</h1>
			}
			else {
				disp = this.state.tweets.data.map(item =>
					<TweetTile data={item}/>
				)
			}

			if(this.state.user.errors){{
				userTile=<h1>User not Found</h1>
			}}
			else {
				userTile = <AccountTile data={this.state.user}/>
			}
		}
		return (
			<div className={'App-header'}>
				{userTile}
				{disp}
			</div>
		)
	}
}

export default Main;
