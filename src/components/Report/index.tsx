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
              <Icon name='md-calendar' style={{ fontSize: 18 }} />
              <Text>{upperFirst(moment().format('dddd, LL'))}</Text>
            </Row>
          </CardItem>
          <CardItem>
            <Grid>
              <Row>
                <Col style={{ alignItems: 'center' }}>
                  <Row><Text style={{ color: 'blue', fontSize: 25, fontWeight: '800' }}>{formatCurrency(totalAvailable)}</Text></Row>
                  <Row><Text style={{ color: 'gray' }}>TOTAL AVAILABLE</Text></Row>
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Row><Text style={{ color: 'blue', fontSize: 25, fontWeight: '800' }}>{formatCurrency(totalUsedInThisMonth)}</Text></Row>
                  <Row><Text style={{ color: 'gray' }}>USE IN THIS MONTH</Text></Row>
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