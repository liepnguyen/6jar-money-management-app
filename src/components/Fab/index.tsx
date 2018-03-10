import * as React from "react";
import { Icon } from "native-base";
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import variable from '../../theme/variables';

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

class Fab extends React.PureComponent<Props, State> {
  static contextTypes = {
    style: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { position, navigation } = this.props;
    return (
      <ActionButton
        renderIcon={() => <Icon name="md-star-outline" style={{ color: variable.inverseTextColor }} />}
        buttonColor={variable.brandPrimary}
        position={position}>
        <ActionButton.Item buttonColor={variable.brandSuccess} title="Add Transaction" onPress={() => { navigation.navigate('CVETransaction', { mode: 'add' }) }}>
          <Icon name="md-swap" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor={variable.brandInfo} title="Transactions" onPress={() => { navigation.navigate('ViewTransactions') }}>
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

export default Fab;