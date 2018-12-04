import React from 'react';
import {Alert, Button, FlatList, Text, TextInput, View} from 'react-native';

import OptionRow from './OptionRow';

class OptionsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			options : [],
			maxId : 0,
		};
	}

	genId = () => {
		const maxId = this.state.maxId + 1;
		this.setState({maxId : maxId});
		return maxId;
	}

	addOption = (newName) => {
		const options = this.state.options.concat({name: newName, id : this.genId()});
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
				<TextInput
					style={{
						color: 'black',
						padding: 10,
						fontSize: 20,
					}}
					placeholder="Add a new option!"
					onSubmitEditing={ (text) => {
						this.addOption(text);
					}}
				/>
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
					return <Text key={option.id}> {'_DEBUG_ ' + option.name + ' ' + option.id}</Text>
				})}
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
					style={{
						color: 'white',
						padding: 10,
						fontSize: 20,
					}}
					title="Add Option"
					color="#3fae49"
					accessibilityLabel="Add a new option to the list"
				/>
			</View>
		);
	}
}

export default OptionsList;