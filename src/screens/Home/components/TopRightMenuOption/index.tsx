import * as React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Text, Icon, Left, Row } from 'native-base';
import { noop } from 'lodash';

import styles from './styles';

export interface Props {
  isVisible: boolean;
  onBackdropPress?: Function;
}
export interface State {
  isMainMenuVisible: boolean;
}
class TopRightMenuOption extends React.PureComponent<Props, State> {
  static defaultProps = {
    isVisible: false,
    onBackdropPress: noop,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isMainMenuVisible: false,
    }
  }

  render() {
    const { isVisible, onBackdropPress } = this.props;
    return (
      <Menu opened={isVisible} onBackdropPress={onBackdropPress}>
        <MenuTrigger />
        <MenuOptions>
          <MenuOption onSelect={() => { () => { } }} >
            <Text style={{ padding: 6 }}>New transaction</Text>
          </MenuOption>
          <MenuOption onSelect={() => { () => { } }} >
            <Text style={{ padding: 6 }}>View transactions</Text>
          </MenuOption>
          <MenuOption onSelect={() => { () => { } }} >
            <Text style={{ padding: 6 }}>Settings</Text>
          </MenuOption>
          <MenuOption onSelect={() => { }} >
            <Text style={{ padding: 6 }}>{'Help & about'}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }
}

export default TopRightMenuOption;