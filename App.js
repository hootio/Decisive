import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput} from 'react-native';
import SwipeOut from 'react-native-swipeout';


export default class Decisive extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			options : [{key: 'hootan'}, {key: 'dorsa'}, {key: 'maryam'}, {key: 'reza'}]
		};
	}

	render() {
		return (
			<View style={{flex: 1, marginTop: 32}}>
				<Text style={{fontSize: 27}}>{'Hello there!\t\t\t\t\t\t\u{1F604}\u{2764}\u{1F596}\nCreate some decision options...'}</Text>
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
				if (this.state.activeOptionIndex) {
					this.setState({activeOptionIndex : null});
				}
			},
			onOpen : (secId, rowId, direction) => {
				this.setState({activeOptionIndex : this.props.item.key});
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
									options.splice(this.props.index, 1);
									// refresh list
									this.props.parentOptionsList.refreshOptionsList(deletingIndex);
								}}
							],
							{
								cancelable : true
							}
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
					<Text style={styles.option}>{this.props.item.key}</Text>
				</View>
			</SwipeOut>
		);
	}
}


class OptionsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			deletedOptionIndex : null
		};
	}

	refreshOptionsList = (deletedIndex) => {
		this.setState( {
			deletedOptionIndex : deletedIndex
		});
	};

	render() {
		return (
			<View style={{flex: 1, marginTop: 16}}>
				<FlatList
					data={this.props.options}
					renderItem={
						({item, index}) => {
							return (
								<Option item={item} index={index} parentOptionsList={this}></Option>
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
		fontSize: 20,
	}
});
