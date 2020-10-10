import React from 'react'
import './Tile.css'
import {Redirect, Link} from 'react-router-dom';


class Searchbar extends React.Component{
	constructor() {
		super();
		this.state={
			name:"",
			redir: <div></div>
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleSubmit=this.handleSubmit.bind(this)

	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(){
		this.setState({
			redir: <Redirect to={"/"+this.state.name}/>
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

				<Link className={'SubmitTile'} to={"/" + this.state.name}>Search</Link>
				{this.state.redir}
			</div>
		);
	}
}

export default Searchbar;
