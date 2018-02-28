import * as React from "react";
import { Image } from 'react-native';
import {
  View, Text, H3
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Progress from 'react-native-progress';

import I18n, { formatCurrency, translate } from '../../locales/i18n';
import styles from "./styles";
import { loadImage } from '../../resources';

export interface Props {
  name: string,
  usedInThisMonth: number,
  incomePercentage: number,
  available: number,
  avatar: string,
}
export interface State { }

class Jar extends React.PureComponent<Props, State> {
  render() {
    const { name, available, usedInThisMonth, avatar } = this.props;
    const usedInThisMonthInPercentage = (available + usedInThisMonth) !== 0
      ? usedInThisMonth / (available + usedInThisMonth): 0;
    return (
      <View style={styles.cardImageContainer}>
        <Image source={loadImage(avatar)} style={styles.cardImage} />
        <View style={styles.cardOverlay}>
          <View style={styles.cardOverlayContentContainer}>
            <View style={styles.cardOverlayContent}>
              <Grid style={{ justifyContent: 'space-between' }}>
                <Row>
                  <H3 style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{translate(`jar.${name}`, { case: 'upperCase' })}</H3>
                </Row>
                <Row style={{ marginBottom: 'auto' }}>
                  <Col style={{ alignItems: 'center' }}>
                    <Row><Text style={{ color: 'white' }}>{this.props.incomePercentage}</Text></Row>
                    <Row><Text style={{ color: 'white' }}>% INCOME</Text></Row>
                  </Col>
                  <Col style={{ alignItems: 'center' }}>
                    <Row><Text style={{ color: 'white' }}>{formatCurrency(available)}</Text></Row>
                    <Row><Text style={{ color: 'white' }}>AVAILABLE</Text></Row>
                  </Col>
                </Row>
                <Row style={{ alignItems: 'flex-end' }}>
                  <Grid style={{ height: 30 }}>
                    <Row>
                      <Col><Text style={{ color: 'white', fontSize: 12 }}>USED IN THIS MONTH</Text></Col>
                      <Col style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>{formatCurrency(usedInThisMonth)}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col><Progress.Bar progress={usedInThisMonthInPercentage} width={null} /></Col>
                    </Row>
                  </Grid>
                </Row>
              </Grid>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Jar;