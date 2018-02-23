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
  Text,
  Input,
  Item,
  View,
  Form,
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem,
  Tabs,
  Tab,
  ScrollableTab,
  TabHeading
} from "native-base";
import { Row } from 'react-native-easy-grid';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  TouchableOpacity
} from 'react-native';
import { noop, keys, sortBy, range, toNumber, flatMap, startCase } from 'lodash';
import moment from 'moment';

import I18n from '../../../../locales/i18n';
import styles from "./styles";
const restaurantIcon = require("../../../../../assets/categories/restaurant.png");

export interface Props {
  navigation: any;
  filter: any,
  transactionsByDate: any
}
export interface State {
}

class ViewTransactions extends React.PureComponent<Props, State> {
  static defaultProps = {
    transactions: [],
    transactionsByDate: {}
  }

  currentMonth: any;
  months: Array<any>;

  constructor(props, context) {
    super(props, context);
    this.currentMonth = moment().startOf('month');
    this.months = range(3, -2).map((i) => { return moment(this.currentMonth).subtract(i, 'M'); });
  }

  getTabHeading = (month) => {
    const diffMonths = moment(month).diff(this.currentMonth, 'months');
    if (diffMonths === 0) {
      return 'This Month';
    } else if (diffMonths === 1) {
      return 'Next Month';
    }
    return month.format('MM/YYYY');
  }

  renderTab = (month) => {
    const { transactionsByDate } = this.props;
    const transactionDates = sortBy(keys(transactionsByDate).map((d) => { return moment(+d); }));
    const datesInMonth = transactionDates.filter((d) => { return moment(d).startOf('month').diff(month) === 0; });
    return (
      <Tab key={`t_${month.valueOf()}`} heading={this.getTabHeading(month)}>
        <Content>
          {datesInMonth.map((date) => {
            return (
              <Card key={`c_${date.valueOf()}`}>
                <CardItem bordered onPress={() => { }}>
                  <Left>
                    <Text style={{ fontSize: 40, marginLeft: 0 }}>{date.format('DD')}</Text>
                    <Body>
                      <Text>{date.format('dddd')}</Text>
                      <Text note>{date.format('MMMM, YYYY')}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text>{'$23'}</Text>
                  </Right>
                </CardItem>
                {transactionsByDate[+date].map((transaction) => {
                  const category = transaction.category || {};
                  return (
                    <CardItem key={`ti_${transaction.id}`} onPress={() => { console.log(transaction); }}>
                      <Left>
                        <Thumbnail small source={restaurantIcon} />
                        <Body>
                          <Text>{I18n.t(`category.${category.name}`)}</Text>
                          <Text note>{transaction.note}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text>{'$23'}</Text>
                      </Right>
                    </CardItem>
                  );
                })}
              </Card>
            )
          })}
        </Content>
      </Tab>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Transactions</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('AddOrEditTransaction', { mode: 'add' })}>
              <Icon active name="md-add-circle" />
            </Button>
          </Right>
        </Header>
        <Tabs initialPage={3} renderTabBar={() => <ScrollableTab />}>
          {this.months.map(this.renderTab)}
        </Tabs>
      </Container>
    );
  }
}

export default ViewTransactions;
