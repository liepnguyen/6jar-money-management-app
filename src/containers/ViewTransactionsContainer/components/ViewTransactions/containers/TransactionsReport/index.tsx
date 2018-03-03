import { connect } from "react-redux";
import { makeGetTransactionsReport } from './selectors';

import TransactionsReport from '../../components/TransactionsReport';

const bindAction = (dispatch) => {
  return {
  };
}

const makeMapStateToProps = () => {
  const getTransactionsReport = makeGetTransactionsReport();
  const mapStateToProps = (state, props) => {
    return {
      report: getTransactionsReport(state, props),
    }
  }
  return mapStateToProps;
}

export default connect(makeMapStateToProps, bindAction)(TransactionsReport);