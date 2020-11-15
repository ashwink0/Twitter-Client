import React from 'react';
import Searchbar from "../components/Searchbar";
import { CircularProgress } from '@material-ui/core';
import TrendingTile from '../components/TrendingTile'

import SelectSearch from 'react-select-search';
import Button from "@material-ui/core/Button";
import SkeletonTrendTile from "../components/Skeleton/SkeletonTrendTile";
import './selectSearch.css'


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

			options: [
			],
		}
	}

	retRes(response) {
		this.setState({
			response: response.status
		})
		return response.json()
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log("Latitude is :", position.coords.latitude);
			console.log("Longitude is :", position.coords.longitude);
		});

		fetch(process.env.REACT_APP_API + 'trendingAvailable/')
			.then(response => this.retRes(response))
			.then(data => {
				this.setState({
					trendsLocation: data,
					readyAvailable: true,
				})
				this.setState({
					availableIndex: this.state.trendsLocation[0].woeid,

				})
				this.fetchTrends(this.state.availableIndex);

				var options=[]

				for(var i=0; i<this.state.trendsLocation.length; i++){
					options.push({name: this.state.trendsLocation[i].name, value: i})
				}

				this.setState({
					options: options
				})
			})

	}

	fetchTrends(woeid) {
		this.setState({
			readyTrends: false,
		});
		fetch(process.env.REACT_APP_API + 'trends/' + woeid)
			.then(response => response.json())
			.then(data => {
				this.setState({
					trends: data,
					readyTrends: true,
				})

			})
	}

	onSelectChange = value => {
		this.setState({locationIndex: value });
		this.fetchTrends(this.state.trendsLocation[this.state.locationIndex].woeid)
	};

	render() {
		var disp;
		var trends;

		if (this.state.readyAvailable) {
			disp = <h1>Trends for {this.state.trendsLocation[this.state.locationIndex].name}</h1>
		}
		else {
			disp = <CircularProgress style={{ padding: '10px' }} />
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
			trends = <div style={{width: '45%', height: '150px'}}>
				<SkeletonTrendTile/>
				<SkeletonTrendTile/>
				<SkeletonTrendTile/>
				<SkeletonTrendTile/>
				<SkeletonTrendTile/>
				<SkeletonTrendTile/>
				<SkeletonTrendTile/>
			</div>
		}


		return (
			<div className={'App-header'}>
				<h1>Twitter Client</h1>
				<Searchbar/>
				<Button variant="contained" href={'/archive'}>
					Trend Archive
				</Button>
				<h2>Trending:</h2>

				<div>
					<SelectSearch search options={this.state.options} onChange={this.onSelectChange}  name="language" placeholder="Choose a Location" />
				</div>
				{disp}
				{trends}
			</div>
		);
	}
}


export default HomeScreen
