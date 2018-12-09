import React from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';

import OptionRow from './OptionRow';

class OptionsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// prints		: [],
			options		: [],
			emojis		: ['🤩', '😍', '😋', '🤤', '😎', '😏', '🙃', '👌🏼', '👍🏼', '🙈', '🙉', '🙊'],
			winnerText	: '',
			maxId		: 0,
		};
	}

	genId = () => {
		const maxId = this.state.maxId + 1;
		this.setState({maxId : maxId});
		return maxId;
	}

	addOption = (newName) => {
		const options = this.state.options.concat({name : newName, id : this.genId()});
		this.setState({options : options});
	}

	// addPrint = (newPrint) => {
	// 	const prints = this.state.prints.concat(newPrint);
	// 	this.setState({prints : prints});
	// }

	deleteOption = (deletingIndex) => {
		const optionsA = this.state.options.slice(0, deletingIndex);
		const optionsB = this.state.options.slice(deletingIndex + 1, this.state.options.length);
		const options = optionsA.concat(optionsB);
		this.setState({options : options});
	}

	pickWinner = () => {
		const winnerOption = this.state.options[Math.floor(Math.random() * this.state.options.length)].name;
		const winnerEmoji = this.state.emojis[Math.floor(Math.random() * this.state.emojis.length)];
		const winnerText = winnerOption + ' ' + winnerEmoji;
		this.setState({winnerText : winnerText});
	}

	render() {
		return (
			<View style={{flex: 1, marginTop: 32}}>
				<Text style={appStyle}>{'Hello there!'}</Text>
				<Text style={appStyle}>{'🖖🏼'}</Text>
				<TextInput
					ref={ (input) => { this.optionInput = input }}
					style={{
						textAlign: 'center',
						borderColor: '#3fae49',
						padding: 16,
						fontSize: 20,
					}}
					placeholder='Add options!'
					returnKeyType='done'
					// clearButtonMode='always'
					onSubmitEditing={ (event) => {
						if (!event.nativeEvent.text) return;
						this.addOption(event.nativeEvent.text);
						this.optionInput.clear();
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
				{/* {this.state.options.map( (option) => {
					return <Text key={option.id}> {'_DEBUG_ ' + JSON.stringify(option, null, 4)}</Text>
				})} */}
				{/* {this.state.prints.map( (print) => {
					return <Text> {'_DEBUG_ ' + JSON.stringify(print, null, 4)}</Text>
				})} */}
				<Button
					title='Be Decisive!'
					color='#3fae49'
					buttonStyle={{
						backgroundColor: 'gray',
						borderWidth: 5,
						borderRadius: 15
					}}
					accessibilityLabel='Add a new option to the list'
					disabled={this.state.options.length <= 0}
					onPress={ () => {
						this.pickWinner();
					}}
				/>
				<Text style={{textAlign: 'center', padding: 32, color: '#3fae49', fontSize: 32,}}>{this.state.options.length <= 0 ? '' : this.state.winnerText}</Text>
			</View>
		);
	}
}

const appStyle = {
	textAlign: 'center',
	padding: 4,
	fontSize: 32,
}

export default OptionsList;