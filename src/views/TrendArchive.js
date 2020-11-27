import React from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import Information from '../components/Information'
import {isMobile} from "react-device-detect";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyApp from "../components/Cal";

const YAML = require('json-to-pretty-yaml');
var fileDownload = require('react-file-download');


class TrendArchive extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			trendData: {},
			response: 0,
			ready: false,
			slug: null,
		}
		this.fetchTrendData = this.fetchTrendData.bind(this)
	}

	retRes(response) {
		this.setState({
			response: response.status
		})
		return response.json()
	}

	fabGoBack() {
		this.props.history.goBack()
	}

	componentDidMount() {
		document.title = 'Trend Archive'
		this.fetchTrendData(new Date())
	}

	fetchTrendData(date) {
		let slug = date.toLocaleDateString()

		this.setState({
			ready: false,
			response: 0,
			slug: slug
		})

		fetch(process.env.REACT_APP_API + 'trendarchive?date=' + slug)
			.then(response => this.retRes(response))
			.then(data => {
				this.setState({
					trendData: data,
					ready: true,
				})

			})
	}

	downloadJSON() {
		fileDownload(JSON.stringify(this.state.trendData), this.state.slug + '.json');
	}

	downloadYAML() {
		fileDownload(YAML.stringify(this.state.trendData), this.state.slug + '.yaml');
	}

	render() {
		let testDisp = <CircularProgress/>;
		if(this.state.ready){

			if(this.state.response === 200){
				testDisp = <div style={{width: '70%'}}>
					{this.state.trendData.data.map(item =>
						<Accordion TransitionProps={{unmountOnExit: true}} color={''}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon/>}
							>
								<Typography>{item.locations[0].name}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<ol>
									{item.trends.map(trend =>
										<li>{trend.name}</li>
									)}
								</ol>
							</AccordionDetails>
						</Accordion>
					)}
				</div>
			}
		}
		else{
			if(this.state.response === 409){
				testDisp = <h3>Error: Data for selected date not available</h3>
			}
			else{
				testDisp = <CircularProgress/>;
			}
		}
		return (
			<div className={'App-header'}>
				{isMobile ? <Fab
					size={'small'}
					onClick={() => this.fabGoBack()}
					color={'black'}
					style={{position: 'absolute', left: 10, top: 70}}>
					<ArrowBackIosIcon/>
				</Fab> : <div/>}
				<Information/>
				<MyApp dateChange={this.fetchTrendData}/>
				<div style={{margin: '10px'}}>

					{this.state.ready ? <div>
							<Button
								style={{margin: '5px'}}
								variant="contained" color="primary"
								onClick={() => this.downloadJSON()}
							>
								{'Download JSON'}
							</Button>

							<Button
								style={{margin: '5px'}}
								variant="contained" color="primary"
								onClick={() => this.downloadYAML()}
							>
								{'Download YAML'}
							</Button>

						</div> :
						<div/>}

				</div>
				{testDisp}
			</div>
		);
	}
}

export default TrendArchive;
