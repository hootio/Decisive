import React from 'react';
import {Alert, Text, View} from 'react-native';
import SwipeOut from 'react-native-swipeout';

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
			right : [
				{
					onPress : () => {
						Alert.alert(
							'Alert!',
							'Are you sure you want to delete ' + this.props.item.name + '?',
							[
								{text : 'No', onPress : () => {}, style: 'cancel'},
								{text : 'Yes', onPress : () => {
									this.props.parentOptionsList.deleteOption(this.props.index);
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
		};

		return (
			<SwipeOut {...swipeSettings}>
				<View style={{flex: 1, backgroundColor: this.props.index % 2 === 0 ? '#00bfd6' : '#e63e2f'}}>
					<Text key={this.props.item.id} style={{textAlign: 'center', color: 'white', padding: 12, fontSize: 24}}>
						{this.props.item.name}
					</Text>
				</View>
			</SwipeOut>
		);
	}
}

export default OptionRow;