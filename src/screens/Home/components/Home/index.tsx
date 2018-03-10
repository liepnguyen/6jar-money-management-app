import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  View
} from "native-base";

import { translate } from '../../../../locales/i18n';
import styles from "./styles";
import Jar from "../../../../components/Jar";
import Report from "../../../../components/Report";
import Fab from "../../../../components/Fab";
import TopRightMenuOption from '../TopRightMenuOption';

export interface Props {
  navigation: any;
  jars: any;
  report: any
}

export interface State {
  active: boolean;
  isMenuVisible: boolean;
}

class Home extends React.PureComponent<Props, State> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: false,
      isMenuVisible: false,
    };
  }

  render() {
    const { navigation, report } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon active name="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title>6Jars Money</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => { this.setState({ isMenuVisible: true }) }}>
              <Icon active name="md-more" />
              <TopRightMenuOption
                isVisible={this.state.isMenuVisible}
                onBackdropPress={() => { this.setState({ isMenuVisible: false }) }}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <Report data={report} />
          <Card>
            <CardItem header>
              <Text>{translate('accounts_collection', { case: 'upperCase' })}</Text>
            </CardItem>
            <CardItem>
              <View style={{ flex: 1 }}>
                {this.props.jars.map((jar) => (
                  <Jar key={`jar-${jar.id}`} {...jar} />
                ))}
              </View>
            </CardItem>
          </Card>
          <View style={{ marginBottom: 100 }} />
        </Content>
        <Fab navigation={navigation} />
      </Container>
    );
  }
}

export default Home;
