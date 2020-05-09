# autocomplete
Autocomplete widget using React and Webpack



This library provides an autocomplete widget for in your app. 

Library can be installed by adding this line to package.json dependancies:
```js
"autocomplete": "darincardin/autocomplete#1.1.4",
```

The widget can then be included in the project like this:

```jsx
import Autocomplete from 'autocomplete'; 

var state = {autocomplete: "" }
	
var change = (obj, next)=>{
	this.setState(obj, next);
}	
	
var suggestions = value=>{
	return fetch(`http://example.php?value=${value}`, {method:"GET"});
}
		
<Autocomplete name="autocomplete" value={state.autocomplete} setState={change} getSuggestions={suggestions} />
```
