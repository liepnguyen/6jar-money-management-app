import * as React from "react";
import {
  View, Card, CardItem, Text, Icon
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

export interface Props {
}
export interface State { }

class Jar extends React.PureComponent<Props, State> {
  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>REPORT</Text>
          </CardItem>
          <CardItem>
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icon name='md-calendar' style={{ fontSize: 18 }} />
              <Text>Friday, April 6, 2017</Text>
            </Row>
          </CardItem>
          <CardItem>
            <Grid>
              <Row>
                <Col style={{ alignItems: 'center' }}>
                  <Row><Text style={{ color: 'blue', fontSize: 25, fontWeight: '800' }}>15600</Text></Row>
                  <Row><Text style={{ color: 'gray' }}>TOTAL AVAILABLE</Text></Row>
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Row><Text style={{ color: 'blue', fontSize: 25, fontWeight: '800' }}>500</Text></Row>
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