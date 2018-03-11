import * as React from "react";
import { Icon } from "native-base";
import { noop } from 'lodash';
import ActionButton from 'react-native-action-button';
import variable from '../../theme/variables';

import styles from "./styles";

enum Position {
  Right = 'right',
  Center = 'center'
}

export interface Props {
  position?: Position,
  onAddTransactionButtonPressed?: () => void;
  onViewTransactionsButtonPressed?: () => void;
}
export interface State { }

class Fab extends React.PureComponent<Props, State> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { position, onAddTransactionButtonPressed, onViewTransactionsButtonPressed } = this.props;
    return (
      <ActionButton
        renderIcon={() => <Icon name="md-star-outline" style={{ color: variable.inverseTextColor }} />}
        buttonColor={variable.brandPrimary}
        position={position}>
        <ActionButton.Item buttonColor={variable.brandSuccess} title="Add Transaction" onPress={onAddTransactionButtonPressed}>
          <Icon name="md-swap" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor={variable.brandInfo} title="Transactions" onPress={onViewTransactionsButtonPressed}>
          <Icon name="md-list-box" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }

  static defaultProps: Props = {
    position: Position.Right,
    onAddTransactionButtonPressed: noop,
    onViewTransactionsButtonPressed: noop,
  }
}

export default Fab;