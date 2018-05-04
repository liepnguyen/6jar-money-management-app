import * as React from "react";
import {
	Container, Header, Title, Content, Button, Icon,
	Left, Right, Body, Form, View, Item, Input, Row, Col, Text, Radio, IconNB,
} from "native-base";
import { CVE_SCREEN_MODES } from '../../../../constants';

import styles from "./styles";

export interface Props {
	onGoBackButtonPressed: () => void;
	category: any;
	mode: string;
	onFormValueChanged: (keyValue: any) => void;
	onSaveButtonPressed: () => void;
	onDeleteCategory: (categoryId: string) => void;
	isReadonly: boolean;
}
export interface State {
	categoryNameInputHasError: boolean;
}
class CategoriesPage extends React.PureComponent<Props, State> {
	static defaultProps = {
		category: {},
		isReadonly: false,
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			categoryNameInputHasError: false,
		}
	}

	handleCategoryNameInputChanged = (name) => {
		this.props.onFormValueChanged({ name });
	}

	handleCategoryTypeRadioPressed = (type) => {
		this.props.onFormValueChanged({ type });
	}

	handleDeleteCategory = () => {
		const { category: { id }, onDeleteCategory } = this.props;
		onDeleteCategory(id);
	}

	handleSaveButtonPressed = () => {
		const { onSaveButtonPressed } = this.props;
		onSaveButtonPressed();
	}

	render() {
		const { onGoBackButtonPressed, category, mode, isReadonly } = this.props;
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
					{
						!isReadonly ? (
							<Right>
								{
									mode === CVE_SCREEN_MODES.VIEW ?
										<Button transparent onPress={this.handleDeleteCategory}>
											<Icon active name="md-trash" />
										</Button>
										: null
								}
								<Button transparent onPress={this.handleSaveButtonPressed}>
									<Icon active name="md-checkmark" />
								</Button>
							</Right>
						) : (
							<Right>
								<Button transparent>
									<Icon active name="md-eye" />
								</Button>
							</Right>
						)
					}
				</Header>
				<Content padder>
					<View style={{ flex: 1 }}>
						<Form>
							<Item error={this.state.categoryNameInputHasError}>
								<Icon active name='md-cube' style={styles.icon} />
								<Input disabled={isReadonly} style={{ height: 70 }} placeholder={'Category name'} onChangeText={this.handleCategoryNameInputChanged} value={category.name} />
								{this.state.categoryNameInputHasError ? <IconNB name="ios-close-circle" /> : null}
							</Item>
							<Item>
								<Icon active name='md-help-circle' style={[styles.icon, { marginRight: 6 }]} />
								<Row style={{ height: 70, alignItems: 'center' }}>
									<Text style={{ marginRight: 5 }}>Income</Text>
									<Radio
										disabled={isReadonly}
										selected={category.type === 'income'}
										style={{ marginRight: 20 }}
										onPress={() => { this.handleCategoryTypeRadioPressed('income') }} />
									<Text style={{ marginRight: 5 }}>Expense</Text>
									<Radio
										disabled={isReadonly}
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
