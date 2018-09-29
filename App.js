import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput} from 'react-native';
import Swipeout from react-native-swipeout;


export default class Decisive extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			options : [{key: 'hootan'}, {key: 'dorsa'}, {key: 'maryam'}, {key: 'reza'}],
			first : true,
		};
	}

	render() {
		return (
			<View style={{flex: 1, marginTop: 22}}>
				<Text>Hello! Provide some decision options...</Text>
				{/* <View style={styles.container}>
					<TextInput
						style={{height: 40}}
						placeholder={"Option #" + (this.state.options.length + 1)}
						onSubmitEditing={
							(newOption) => {
								const newData = {key : newOption};
								let newOptions = this.state.options;
								newOptions.push(newData);
								const newState = {options: newOptions};
								this.setState(newState, () => {
								});
							}
						}
					/>
				</View> */}
				<OptionsList options={this.state.options}/>
			</View>
		);
	}
}


class Option extends React.Component {
	render() {
		return (
			<View style={{flex: 1, backgroundColor: this.props.index % 2 === 0 ? '#00bfd6' : '#e63e2f'}}>
				<Text style={styles.option}>{this.props.item.key}</Text>
			</View>
		);
	}
}


class OptionsList extends React.Component {

	constructor(props) {
		super(props);
		// this.state = {
		// 	options : [{key: 'hootan'}, {key: 'dorsa'}, {key: 'maryam'}, {key: 'reza'}],
		// 	first : true,
		// };
	}

	render() {
		return (
			<View style={{flex: 1, marginTop: 22}}>
				<FlatList
					data={this.props.options}
					renderItem={
						({item, index}) => {
							return (
								<Option item={item} index={index}></Option>
							);
						}
					}
					onPressItem={({item}) => {item.key[0]}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	backgroundColor: '#00bfd6',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },
	option: {
		color: 'white',
		padding: 10,
		fontSize: 16,
	}
});
