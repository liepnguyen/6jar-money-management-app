import * as React from "react";
import {
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Thumbnail,
  Content
} from "native-base";
import { Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity } from 'react-native';
import { groupBy, sumBy, upperFirst, keys, noop } from 'lodash';
import moment from 'moment';

import { formatCurrency, translate } from '../../../../../../locales/i18n';
import { loadIcon } from '../../../../../../resources';

export interface Props {
  from: number,
  to: number,
  report: { inflow: number, outflow: number, transactions: Array<any> },
  onTransactionItemClicked: Function,
}
export interface State {
}
class TransactionsReport extends React.PureComponent<Props, State> {
  static defaultProps = {
    report: {},
    noop,
  }

  getTransactionAmount = (transaction) => {
    return transaction.type === 'expense' ? -transaction.amount : transaction.amount;
  }

  render() {
    const { report: { inflow, outflow, transactions }, onTransactionItemClicked } = this.props;
    const transactionsByDates = groupBy(transactions, 'date');
    const dates = keys(transactionsByDates).map(d => +d);
    return (
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>{translate('overview')}</Text>
              <Text note>Top to view full report</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Grid>
              <Row>
                <Body>
                  <Text>{translate('inflow')}</Text>
                </Body>
                <Right>
                  <Text>{formatCurrency(inflow)}</Text>
                </Right>
              </Row>
              <Row>
                <Body>
                  <Text>{translate('outflow')}</Text>
                </Body>
                <Right>
                  <Text>{formatCurrency(-outflow)}</Text>
                </Right>
              </Row>
              <Row>
                <Body></Body>
                <Right>
                  <Text style={{ fontSize: 18 }}>{formatCurrency(inflow - outflow)}</Text>
                </Right>
              </Row>
            </Grid>
          </CardItem>
        </Card>
        {dates.map((date) => {
          const dateMoment = moment(date);
          const transactions = transactionsByDates[date];
          const totalAmount = sumBy(transactions, this.getTransactionAmount);
          return (
            <Card key={`c_${date}`}>
              <CardItem bordered onPress={() => { }}>
                <Left>
                  <Text style={{ fontSize: 40, marginLeft: 0 }}>{dateMoment.format('DD')}</Text>
                  <Body>
                    <Text>{upperFirst(dateMoment.format('dddd'))}</Text>
                    <Text note>{upperFirst(dateMoment.format('MMMM, YYYY'))}</Text>
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
                  <TouchableOpacity key={`ti_${transaction.id}`} onPress={() => { onTransactionItemClicked(transaction) }}>
                    <CardItem>
                      <Left>
                        <Thumbnail small source={loadIcon(category.icon)} />
                        <Body>
                          <Text>{translate(`category.${category.name}`, { defaultValue: category.name })}</Text>
                          <Text note>{transaction.note}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text>{formatCurrency(transactionAmount)}</Text>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                );
              })}
            </Card>
          )
        })}
      </Content>
    )
  }
}

export default TransactionsReport;