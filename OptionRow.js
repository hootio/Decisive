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
					<Text key={this.props.item.id} style={{textAlign: 'center', color: 'white', padding: 12, fontSize: 24}}>
						{this.props.item.name}
					</Text>
				</View>
			</SwipeOut>
		);
	}
}

export default OptionRow;