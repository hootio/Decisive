import React from 'react';
import {Text, View} from 'react-native';

import OptionsList from './OptionsList';

export default class Decisive extends React.Component {
	render() {
		return (
			<View style={{flex: 1, marginTop: 32}}>
				<Text style={{fontSize: 27}}>
					{'Hello there!\t\t\t\t\t\t\t😄❤️🖖🏼\nCreate some decision options...'}
				</Text>
				<OptionsList/>
			</View>
		);
	}
}