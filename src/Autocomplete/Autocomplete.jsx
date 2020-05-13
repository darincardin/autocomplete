import React from "react";
import PropTypes from 'prop-types';

import './style.css';

class Autocomplete extends React.Component{

	state = { suggestions: [], loading:false}
	
	onChange =  (e) =>{
		var {name, value} = e.target;		
		
		this.props.setState({ [name]: value}, ()=>{
			if(!value) this.setState({ suggestions:[] })
			else this.handleRequest(value);	
		})
	}
	
	onSelect = value =>{
		this.props.setState({[this.props.name]:value, suggestions: []});	
		this.setState({ suggestions: [] });	
	}
	
	handleRequest = (value) =>{
		this.setState({ loading:true });
		
		if(this.cancel) clearTimeout(this.cancel);
		
		this.cancel = setTimeout( ()=>{
			this.props.getSuggestions(value).then(res => res.json())
			.then(res =>{
				this.setState({ suggestions: res.data, loading:false })
			})
			.catch( err =>{
				this.setState({ suggestions: ["An error occurred."], loading:false })
			})	

		}, 300 );
	}
	
	close= ()=>{
		this.setState({ suggestions: [] });	
	}
	
	render = () =>{	
		return (
			<div className="autocomplete" >
				<div className="input" >
					<input name={this.props.name} autoComplete="off" placeholder="Search..." className='form-control' type="text" value={this.props.value} onChange={this.onChange}/>
					<i className="glyphicon glyphicon-search"></i>  
					

				</div>
				
				{ this.state.suggestions.length>0 &&
					<div>
						<div className="overlay" onClick={this.close}></div>
						<div className="suggestions">
							{ this.state.loading && <i className="glyphicon glyphicon-cog spin"></i> }
							<table>
								<tbody>
									{ this.state.suggestions.map( (r, i) =>  
										<tr key={i} onClick={ ()=>this.onSelect(r) }  ><td>{r}</td></tr>
									)}
								</tbody>
							</table>
						</div>		
					</div>					
				}
			</div>
		)
	}   
}


Autocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
	setState: PropTypes.func.isRequired,
	getSuggestions: PropTypes.func.isRequired
};

export default Autocomplete;
	