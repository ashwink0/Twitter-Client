import React from 'react';
import {CircularProgress} from '@material-ui/core';

import Information from '../components/Information'
import {isMobile} from "react-device-detect";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

class TrendArchive extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			trendData:{},
			response:0,
			ready:false,
		}
	}
	retRes(response) {
		console.log(response.status);
		this.setState({
			response: response.status
		})
		return response.json()
	}

	fabGoBack() {
		this.props.history.goBack()
	}

	componentDidMount(){
		document.title='Trend Archive'


		fetch(process.env.REACT_APP_API + 'trendArchive/')
			.then(response => this.retRes(response))
			.then(data => {
				console.log(data);
				this.setState({
					trendData: data,
					ready: true,

					anchorOpen:false,
				})

			})
	}
	render(){
		let disp=<div/>;
		if(this.state.ready){
			console.log(this.state.trendData)
			console.log(this.state.trendData.data)
			disp= this.state.trendData.data.map(item =>
				<div>
					<h1>{item.locations[0].name}</h1>

					{item.trends.map(trend =>
						<div>
							<h6>{trend.name}</h6>
						</div>
					)}
				</div>
			)
		}
		else{
			disp=<CircularProgress/>
		}

		return(
			<div className={'App-header'}>
				{isMobile ? <Fab
					size={'small'}
					onClick={() => this.fabGoBack()}
					color={'black'}
					style={{position: 'absolute', left: 10, top: 70}}>
					<ArrowBackIosIcon/>
				</Fab> : <div/>}

				<Information/>
				{disp}
			</div>
		);
	}
}

export default TrendArchive;
