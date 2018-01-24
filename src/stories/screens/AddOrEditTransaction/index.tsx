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
  Segment,
  Text,
  Input,
  Item,
  View,
  Picker,
  Form,
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  TouchableOpacity
} from 'react-native';

import styles from "./styles";

enum TransactionType {
  Income = 'income',
  Expense = 'expense'
}

export interface Props {
  navigation: any;
}
export interface State {
  type?: TransactionType,
  isDateTimePickerVisible: boolean
}

class AddOrEditTransaction extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: TransactionType.Income,
      isDateTimePickerVisible: false
    };
  }

  onIncomeTypeSelected = () => {
    this.setState({ type: TransactionType.Income });
  }

  onExpenseTypeSelected = () => {
    this.setState({ type: TransactionType.Expense });
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }

  handleDatePicked = (date) => {
    this.hideDateTimePicker();
  };

  render() {
    const { state } = this.props.navigation;
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
            <Button transparent>
              <Icon active name="md-more" />
            </Button>
          </Right>
        </Header>
        <Segment>
          <Button
            first
            active={this.state.type === TransactionType.Income}
            onPress={this.onIncomeTypeSelected}
          >
            <Text>Income</Text>
          </Button>
          <Button
            last
            active={this.state.type === TransactionType.Expense}
            onPress={this.onExpenseTypeSelected}
          >
            <Text>Expense</Text>
          </Button>
        </Segment>
        <Content>
          <View style={{ flex: 1 }}>
            <Form>
              <Item>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EnterAmount') } style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }}>
                    <Icon active name='md-cash' style={{ paddingRight: 8, fontSize: 24 }} />
                    <Text style={styles.textValue}>100</Text>
                  </Row>
                </TouchableOpacity>
              </Item>
              <Item>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectCategory') } style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }}>
                    <Icon active name='md-help-circle' style={{ paddingRight: 8, fontSize: 24 }} />
                    <Text style={styles.textValue}>Select category</Text>
                  </Row>
                </TouchableOpacity>
              </Item>
              <Item>
                <Icon active name='md-list-box' />
                <Input placeholder='Note' />
              </Item>
              <Item>
                <TouchableOpacity onPress={this.showDateTimePicker} style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }}>
                    <Icon active name='md-calendar' style={{ paddingRight: 8, fontSize: 24 }} />
                    <Text style={styles.textValue}>Today</Text>
                  </Row>
                </TouchableOpacity>
              </Item>
            </Form>
          </View>
        </Content>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </Container>
    );
  }
}

export default AddOrEditTransaction;
