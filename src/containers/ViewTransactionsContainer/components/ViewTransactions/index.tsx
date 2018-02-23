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
import { keys, sortBy, range, sumBy, upperFirst } from 'lodash';
import moment from 'moment';

import I18n, { formatCurrency, translate } from '../../../../locales/i18n';
import styles from "./styles";
import { icon } from '../../../../resources';

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
    const monthInMoment = moment(month);
    if (monthInMoment.isSame(moment(), 'month')) {
      return translate('this_month');
    } else if (monthInMoment.isSame(moment().add(1, 'month'), 'month')) {
      return translate('next_month');
    }
    return month.format('MM/YYYY');
  }

  getTransactionAmount = (transaction) => {
    return transaction.type === 'expense' ? -transaction.amount : transaction.amount;
  }

  renderTab = (month) => {
    const { transactionsByDate } = this.props;
    const transactionDates = sortBy(keys(transactionsByDate).map((d) => { return moment(+d); }));
    const datesInMonth = transactionDates.filter((d) => { return moment(d).startOf('month').diff(month) === 0; });
    return (
      <Tab key={`t_${month.valueOf()}`} heading={this.getTabHeading(month)}>
        <Content>
          {datesInMonth.map((date) => {
            const dateValue = date.valueOf();
            const transactions = transactionsByDate[dateValue];
            const totalAmount = sumBy(transactions, this.getTransactionAmount);
            return (
              <Card key={`c_${dateValue}`}>
                <CardItem bordered onPress={() => { }}>
                  <Left>
                    <Text style={{ fontSize: 40, marginLeft: 0 }}>{date.format('DD')}</Text>
                    <Body>
                      <Text>{upperFirst(date.format('dddd'))}</Text>
                      <Text note>{upperFirst(date.format('MMMM, YYYY'))}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text>{formatCurrency(totalAmount)}</Text>
                  </Right>
                </CardItem>
                {transactions.map((transaction) => {
                  const category = transaction.category || {};
                  const transactionAmount = this.getTransactionAmount(transaction);
                  return (
                    <CardItem key={`ti_${transaction.id}`} onPress={() => { console.log(transaction); }}>
                      <Left>
                        <Thumbnail small source={icon.category[category.icon]} />
                        <Body>
                          <Text>{I18n.t(`category.${category.name}`)}</Text>
                          <Text note>{transaction.note}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text>{formatCurrency(transactionAmount)}</Text>
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
