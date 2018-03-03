import * as React from "react";
import Modal from "react-native-modal";
import {
  Card,
  CardItem,
  Text,
  Body,
  Content,
  Right,
} from 'native-base';
import {
  View,
  ScrollView
} from 'react-native';

import styles from './styles';

export interface Props {
  isVisible: boolean;
}
export interface State {
}
class SelectTimeRangeModal extends React.PureComponent<Props, State> {
  static defaultProps = {
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <View style={styles.modalContent}>
          <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
            
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default SelectTimeRangeModal;