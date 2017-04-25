'use strict';
import Child from 'components';
import './index.scss';


import ReactDom from 'react-dom';
import React, { PropTypes, Component } from 'react';
class App extends Component{
	render(){
		return (<div>hello world <Child/></div>)
	}
}
ReactDom.render(
	<App/>
  ,
  document.getElementById('container')
);
