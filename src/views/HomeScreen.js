import React from 'react';
import Searchbar from "../components/Searchbar";
import { CircularProgress } from '@material-ui/core';
import TrendingTile from '../components/TrendingTile'

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trendsLocation: {},
			readyAvailable: false,
			response: 0,

			trends: {},
			readyTrends: false,

			availableIndex: 0,
			locationIndex: 0,
		}
	}
	retRes(response) {
		this.setState({
			response: response.status
		})
		return response.json()
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API + 'trendingAvailable/')
			.then(response => this.retRes(response))
			.then(data => {
				console.log(data);
				this.setState({
					trendsLocation: data,
					readyAvailable: true,
				})
				this.setState({
					availableIndex: this.state.trendsLocation[0].woeid,

				})
				this.fetchTrends(this.state.availableIndex);
			})
	}

	fetchTrends(woeid) {
		this.setState({
			readyTrends: false,
		});
		fetch(process.env.REACT_APP_API + 'trends/' + woeid)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({
					trends: data,
					readyTrends: true,
				})

			})
	}

	render() {
		var disp;
		var trends;

		if (this.state.readyAvailable) {
			//disp=this.state.trendsLocation.map(item => <h1>{item.woeid}</h1>)
			disp = <h1>Trends for {this.state.trendsLocation[this.state.locationIndex].name}</h1>
		}
		else {
			disp = <CircularProgress style={{padding: '10px'}}/>
		}


		if (this.state.readyTrends) {
			if (this.state.trends.errors) {
				trends = <h1>Rate Limit Exceeded</h1>
			}
			else {
				trends = this.state.trends[0].trends.map(item => <TrendingTile data={item} />)
			}
		}
		else {
			trends = <CircularProgress style={{padding: '10px'}}/>
		}


		return (
			<div className={'App-header'}>
				<h1>Twitter Client</h1>
				<Searchbar route={'home'} />
				<h2>Trending:</h2>
				<button onClick={() => {
					this.setState({
						locationIndex: this.state.locationIndex + 1
					})
					this.fetchTrends(this.state.trendsLocation[this.state.locationIndex].woeid)

				}}>Next</button>
				{disp}
				{trends}
			</div>
		);
	}
}


export default HomeScreen
