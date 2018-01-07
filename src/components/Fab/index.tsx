import * as React from "react";
import { Image } from 'react-native';
import {
  View, Icon
} from "native-base";
import ActionButton from 'react-native-action-button';

import styles from "./styles";

export interface Props { }
export interface State { }

class Jar extends React.Component<Props, State> {
  render() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="Enter Income" onPress={() => console.log("notes tapped!")}>
          <Icon name="md-log-in" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Enter Expense" onPress={() => {}}>
          <Icon name="md-log-out" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Transactions" onPress={() => {}}>
          <Icon name="md-list-box" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

export default Jar;