import * as React from "react";
import PropTypes from 'prop-types';

export default (registerRealmObjects, mapQueriesToProps) => {
  return (WrappedComponent) => {
    return class extends React.PureComponent {
      static contextTypes = {
        realm: PropTypes.object
      }

      realmSchemes;
      realmCollections;
      realm;

      constructor(props, context) {
        super(props, context);
        this.realm = context.realm;
        this.realmSchemes = registerRealmObjects() || [];
        this.realmCollections = this.realmSchemes.map((schema) => { return this.realm.objects(schema); });
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...mapQueriesToProps(this.realmCollections)}
          />
        )
      }

      componentDidMount() {
        this.realmSchemes.forEach((schema) => {
          this.realm.objects(schema).addListener(this.handleChange);
        });
      }

      componentWillUnmount() {
        this.realmSchemes.forEach((schema) => {
          this.realm.objects(schema).removeListener(this.handleChange);
        });
      }

      handleChange = () => {
        this.forceUpdate();
      }
    }
  }
}