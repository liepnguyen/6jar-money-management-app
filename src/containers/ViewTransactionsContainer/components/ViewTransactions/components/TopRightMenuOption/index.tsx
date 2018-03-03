import * as React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Text } from 'native-base';
import { noop } from 'lodash';

import styles from './styles';

const CheckedOption = (props) => {
  const { onSelect, text, checked } = props;
  return (
    <MenuOption onSelect={onSelect}>
      {
        checked ? (
          <Text style={{ padding: 6, fontWeight: 'bold' }}>{text}</Text>
        ) : (
            <Text style={{ padding: 6 }}>{text}</Text>
          )
      }
    </MenuOption>
  )
}

export interface Props {
  isVisible: boolean;
  onTimeRangeChange: Function;
  onJumpToTodayOptionSelected: Function;
  onBackdropPress?: Function;
  timeRange: any;
}
export interface State {
  isSelectTimeRangeMenuVisible: boolean;
  isMainMenuVisible: boolean;
}
class TopRightMenuOption extends React.PureComponent<Props, State> {
  static defaultProps = {
    isVisible: false,
    onTimeRangeChange: noop,
    timeRange: {},
    onBackdropPress: noop,
    onJumpToToDayOptionSelected: noop,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isSelectTimeRangeMenuVisible: false,
      isMainMenuVisible: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isVisible } = nextProps;
    if (isVisible !== this.props.isVisible) {
      if (!isVisible) {
        this.setState({
          isSelectTimeRangeMenuVisible: false
        })
      }
    }
  }

  renderCheckedOption = (text: string, value: string, onSelect?: Function) => {
    const { timeRange, onTimeRangeChange } = this.props;
    const callback = onSelect || onTimeRangeChange;
    return (
      <CheckedOption
        key={`co_${value}`}
        text={text}
        value={value}
        checked={timeRange.range === value}
        onSelect={() => { onSelect || callback({ range: value }); }}
      />
    )
  }

  render() {
    const { isVisible, onBackdropPress, onJumpToTodayOptionSelected } = this.props;
    return (
      <Menu opened={isVisible} onBackdropPress={onBackdropPress}>
        <MenuTrigger />
        {
          this.state.isSelectTimeRangeMenuVisible ? (
            <MenuOptions>
              {this.renderCheckedOption('Day', 'day')}
              {this.renderCheckedOption('Month', 'month')}
              {this.renderCheckedOption('Year', 'year')}
            </MenuOptions>
          ) :
            (
              <MenuOptions>
                <MenuOption onSelect={onJumpToTodayOptionSelected} >
                  <Text style={{ padding: 6 }}>Jump to today</Text>
                </MenuOption>
                <MenuOption onSelect={() => { this.setState({ isSelectTimeRangeMenuVisible: true }) }} >
                  <Text style={{ padding: 6 }}>Select time range</Text>
                </MenuOption>
              </MenuOptions>
            )
        }
      </Menu>
    );
  }
}

export default TopRightMenuOption;