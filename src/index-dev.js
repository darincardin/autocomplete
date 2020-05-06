import React from "react";
import ReactDOM from "react-dom";

import Autocomplete from "./Autocomplete/Autocomplete.jsx";



import 'bootstrap/dist/css/bootstrap.css';

class Main extends React.Component {
	
	state = {autocomplete: "" }
	
	change = (obj, next)=>{
		this.setState(obj, next);
	}	
	
	onSubmit = ()=>{
		alert(`Value: ${this.state.autocomplete}`)
	}
	
	suggestions = value=>{
	   return fetch(`http://api.darincardin.com/php/orders/search.php?value=${value}`, {method:"GET"});
	}
		
	render = ()=>{
		return (
		<div style={{width:'300px', margin:'20px auto'}}>
			<Autocomplete name="autocomplete" value={this.state.autocomplete} setState={this.change} getSuggestions={this.suggestions} />
			<br />
			<button className="btn btn-primary" onClick={this.onSubmit}> Submit </button>
		</div>	
		)
	}
}


ReactDOM.render( <Main />, document.getElementById('app'));

//	