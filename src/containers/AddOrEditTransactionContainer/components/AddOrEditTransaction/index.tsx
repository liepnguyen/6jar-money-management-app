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
  Thumbnail,
  Toast,
} from "native-base";
import { Row } from 'react-native-easy-grid';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  TouchableOpacity,
  Alert,
} from 'react-native';
import { noop, capitalize, isEmpty } from 'lodash';
import moment from 'moment';

import I18n, { formatNumber, translate } from '../../../../locales/i18n';
import { TransactionFormField } from '../../constants';
import styles from "./styles";
import { loadIcon } from '../../../../resources';

export interface Props {
  navigation: any;
  onFormValueChanged: Function;
  transaction: any;
  onSave: Function,
  onDelete: Function,
}
export interface State {
  isDateTimePickerVisible: boolean
}

class AddOrEditTransaction extends React.PureComponent<Props, State> {
  static defaultProps = {
    onFormValueChanged: noop,
    transaction: {},
    onDelete: noop,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }

  handleDatePicked = (date: Date) => {
    this.hideDateTimePicker();
    this.props.onFormValueChanged(TransactionFormField.Date, +date);
  };

  handleCategorySelected = (selectedCategory) => {
    this.props.onFormValueChanged(TransactionFormField.Category, selectedCategory);
  }

  handleSelectCategory = () => {
    this.props.navigation.navigate('SelectCategory', { onCategorySelected: this.handleCategorySelected });
  }

  handleAmountEntered = (amount) => {
    this.props.onFormValueChanged(TransactionFormField.Amount, amount);
  }

  handleEnterAmount = () => {
    const { navigation, transaction: { amount } } = this.props;
    navigation.navigate('EnterAmount', {
      onAmountEntered: this.handleAmountEntered,
      value: amount,
    });
  }

  showWarningMessage = (message) => {
    Toast.show({
      text: message,
      position: 'bottom',
      type: 'warning',
      buttonText: 'OK',
      duration: 5000,
    });
  }

  validateTransaction = (transaction) => {
    if (transaction.amount <= 0) {
      this.showWarningMessage('Amount must be greater than zero');
      return false;
    }
    if (!transaction.category) {
      this.showWarningMessage('You must select a category');
      return false;
    }
    if (transaction.category.type === 'expense' && !transaction.jar) {
      this.showWarningMessage('You must select an account to debit');
      return false;
    }
    return true;
  }

  handleSaveTransaction = () => {
    const { transaction } = this.props;
    if (this.validateTransaction(transaction)) {
      this.props.onSave(transaction);
      this.props.navigation.goBack();
    }
  }

  handleDeleteTransaction = () => {
    Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
      { text: 'NO', onPress: () => { }, style: 'cancel' },
      { text: 'YES', onPress: () => { this.props.onDelete(this.props.transaction); this.props.navigation.goBack(); } },
    ])
  }

  handleNoteInputted = (text) => {
    this.props.onFormValueChanged(TransactionFormField.Note, text);
  }

  handleSelectJar = () => {
    this.props.navigation.navigate('SelectJar', { onJarSelected: this.handleJarSelected });
  }

  handleJarSelected = (selectedJar) => {
    this.props.onFormValueChanged(TransactionFormField.Jar, selectedJar);
  }

  formatTransactionDate = (date) => {
    if (moment(date).isSame(moment(), 'day')) {
      return translate('today');
    }
    return moment(date).format('dddd, L');
  }

  render() {
    const { state } = this.props.navigation;
    const { category = {}, date, jar = {}, amount } = this.props.transaction;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{state.params.mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}</Title>
          </Body>
          <Right>
            {
              state.params.mode === 'view' ?
                <Button transparent onPress={this.handleDeleteTransaction}>
                  <Icon active name="md-trash" />
                </Button>
                : null
            }
            <Button transparent onPress={this.handleSaveTransaction}>
              <Icon active name="md-checkmark" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ flex: 1 }}>
            <Form>
              <Item>
                <TouchableOpacity onPress={this.handleEnterAmount} style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }}>
                    <Icon active name='md-cash' style={styles.icon} />
                    <Text style={styles.textValue}>{formatNumber(amount)}</Text>
                  </Row>
                </TouchableOpacity>
              </Item>
              <Item>
                <TouchableOpacity onPress={this.handleSelectCategory} style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }}>
                    <Thumbnail small source={loadIcon(category.icon, { default: 'question_mark.png' })} style={{ marginRight: 5 }} />
                    {
                      isEmpty(category)
                        ? <Text style={[styles.textValue, styles.greyText]}>{I18n.t('select_category')}</Text>
                        : <Text style={[styles.textValue]}>{I18n.t(`category.${category.name}`, { defaultValue: category.name })}</Text>
                    }
                  </Row>
                </TouchableOpacity>
              </Item>
              <Item>
                <Icon active name='md-list-box' style={styles.icon} />
                <Input style={{ height: 70 }} placeholder={I18n.t('note')} onChangeText={this.handleNoteInputted} value={this.props.transaction.note} />
              </Item>
              <Item>
                <TouchableOpacity onPress={this.showDateTimePicker} style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }}>
                    <Icon active name='md-calendar' style={styles.icon} />
                    <Text style={styles.textValue}>{capitalize(this.formatTransactionDate(date))}</Text>
                  </Row>
                </TouchableOpacity>
              </Item>
              {
                category.type === 'expense'
                  ? (
                    <Item>
                      <TouchableOpacity onPress={this.handleSelectJar} style={{ flex: 1 }}>
                        <Row style={{ alignItems: 'center' }}>
                          <Thumbnail small source={loadIcon(jar.icon, { default: 'question_mark.png' })} />
                          {
                            isEmpty(jar)
                              ? <Text style={[styles.textValue, styles.greyText]}>{I18n.t('select_account')}</Text>
                              : <Text style={styles.textValue}>{I18n.t(`jar.${jar.name}`, { defaultValue: jar.name })}</Text>
                          }
                        </Row>
                      </TouchableOpacity>
                    </Item>
                  )
                  : null
              }
            </Form>
          </View>
        </Content>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          date={new Date(date)}
        />
      </Container>
    );
  }
}

export default AddOrEditTransaction;
