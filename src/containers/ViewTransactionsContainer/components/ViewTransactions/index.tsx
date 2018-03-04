import * as React from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Right,
  ScrollableTab,
  Tabs,
  Tab,
} from "native-base";
import moment from 'moment';
import { noop, findIndex, size } from 'lodash';

import ActionButton from 'react-native-action-button';
import { translate } from '../../../../locales/i18n';
import styles from "./styles";
import TransactionsReport from './containers/TransactionsReport';
import TopRightMenuOption from './components/TopRightMenuOption';

export interface Props {
  navigation: any;
  tabs: Array<any>;
  loadTransactionToViewOrEdit: Function;
  filter: any;
  changeFilter: Function;
}
export interface State {
  isMenuVisible: boolean;
}

class ViewTransactions extends React.PureComponent<Props, State> {
  static defaultProps = {
    tabs: [],
    viewOrEditTransaction: noop,
    changeFilter: noop,
    filter: {}
  }

  _tab: any;

  constructor(props, context) {
    super(props, context);
    this.state = {
      isMenuVisible: false,
    }
  }

  handleTransactionItemClicked = (transaction) => {
    const { navigation, loadTransactionToViewOrEdit } = this.props;
    loadTransactionToViewOrEdit(transaction);
    navigation.navigate('AddOrEditTransaction', { mode: 'view' });
  }

  getHeading = (tab) => {
    const { type, from: fromInMilliseconds } = tab;
    const from = moment(fromInMilliseconds);
    const now = moment();
    if (type === 'month') {
      if (from.isSame(now, 'month')) {
        return translate('this_month');
      } else if (from.isSame(now.add(1, 'month'), 'month')) {
        return translate('next_month');
      }
      return from.format('MM/YYYY');
    } else if (type === 'day') {
      if (from.isSame(now, 'day')) {
        return translate('today');
      } else if (from.isSame(now.add(1, 'day'), 'day')) {
        return translate('tomorrow');
      }
      return from.format('L')
    } else if (type === 'year') {
      if (from.isSame(now, 'year')) {
        return translate('this_year');
      } else if (from.isSame(now.add(1, 'year'), 'year')) {
        return translate('next_year');
      }
      return from.format('YYYY');
    }
    return 'unknown';
  }

  handleTimeRangeChanged = (timeRange) => {
    this.setState({ isMenuVisible: false });
    this.props.changeFilter({ timeRange });
  }

  handleJumpToTodayOptionSelected = () => {
    this.setState({ isMenuVisible: false });
    this.jumpToTodayTab();
  }

  jumpToTodayTab = () => {
    const { tabs } = this.props;
    const now = Date.now();
    const pageIndex = findIndex(tabs, (t => { return t.from <= now && now <= t.to }));
    // Hack to fix the issue that comes from native-base
    setTimeout(() => { this._tab.goToPage(pageIndex); });
  }

  componentDidUpdate(prevProps) {
    const { tabs: newTabs } = this.props;
    const { tabs: oldTabs } = prevProps;
    if (newTabs !== oldTabs && size(newTabs) > 0) {
      this.jumpToTodayTab();
    }
  }

  render() {
    const { navigation, tabs, filter } = this.props;
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
            <Button transparent onPress={() => { this.setState({ isMenuVisible: true }) }}>
              <Icon name="md-more" />
              <TopRightMenuOption
                isVisible={this.state.isMenuVisible}
                onTimeRangeChange={this.handleTimeRangeChanged}
                timeRange={filter.timeRange}
                onBackdropPress={() => { this.setState({ isMenuVisible: false }) }}
                onJumpToTodayOptionSelected={this.handleJumpToTodayOptionSelected}
              />
            </Button>
          </Right>
        </Header>
        <Tabs initialPage={18} ref={t => { this._tab = t; }} renderTabBar={() => <ScrollableTab />}>
          {
            tabs.map(t => {
              return (
                <Tab key={`t_${t.from}_${t.to}`} heading={this.getHeading(t)}>
                  <TransactionsReport 
                    onTransactionItemClicked={this.handleTransactionItemClicked} from={t.from} to={t.to} />
                </Tab>
              )
            })
          }
        </Tabs>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position={'center'}
          onPress={() => { navigation.navigate('AddOrEditTransaction', { mode: 'add' }) }}
        />
      </Container>
    );
  }
}

export default ViewTransactions;
