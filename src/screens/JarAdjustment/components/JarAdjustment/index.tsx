import * as React from "react";
import {
  Container, Header, Title, Content, Button, Icon, List, ListItem, Thumbnail,
  Left, Right, Body, Form, View, Item, Input, Row, Col, Text, Radio, IconNB, Label,
  Card, CardItem, Grid,
} from "native-base";
import UIStepper from 'react-native-ui-stepper';
import { sumBy } from 'lodash';
import { translate, formatCurrency } from '../../../../locales/i18n';
import { loadIcon } from '../../../../resources';
import styles from './styles';

export interface Props {
  jars: Array<any>;
  onJarIncomePercentageChanged: (jarId: string, newIncomePercentage: number) => void;
}
export interface State {
}
export default class JarAdjustment extends React.PureComponent<Props, State> {
  static defaultProps = {
    jars: [],
  }

  constructor(props, context) {
    super(props, context);
    this.balanceIncomePercentage = this.getBalanceIncomePercentage(this.props.jars);
  }

  balanceIncomePercentage = 0;

  componentWillReceiveProps(nextProps) {
    const { jars } = this.props;
    const { jars: nextJars } = nextProps;
    if (jars !== nextJars) {
      this.balanceIncomePercentage = this.getBalanceIncomePercentage(nextJars);
    }
  }

  getBalanceIncomePercentage = (jars) => {
    return 100 - sumBy(jars, 'incomePercentage');
  }

  renderJar = (jar) => {
    const { onJarIncomePercentageChanged, jars } = this.props;
    return (
      <Card key={`jar-${jar.id}`}>
        <CardItem>
          <Left>
            <Thumbnail small source={loadIcon(jar.icon)} />
            <Body>
              <Text>{translate(`jar.${jar.name}`)}</Text>
              <Text note>{translate('available')} {formatCurrency(jar.available)}</Text>
            </Body>
          </Left>
          <Right>
            <Item rounded style={{ width: 100 }}>
              <UIStepper
                borderRadius={30}
                width={98}
                minimumValue={0}
                maximumValue={jar.incomePercentage + this.balanceIncomePercentage}
                initialValue={jar.incomePercentage}
                value={jar.incomePercentage}
                height={35}
                displayValue
                onValueChange={(value) => {
                  onJarIncomePercentageChanged(jar.id, value);
                }}
              />
            </Item>
          </Right>
        </CardItem>
      </Card>
    )
  }

  render() {
    const { jars } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Jar Adjustment</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Grid>
                <Row>
                  <Col style={{ alignItems: 'center' }}>
                    <Row><Text style={{ color: this.balanceIncomePercentage > 0 ? 'rgb(244,67,54)' : 'rgb(33,150,243)', fontSize: 25, fontWeight: '800' }}>{this.balanceIncomePercentage}</Text></Row>
                    <Row><Text style={{ color: 'rgb(158,158,158)', fontSize: 15, fontWeight: '800' }}>BALANCE</Text></Row>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>
          {jars.map(this.renderJar)}
        </Content>
      </Container>
    );
  }
}