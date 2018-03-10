import * as React from "react";
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Text,
  View,
  Right
} from "native-base";
import { Grid, Row, Col } from 'react-native-easy-grid';

import { CALC_KEY } from '../../constants';
import styles from "./styles";

export interface Props {
  navigation: any;
  displayText: string;
  onButtonPress: Function,
  hasFinalResult: boolean,
  onOkButtonPress: Function,
}
export interface State {
}
const ANdROID_RIPPLE_COLOR = '#BDBDBD';
export default class EnterAmount extends React.PureComponent<Props, State> {
  constructor(props, context) {
    super(props, context);
  }

  handleButtonPress = (buttonType) => {
    this.props.onButtonPress(buttonType);
  }

  handleOkButtonPress = () => {
    this.props.onOkButtonPress();
  }

  render() {
    const { displayText, hasFinalResult } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Enter Amount</Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }}>
          <Grid>
            <Row style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 30, padding: 10 }}>{displayText}</Text>
            </Row>
            <Row style={{ height: 250 }}>
              <Grid>
                <Row style={styles.rowButtons}>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={[styles.button, styles.buttonGrey]} onPress={() => { this.handleButtonPress(CALC_KEY.Clear) }}>
                    <Text style={styles.buttonText}>C</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={[styles.button, styles.buttonGrey]} onPress={() => { this.handleButtonPress(CALC_KEY.Divide) }}>
                    <Text style={styles.buttonText}>÷</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={[styles.button, styles.buttonGrey]} onPress={() => { this.handleButtonPress(CALC_KEY.Multiply) }}>
                    <Text style={styles.buttonText}>×</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={[styles.button, styles.buttonGrey]} onPress={() => { this.handleButtonPress(CALC_KEY.Del) }}>
                    <Text style={styles.buttonText}>⌫</Text>
                  </Button>
                </Row>
                <Row style={styles.rowButtons}>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Seven) }}>
                    <Text style={styles.buttonText}>7</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Eight) }}>
                    <Text style={styles.buttonText}>8</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Nine) }}>
                    <Text style={styles.buttonText}>9</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Minus) }}>
                    <Text style={styles.buttonText}>-</Text>
                  </Button>
                </Row>
                <Row style={styles.rowButtons}>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Four) }}>
                    <Text style={styles.buttonText}>4</Text></Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Five) }}>
                    <Text style={styles.buttonText}>5</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Six) }}>
                    <Text style={styles.buttonText}>6</Text>
                  </Button>
                  <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Plus) }}>
                    <Text style={styles.buttonText}>+</Text>
                  </Button>
                </Row>
                <Row style={styles.rowButtons}>
                  <Col size={3}>
                    <Row style={styles.rowButtons}>
                      <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.One) }}>
                        <Text style={styles.buttonText}>1</Text>
                      </Button>
                      <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Two) }}>
                        <Text style={styles.buttonText}>2</Text>
                      </Button>
                      <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Three) }}>
                        <Text style={styles.buttonText}>3</Text>
                      </Button>
                    </Row>
                    <Row style={styles.rowButtons}>
                      <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Zero) }}>
                        <Text style={styles.buttonText}>0</Text>
                      </Button>
                      <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.TripleZero) }}>
                        <Text style={styles.buttonText}>000</Text>
                      </Button>
                      <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={styles.button} onPress={() => { this.handleButtonPress(CALC_KEY.Dot) }}>
                        <Text style={styles.buttonText}>.</Text>
                      </Button>
                    </Row>
                  </Col>
                  <Col size={1}>
                    <Row style={styles.rowButtons}>
                      {
                        !hasFinalResult ?
                          (
                            <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={[styles.button, styles.buttonEqual]} onPress={() => { this.handleButtonPress(CALC_KEY.Equal) }}>
                              <Text style={[styles.buttonText, styles.buttonTextWhite]}>=</Text>
                            </Button>
                          ) :
                          (
                            <Button androidRippleColor={ANdROID_RIPPLE_COLOR} style={[styles.button, styles.buttonOk]} onPress={() => { this.handleOkButtonPress() }}>
                              <Text style={[styles.buttonText, styles.buttonTextWhite]}>✓</Text>
                            </Button>
                          )
                      }
                    </Row>
                  </Col>
                </Row>
              </Grid>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}
