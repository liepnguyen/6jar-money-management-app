import * as React from "react";
import {
	Container, Header, Title, Content, Button, Icon,
	Left, Right, Body, Form, View, Item, Input, Row, Col, Text, Radio,
} from "native-base";
import { CVE_SCREEN_MODES } from '../../../../constants';
import { Alert } from 'react-native';

import styles from "./styles";

export interface Props {
	onGoBackButtonPressed: () => void;
	category: any;
	mode: string;
	onFormValueChanged: (keyValue: any) => void;
	onSaveButtonPressed: () => void;
	onDeleteCategory: (categoryId: string) => void;
}
export interface State { }
class CategoriesPage extends React.PureComponent<Props, State> {
	static defaultProps = {
		category: {},
	}

	handleCategoryNameInputChanged = (name) => {
		this.props.onFormValueChanged({ name });
	}

	handleCategoryTypeRadioPressed = (type) => {
		this.props.onFormValueChanged({ type });
	}

	handleDeleteCategory = () => {
    const { category: { id }, onDeleteCategory } = this.props;
    Alert.alert('Delete Category', 'Are you sure you want to delete this category?', [
      { text: 'NO', onPress: () => { }, style: 'cancel' },
      { text: 'YES', onPress: () => { onDeleteCategory(id); } },
    ])
  }

	render() {
		const { onGoBackButtonPressed, onSaveButtonPressed, category, mode } = this.props;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={onGoBackButtonPressed}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>
					<Body style={{ flex: 3 }}>
						<Title>Category</Title>
					</Body>
					<Right />
					<Right>
						{
							mode === CVE_SCREEN_MODES.VIEW ?
								<Button transparent onPress={this.handleDeleteCategory}>
									<Icon active name="md-trash" />
								</Button>
								: null
						}
						<Button transparent onPress={onSaveButtonPressed}>
							<Icon active name="md-checkmark" />
						</Button>
					</Right>
				</Header>
				<Content padder>
					<View style={{ flex: 1 }}>
						<Form>
							<Item>
								<Icon active name='md-cube' style={styles.icon} />
								<Input style={{ height: 70 }} placeholder={'Category name'} onChangeText={this.handleCategoryNameInputChanged} value={category.name} />
							</Item>
							<Item>
								<Icon active name='md-help-circle' style={[styles.icon, { marginRight: 6 }]} />
								<Row style={{ height: 70, alignItems: 'center' }}>
									<Text style={{ marginRight: 5 }}>Income</Text>
									<Radio
										selected={category.type === 'income'}
										style={{ marginRight: 20 }}
										onPress={() => { this.handleCategoryTypeRadioPressed('income') }} />
									<Text style={{ marginRight: 5 }}>Expense</Text>
									<Radio
										selected={category.type === 'expense'}
										onPress={() => { this.handleCategoryTypeRadioPressed('expense') }} />
								</Row>
							</Item>
						</Form>
					</View>
				</Content>
			</Container>
		);
	}
}

export default CategoriesPage;
