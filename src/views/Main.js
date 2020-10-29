import React from 'react';
import '../App.css';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import TweetTile from "../components/TweetTile";
import AccountTile from "../components/AccountTile";
import Fab from '@material-ui/core/Fab';
import HomeIcon from '@material-ui/icons/Home';
import HomeScreen from "./HomeScreen";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {isMobile} from 'react-device-detect';
import {Redirect, Link} from 'react-router-dom';
import Searchbar from "../components/Searchbar";

require('dotenv').config()

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			tweets: {},
			user: {},
			response: 0,
			ready: false,
			readyUser: false,

			passedUser: false
		}
	}

	componentDidMount() {
		let username;
		if (this.props.match.params.username) {
			username = this.props.match.params.username;
			this.setState({
				passedUser: true
			})
		} else {
			//temp
			username = 'jack';
		}

		setTimeout(() => {
			fetch(process.env.REACT_APP_API + 'tweets/' + username + "/")
				.then(response => this.retRes(response))
				.then(data => {
					console.log(data);
					this.setState({
						tweets: data,
						ready: true
					})

				})
		}, 1)

		setTimeout(() => {
			fetch(process.env.REACT_APP_API + 'user/' + username + "/")
				.then(response => this.retRes(response))
				.then(data => {
					console.log(data);
					this.setState({
						user: data,
						readyUser: true
					})

				})
		}, 1)
	}

	retRes(response) {
		console.log(response.status)
		this.setState({
			response: response.status
		})
		return response.json()
	}

	fabGoBack() {
		this.props.history.goBack()
	}

	render() {
		let disp;

		let userTile;

		if (this.state.response === 0) {
			disp = <CircularProgress/>
		} else if (this.state.response !== 200) {
			disp = <h1>Error Code: {this.state.response}</h1>
		} else if (this.state.ready && this.state.readyUser) {

			if (this.state.tweets.meta.result_count === 0) {
				disp = <h1>No Tweets</h1>
			} else {
				disp = this.state.tweets.data.map(item =>
					<TweetTile data={item}/>
				)
			}

			if(this.state.user.errors){

					userTile = <h1>User not Found</h1>

			}
			else {
				userTile = <AccountTile data={this.state.user}/>
			}
		}
		return (
			<div className={'App-header'}>
				{isMobile ? <Fab
										onClick={() => this.fabGoBack()}
										color={'black'}
										style={{position: 'absolute', left: 70, top: 5}}>
										<ArrowBackIosIcon/>
									</Fab> : <div/>}
				<Fab href='/' color={'black'} style={{position: 'absolute', left: 5, top: 5}}><HomeIcon/></Fab>
				<Searchbar route={'main'}/>
				{userTile}
				{disp}
			</div>

		)
	}
}

export default Main;
