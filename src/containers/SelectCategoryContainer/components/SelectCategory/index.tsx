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
} from "native-base";
import { filter, head, cloneDeep } from 'lodash';
const restaurantIcon = require("../../../../../assets/categories/restaurant.png");

import styles from "./styles";

export interface Props {
  navigation: any;
  onCategorySelected: Function,
  categories: Array<any>
}

export interface State {
}

class SelectCategory extends React.Component<Props, State> {
  static defaultProps = {
    categories: []
  }

  constructor(props, context) {
    super(props, context);
  }

  handleCategorySelected = (categoryId) => {
    const selectedCategory = cloneDeep(head(filter(this.props.categories, { id: categoryId })));
    this.props.onCategorySelected(selectedCategory);
    this.props.navigation.goBack();
  }

  renderCategoryItem = (category) => {
    return (
      <ListItem avatar key={category.id} onPress={() => { this.handleCategorySelected(category.id) }}>
        <Left>
          <Thumbnail small source={restaurantIcon} />
        </Left>
        <Body style={{ alignItems: 'flex-start' }}>
          <Text>{category.name}</Text>
        </Body>
      </ListItem>
    )
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Select Category</Title>
          </Body>
        </Header>
        <Tabs initialPage={1}>
          <Tab heading='INCOME'>
            <List>
              {this.props.categories.map(this.renderCategoryItem)}
            </List>
          </Tab>
          <Tab heading='EXPENSE'>
            <List>
              {this.props.categories.map(this.renderCategoryItem)}
            </List>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default SelectCategory;
