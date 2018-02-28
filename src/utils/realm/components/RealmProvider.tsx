import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

export interface Props {
  realm: any,
}

export interface State {}

export default class RealmProvider extends PureComponent<Props, State> {
  static childContextTypes = {
    realm: PropTypes.object,
  }

  getChildContext() {
    return {
      realm: this.props.realm,
    };
  }

  render() {
    return Children.only(this.props.children)
  }
}