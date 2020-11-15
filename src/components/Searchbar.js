import React from 'react'
import './Tile.css'
import {Redirect, Link} from 'react-router-dom';


class Searchbar extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			name:"",
			redir: <div></div>
		}
		this.handleChange=this.handleChange.bind(this)

	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			this.setState({
				redir: <Redirect push to={"/user/" + this.state.name}/>
			})
		}
	}

	render(){

		return(
			<div className={'SearchbarDiv'}>
				<input
					type={'text'}
					name={'name'}
					placeholder={'Enter a username'}
					className={'Searchbar'}
					onChange={this.handleChange}
					value={this.state.name}
					onKeyPress={this.handleKeyPress}
				/>
				<Link className={'SubmitTile'} to={"/user/" + this.state.name}>Search</Link>
				{this.state.redir}
			</div>
		);
	}
}

export default Searchbar;
