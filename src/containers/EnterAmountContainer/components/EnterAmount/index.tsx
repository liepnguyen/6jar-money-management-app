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
  Right
} from "native-base";

import styles from "./styles";

export interface Props {
  navigation: any;
}
export interface State {
}

class AddOrEditTransaction extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
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
          {/* <Right>
            <Button transparent>
              <Icon active name="md-more" />
            </Button>
          </Right> */}
        </Header>
        <Content>
        </Content>
      </Container>
    );
  }
}

export default AddOrEditTransaction;
