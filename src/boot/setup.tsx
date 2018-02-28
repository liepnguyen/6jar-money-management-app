import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore from "./configureStore";
import configureRealm from "./configureRealm";
import { RealmProvider } from '../utils/realm';
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/material";
import storage from '../storage';
export interface Props {}
export interface State {
  store: Store<{}>;
  isLoading: boolean;
  realm?: any;
}
export default class Setup extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
    
    storage.setRealmInstance(configureRealm(this.state.store));
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <RealmProvider realm={storage.getRealmInstance()}>
            <App />
          </RealmProvider>
        </Provider>
      </StyleProvider>
    );
  }
}
