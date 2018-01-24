import * as React from "react";
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Thumbnail,
  Text,
  Tabs,
  Tab,
  View
} from "native-base";
const restaurantIcon = require("../../../../assets/categories/restaurant.png");

import styles from "./styles";

export interface Props {
  navigation: any;
}
export interface State {
}

class AddOrEditTransaction extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context);
  }

  expenseCategories = [
    {
      id: '001',
      name: 'Eat',
      description: '',
      icon: restaurantIcon
    },
    {
      id: '002',
      name: 'Eat',
      description: '',
      icon: restaurantIcon
    },
    {
      id: '003',
      name: 'Eat',
      description: '',
      icon: restaurantIcon
    }
  ];

  incomeCategories = [
    {
      id: '001',
      name: 'Eat',
      description: '',
      icon: restaurantIcon
    },
    {
      id: '002',
      name: 'Eat',
      description: '',
      icon: restaurantIcon
    },
    {
      id: '003',
      name: 'Eat',
      description: '',
      icon: restaurantIcon
    }
  ];

  renderCategoryItem(category) {
    return (
      <ListItem avatar key={category.id} onPress={() => { }}>
        <Left>
          <Thumbnail small source={category.icon} />
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
              {this.expenseCategories.map(this.renderCategoryItem)}
            </List>
          </Tab>
          <Tab heading='EXPENSE'>
            <List>
              {this.incomeCategories.map(this.renderCategoryItem)}
            </List>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default AddOrEditTransaction;
