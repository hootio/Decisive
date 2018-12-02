import React from 'react';
import { FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import SwipeOut from 'react-native-swipeout';


export default class Decisive extends React.Component {
	render() {
		return (
			<View style={{flex: 1, marginTop: 32}}>
				<Text style={{fontSize: 27}}>{'Hello there!\t\t\t\t\t\t\u{1F604}\u{2764}\u{1F596}\nCreate some decision options...'}</Text>
				<OptionsList/>
			</View>
		);
	}
}


class OptionRow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeOptionIndex : null
		};
	}

	render() {
		const swipeSettings = {
			autoClose : true,
			onClose : (secId, rowId, direction) => {
				if (this.state.activeOptionIndex != null) {
					this.setState({activeOptionIndex : null});
				}
			},
			onOpen : (secId, rowId, direction) => {
				this.setState({activeOptionIndex : this.props.index});
			},
			right : [
				{
					onPress : () => {
						const deletingIndex = this.state.activeOptionIndex;
						Alert.alert(
							'Alert!',
							'Are you sure you want to delete this option?',
							[
								{text : 'No', onPress : () => {}, style: 'cancel'},
								{text : 'Yes', onPress : () => {
									// update and refresh list
									this.props.parentOptionsList.deleteOption(deletingIndex);
									// this.props.parentOptionsList.refresh();
								}}
							],
							{ cancelable : true }
						);
					},
					text : 'Delete',
					type : 'delete'
				}
			],
			rowId : this.props.index,
			sectionId : 1
		};

		return (
			<SwipeOut {...swipeSettings}>
				<View style={{flex: 1, backgroundColor: this.props.index % 2 === 0 ? '#00bfd6' : '#e63e2f'}}>
					<Text style={styles.option}>{this.props.item.name}</Text>
				</View>
			</SwipeOut>
		);
	}
}


class OptionsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// refreshBool	: true,
			options		: [{name: 'hootan'}, {name: 'dorsa'}, {name: 'maryam'}, {name: 'reza'}],
		};
	}

	addOption = (name) => {
		const options = this.state.options;
		options.push({name: name});
		const newState = {options : options};
		this.setState(newState);
	}

	deleteOption = (deletingIndex) => {
		let options = this.state.options;
		if (options.length <= 1) {
			options = [];
		} else {
			options.splice(deletingIndex, 1);
		}
		const newState = {options : options};
		this.setState(newState);
	}

	// refresh = () => {
	// 	const newState = this.state;
	// 	newState.refreshBool = !newState.refreshBool;
	// 	this.setState(newState);
	// }

	render() {
		return (
			<View style={{flex: 1, marginTop: 16}}>
				<FlatList
					data={this.state.options}
					renderItem={
						({item, index}) => {
							return (
								<OptionRow item={item} index={index} parentOptionsList={this}></OptionRow>
							);
						}
					}
					keyExtractor={
						(item, index) => index.toString()
					}
					// onPressItem={({item}) => {item.name[0]}}
				/>
				{/* <Text>{'_DEBUG_ ' + this.state.refreshBool.toString()}</Text> */}
				<Text>{'_DEBUG_ ' + this.state.options.toString()}</Text>
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
		fontSize: 20,
	}
});
