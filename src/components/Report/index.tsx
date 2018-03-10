import * as React from "react";
import {
  View, Card, CardItem, Text, Icon
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import { upperFirst } from 'lodash';
import { formatCurrency } from '../../locales/i18n';

export interface Props {
  data: any
}
export interface State { }

class Jar extends React.PureComponent<Props, State> {
  static defaultProps = {
    data: {},
  }

  render() {
    const { totalAvailable, totalUsedInThisMonth } = this.props.data;
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>REPORT</Text>
          </CardItem>
          <CardItem>
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icon name='md-calendar' style={{ fontSize: 25, color: 'rgb(97,97,97)' }} />
              <Text style={{ color: 'rgb(97,97,97)' }}>{upperFirst(moment().format('dddd, LL'))}</Text>
            </Row>
          </CardItem>
          <CardItem>
            <Grid>
              <Row>
                <Col style={{ alignItems: 'center' }}>
                  <Row><Text style={{ color: 'rgb(33,150,243)', fontSize: 25, fontWeight: '800' }}>{formatCurrency(totalAvailable)}</Text></Row>
                  <Row><Text style={{ color: 'rgb(158,158,158)', fontSize: 15, fontWeight: '800' }}>TOTAL AVAILABLE</Text></Row>
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Row><Text style={{ color: 'rgb(33,150,243)', fontSize: 25, fontWeight: '800' }}>{formatCurrency(totalUsedInThisMonth)}</Text></Row>
                  <Row><Text style={{ color: 'rgb(158,158,158)', fontSize: 15, fontWeight: '800' }}>USE IN THIS MONTH</Text></Row>
                </Col>
              </Row>
            </Grid>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default Jar;