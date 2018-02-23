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

import I18n from '../../../../locales/i18n';
import styles from "./styles";
import Jar from "../../../../components/Jar";
import Report from "../../../../components/Report";
import Fab from "../../../../components/Fab";

export interface Props {
  navigation: any;
  jars: any;
}

export interface State {
  active: boolean
}

class Home extends React.PureComponent<Props, State> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: false
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="md-menu"
                onPress={() => navigation.navigate("DrawerOpen")}
              />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon active name="md-more" onPress={() => navigation.navigate('AddOrEditTransaction', { mode: 'add' })} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Report />
          <Card>
            <CardItem header>
              <Text>JARS COLLECTION</Text>
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
