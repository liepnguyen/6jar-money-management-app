import * as React from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Tabs,
  Tab,
} from "native-base";
import { noop, cloneDeep } from 'lodash';

import I18n from '../../../../../../locales/i18n';
import styles from "./styles";

export interface Props {
  navigation: any;
  jars: Array<any>,
  onJarSelected: Function,
}

export interface State {
}

class SelectJar extends React.PureComponent<Props, State> {
  static defaultProps = {
    jars: [],
    onJarSelected: noop,
  }

  constructor(props, context) {
    super(props, context);
  }

  handlJarSelected = (selectedJar) => {
    this.props.onJarSelected(cloneDeep(selectedJar));
    this.props.navigation.goBack();
  }

  renderJarItem = (jar) => {
    return (
      <ListItem avatar key={`jar-${jar.id}`} onPress={() => { this.handlJarSelected(jar) }}>
        <Left>
          {/* <Thumbnail small source={restaurantIcon} /> */}
        </Left>
        <Body style={{ alignItems: 'flex-start' }}>
          <Text>{I18n.t(`jar.${jar.name}`)}</Text>
        </Body>
      </ListItem>
    )
  }

  render() {
    const { navigation, jars } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Select Jar</Title>
          </Body>
        </Header>
        <Content>
          <List>
            {jars.map(this.renderJarItem)}
          </List>
        </Content>
      </Container>
    );
  }
}

export default SelectJar;
