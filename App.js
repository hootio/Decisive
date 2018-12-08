import React from 'react';
import {Text, View} from 'react-native';

import OptionsList from './OptionsList';

export default class Decisive extends React.Component {
	render() {
		return (
			<View style={{flex: 1, marginTop: 32}}>
				<Text style={appStyle}>{'Hello there!'}</Text>
				<Text style={appStyle}>{'🖖🏼'}</Text>
				{/* <Text style={appStyle}>{'Create some decision options...'}</Text> */}
				<OptionsList/>
			</View>
		);
	}
}

const appStyle = {
	textAlign: 'center',
	padding: 4,
	fontSize: 32,
}