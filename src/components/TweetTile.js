import React from 'react';
import './Tile.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ForumIcon from '@material-ui/icons/Forum';
import CachedIcon from '@material-ui/icons/Cached';
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

class TweetTile extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			sentiment: null,
			topic: null,
			confText: 'Confidence: '
		}
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
				</div>
			</div>
		);
	}
}

export default TweetTile;
