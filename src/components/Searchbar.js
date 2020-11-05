import React from 'react'
import './Tile.css'
import {Redirect, Link, Route} from 'react-router-dom';
import Main from "../views/Main";


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
				/>
				<Link className={'SubmitTile'} to={"/user/" + this.state.name}>Search</Link>
			</div>
		);
	}
}

export default Searchbar;
