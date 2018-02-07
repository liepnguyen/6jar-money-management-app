import * as React from "react";
import { Icon } from "native-base";
import { noop } from 'lodash';
import ActionButton from 'react-native-action-button';

import styles from "./styles";

enum Position {
  Right = 'right',
  Center = 'center'
}

export interface Props {
  position?: Position,
  navigation: any
}
export interface State { }

class Jar extends React.PureComponent<Props, State> {
  render() {
    const { position, navigation } = this.props;
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)" position={position}>
        <ActionButton.Item buttonColor='#9b59b6' title="Add Transaction" onPress={() => { navigation.navigate('AddOrEditTransaction', { mode: 'add' }) }}>
          <Icon name="md-swap" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Transactions" onPress={() => { navigation.navigate('ViewTransactions') }}>
          <Icon name="md-list-box" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }

  static defaultProps: Props = {
    position: Position.Right,
    navigation: {},
  }
}

export default Jar;