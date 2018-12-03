import React from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, View} from 'react-native';
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
									this.props.parentOptionsList.deleteOption(deletingIndex);
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
			options : [],
		};
	}

	addOption = (newName) => {
		const options = this.state.options.concat({name: newName});
		this.setState({options : options});
	}

	deleteOption = (deletingIndex) => {
		const optionsA = this.state.options.slice(0, deletingIndex);
		const optionsB = this.state.options.slice(deletingIndex + 1, this.state.options.length);
		const options = optionsA.concat(optionsB);
		this.setState({options : options});
	}

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
				{this.state.options.map( (option) => {
					<Text>{'_DEBUG_ ' + option.name}</Text>
				})}
				<Text>{this.state.options && '_DEBUG_ ' + this.state.options.toString()}</Text>
				<Text>{'_DEBUG_ ' + this.state.version}</Text>
				<Button
					onPress={ () => {
						Alert.alert(
							'Add Option',
							'Are you sure you want to add this option?',
							[
								{text : 'Cancel', onPress : () => {}, style: 'cancel'},
								{text : 'Add', onPress : () => {
									// update and refresh list
									this.addOption('new option');
								}}
							],
							{ cancelable : true }
						);
					}}
					title="Add Option"
					color="#3fae49"
					accessibilityLabel="Add a new option to the list"
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
		fontSize: 20,
	}
});
