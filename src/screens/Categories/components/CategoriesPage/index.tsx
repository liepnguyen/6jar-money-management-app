import * as React from "react";
import {
	Container, Header, Title, Content, Text, Button, Icon,
	Left, Right, Body, Separator, ListItem, List, Thumbnail
} from "native-base";
import ActionButton from 'react-native-action-button';
import { noop } from 'lodash';
import { loadIcon } from '../../../../resources';
import { translate } from '../../../../locales/i18n';
import variable from '../../../../theme/variables';

import styles from "./styles";
export interface Props {
	categories: Array<any>;
	onCategorySelected: (categoryId: string) => void;
	onGoBackButtonPressed: () => void;
	onAddNewButtonPressed: () => void;
}
export interface State { }
class CategoriesPage extends React.PureComponent<Props, State> {
	static defaultProps = {
		categories: [],
		onCategorySelected: noop,
	}

	handleCategorySelected = (category) => {
		const { onCategorySelected } = this.props;
		onCategorySelected(category);
	}

	renderCategoryListItem = (category) => {
		return (
			<ListItem avatar key={category.id} onPress={() => { this.handleCategorySelected(category) }}>
				<Left>
					<Thumbnail small source={loadIcon(category.icon)} />
				</Left>
				<Body style={{ alignItems: 'flex-start' }}>
					<Text>{translate(`category.${category.name}`, { defaultValue: category.name })}</Text>
				</Body>
			</ListItem>
		)
	}

	render() {
		const { categories, onGoBackButtonPressed, onAddNewButtonPressed } = this.props;
		const incomeCategories = categories.filter((cat) => cat.type === 'income');
		const expenseCategories = categories.filter((cat) => cat.type === 'expense');
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={onGoBackButtonPressed}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>Categories</Title>
					</Body>

					<Right />
				</Header>

				<Content padder>
					<List>
						<Separator bordered>
							<Text>INCOME</Text>
						</Separator>
						{incomeCategories.map((cat) => this.renderCategoryListItem(cat))}
						<Separator bordered>
							<Text>EXPENSE</Text>
						</Separator>
						{expenseCategories.map((cat) => this.renderCategoryListItem(cat))}
					</List>
				</Content>
				<ActionButton
					buttonColor={variable.brandPrimary}
					position={'center'}
					onPress={onAddNewButtonPressed}
				/>
			</Container>
		);
	}
}

export default CategoriesPage;
