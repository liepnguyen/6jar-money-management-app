import * as React from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
  List,
  ListItem,
  Thumbnail,
  Text,
  Tabs,
  Tab,
  Content
} from "native-base";
import { cloneDeep } from 'lodash';
import I18n from '../../../../../../locales/i18n';
const restaurantIcon = require("../../../../../../../assets/categories/restaurant.png");

import styles from "./styles";

export interface Props {
  navigation: any;
  onCategorySelected: Function,
  incomeCategories: Array<any>,
  expenseCategories: Array<any>
}

export interface State {
}

class SelectCategory extends React.PureComponent<Props, State> {
  static defaultProps = {
    incomeCategories: [],
    expenseCategories: []
  }

  constructor(props, context) {
    super(props, context);
  }

  handleCategorySelected = (selectedCategory) => {
    this.props.onCategorySelected(cloneDeep(selectedCategory));
    this.props.navigation.goBack();
  }

  renderCategoryItem = (category) => {
    return (
      <ListItem avatar key={category.id} onPress={() => { this.handleCategorySelected(category) }}>
        <Left>
          <Thumbnail small source={restaurantIcon} />
        </Left>
        <Body style={{ alignItems: 'flex-start' }}>
          <Text>{I18n.t(`category.${category.name}`, { defaultValue: category.name })}</Text>
        </Body>
      </ListItem>
    )
  }

  render() {
    const { navigation, incomeCategories, expenseCategories } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Select Category</Title>
          </Body>
        </Header>
        <Tabs initialPage={1}>
          <Tab heading='INCOME'>
            <Content>
              <List>
                {incomeCategories.map(this.renderCategoryItem)}
              </List>
            </Content>
          </Tab>
          <Tab heading='EXPENSE'>
            <Content>
              <List>
                {expenseCategories.map(this.renderCategoryItem)}
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default SelectCategory;
