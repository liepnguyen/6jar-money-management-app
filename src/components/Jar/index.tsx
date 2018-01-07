import * as React from "react";
import { Image } from 'react-native';
import {
  View, Text, H3
} from "native-base";
import * as Progress from 'react-native-progress';

import styles from "./styles";

export interface Props {
  name: string,
  usedInThisMonth: number,
  incomePercentage: number,
  available: number
}
export interface State { }

class Jar extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: 'https://www.franchiseindia.com/uploads/content/edu/art/education-858cc07046.jpg' }} style={styles.cardImage} />
        <View style={styles.cardOverlay}>
          <View style={styles.cardOverlayContentContainer}>
            <View style={styles.cardOverlayContent}>
              <H3 style={{ color: 'white' }}>{this.props.name}</H3>
              <View style={styles.middleRowContent}>
                <View style={styles.twoRowsValueLabel}>
                  <Text style={{ color: 'white' }}>{this.props.incomePercentage}</Text>
                  <Text style={{ color: 'white' }}>% INCOME</Text>
                </View>
                <View style={styles.twoRowsValueLabel}>
                  <Text style={{ color: 'white' }}>{this.props.available}</Text>
                  <Text style={{ color: 'white' }}>AVAILABLE</Text>
                </View>
              </View>
              <View style={styles.bottomRowContent}>
                <View style={styles.inlineLabelValue}>
                  <Text style={{ color: 'white', fontSize: 12 }}>USED IN THIS MONTH</Text>
                  <Text style={{ color: 'white', fontSize: 12 }}>{this.props.usedInThisMonth}</Text>
                </View>
                <Progress.Bar progress={0.3} width={null} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Jar;