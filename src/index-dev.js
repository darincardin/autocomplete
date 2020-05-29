import React from "react";
import ReactDOM from "react-dom";

import Autocomplete from "./Autocomplete/Autocomplete.jsx";


import 'bootstrap/dist/css/bootstrap.css';

class Orders {	
	fName = "";
	lName = "";
	
	
	constructor(fName, lName){
		this.fName = fName;
		this.lName = lName;
	}
	
	get display() {return  this.lName + ", " +this.fName};
}




var getInvoices = value =>{
	return fetch(`http://api.darincardin.com/php/invoices/controllers/search.php?value=${value}`, {method:"GET"})
	.then(res => res.json())
	.then( res =>{
		res.data = res.data.map(i =>new Invoices(i, "Unknown"));
		return res
	})

}


var getOrders = value =>{
	return fetch(`http://api.darincardin.com/php/orders/controllers/search.php?value=${value}`, {method:"GET"})
	.then(res => res.json())
	.then( res =>{
		res.data = res.data.map(i =>new Orders(i.fName, i.lName));
		return res
	})

}


class Main extends React.Component {
	
	state = {autocomplete: "" }
	
	change = (obj, next)=>{
		this.setState(obj, next);
	}	
	
	onSubmit = ()=>{
		alert(`Value: ${this.state.autocomplete}`)
	}
	
	suggestions = value => {
	   return getOrders(value)
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


/*




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


*/