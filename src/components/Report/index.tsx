import * as React from "react";
import {
  View, Card, CardItem, Text, Icon
} from "native-base";

export interface Props {
}
export interface State { }

class Jar extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Card>
          <CardItem header>
            <Text>REPORT</Text>
          </CardItem>
          <CardItem>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon name='md-calendar' style={{ fontSize: 18, marginRight: 10 }} />
              <Text>Friday, April 6, 2017</Text>
            </View>
          </CardItem>
          <CardItem>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{ color: 'blue', fontSize: 25, fontWeight: '800' }}>15600</Text>
                  <Text style={{ color: 'gray' }}>TOTAL AVAILABLE</Text>
                </View>
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{ color: 'blue', fontSize: 25, fontWeight: '800' }}>500</Text>
                  <Text style={{ color: 'gray' }}>USE IN THIS MONTH</Text>
                </View>
              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default Jar;