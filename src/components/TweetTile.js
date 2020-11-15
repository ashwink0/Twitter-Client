import React from 'react';
import './Tile.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ForumIcon from '@material-ui/icons/Forum';
import CachedIcon from '@material-ui/icons/Cached';
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

const MonkeyLearn = require('monkeylearn')
const ml = new MonkeyLearn(process.env.REACT_APP_ML)
let sentiment_id = 'cl_pi3C7JiL'
let topic_id = 'cl_o46qggZq'

var natural = require('natural');
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
var tokenizer = new natural.TreebankWordTokenizer();

// getSentiment expects an array of strings

class TweetTile extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			sentiment: null,
			topic: null,
			confText: 'Confidence: '
		}
	}

	componentDidMount() {
		let data = [
			this.props.data.text
		]
		ml.classifiers.classify(sentiment_id, data).then(res => {
			this.setState({sentiment: res.body})
		}).catch(error =>{


			var conf=analyzer.getSentiment(tokenizer.tokenize(this.props.data.text))
			var tag;
			if(Math.abs(conf)<0.1){
				tag='Neutral'
			}
			else if(conf>0){
				tag='Positive'
			}
			else{
				tag='Negative'
			}

			conf=Math.abs(conf)*200
			conf=Math.round((conf + Number.EPSILON) * 100) / 100
			this.setState({sentiment: [{classifications: [{
						tag_name: tag,
						confidence:conf
					}]}]})

			this.setState({
				confText: 'Scale: '
			})
		})

		ml.classifiers.classify(topic_id, data).then(res => {
		}).catch(error => {
		})

	}


	render() {
		return (
			<div className={'TweetTileContainer'}>
				<div className={'TweetTile'}>
					<div style={{padding: '20px'}}>
						<h2>{this.props.data.text}</h2>
					</div>
					<div className={'PublicMetrics'}>
						<div>
							<ThumbUpAltIcon/>
							<h2>{this.props.data.public_metrics.like_count}</h2>
						</div>

						<div>
							<FormatQuoteIcon/>
							<h2>{this.props.data.public_metrics.quote_count}</h2>
						</div>

						<div>
							<ForumIcon/>
							<h2>{this.props.data.public_metrics.reply_count}</h2>
						</div>
						<div>
							<CachedIcon/>
							<h2>{this.props.data.public_metrics.retweet_count}</h2>
						</div>

					</div>
					<div>
						{this.state.sentiment ?
							<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
								<h3 style={{margin: '8px'}}>Sentiment: {this.state.sentiment[0].classifications[0].tag_name}</h3>
								<h3 style={{margin: '8px'}}>{this.state.confText}{this.state.sentiment[0].classifications[0].confidence}%</h3>
							</div> :
							<CircularProgress/>}
					</div>
					<Divider/>
					<div>
						{this.state.topic ?
							<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
								<h3 style={{margin: '8px'}}>Sentiment: {this.state.topic[0].classifications[0].tag_name}</h3>
								<h3 style={{margin: '8px'}}>Confidence: {this.state.topic[0].classifications[0].confidence}%</h3>
							</div> :
							<div/>}
					</div>


				</div>
			</div>
		);
	}
}

export default TweetTile;
