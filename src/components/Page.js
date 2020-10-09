import React from 'react';
import TweetTile from "./TweetTile";
import AccountTile from "./AccountTile";
import Searchbar from "./Searchbar";
import CircularProgress from '@material-ui/core/CircularProgress';


require('dotenv').config()

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tweetData: {},
			userData: {},
			//0=loading
			//1=success
			//2= failure
			tweetProcess: 0,
			userProcess: 0,

			tweetRes: 100,
			userRes: 100,
		}
	}


	componentDidMount() {
		const username = "jack"
		this.fetchData(username)

	}

	async fetchData(username){

		const tweetsEndpointUrl = process.env.REACT_APP_API_LINK + "tweets/" + username + "/";
		const userEndpointUrl = process.env.REACT_APP_API_LINK + "user/" + username + "/";

		try {
			var res = await fetch(tweetsEndpointUrl);
			const json = await res.json();
			this.setState({
					tweetData: json,
					tweetProcess: 1
				})
			console.log('json', json)
		} 
		catch (err) {
			console.error('err', err);
		}

		try {
			var res = await fetch(userEndpointUrl);
			const json = await res.json();
			this.setState({
					userData: json,
					userProcess: 1
				})
			console.log('json', json)
		} 
		catch (err) {
			console.error('err', err);
		}
	}

	render() {
		let tweets;
		let account;

		if (this.state.userProcess === 1 && this.state.tweetProcess === 1) {
			if (this.state.tweetData.meta && this.state.tweetData.meta.result_count !== 0) {
				tweets = this.state.tweetData.data.map(item =>
					<TweetTile data={item}/>
				)
			} else {
				tweets = <h1>No Tweets</h1>
			}

			if (this.state.userData.errors) {
				account = <h1>User Not Found</h1>
				tweets = <h1></h1>
			} else {
				account = <AccountTile data={this.state.userData}/>

			}

		} else {
			tweets = <CircularProgress />
		}

		return (
			<div className={'App-header'}>
				{account}
				{tweets}
			</div>
		);
	}

}

export default Page;
