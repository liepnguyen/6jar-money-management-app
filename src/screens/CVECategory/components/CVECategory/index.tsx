import * as React from "react";
import {
	Container, Header, Title, Content, Button, Icon,
	Left, Right, Body, Form, View, Item, Input, Row, Col, Text, Radio,
} from "native-base";

import styles from "./styles";

export interface Props {
	onGoBackButtonPressed: () => void;
	category: any;
	mode: string;
	onFormValueChanged: (keyValue: any) => void;
	onSaveButtonPressed: () => void;
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

	render() {
		const { onGoBackButtonPressed, onSaveButtonPressed, category } = this.props;
		console.log(category);
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
