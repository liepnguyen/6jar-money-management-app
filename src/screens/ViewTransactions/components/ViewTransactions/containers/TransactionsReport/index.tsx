import * as React from "react";
import { connect } from "react-redux";
import { makeGetTransactionsReport } from './selectors';

import TransactionsReport from '../../components/TransactionsReport';

export interface Props {
  report: any;
  from: number;
  to: number;
  onTransactionItemClicked: (transaction) => void;
}
export interface State {
}
class TransactionsReportContainer extends React.PureComponent<Props, State> {
  render() {
    const { report, from, to, onTransactionItemClicked } = this.props;
    return (
      <TransactionsReport
        report={report}
        from={from}
        to={to}
        onTransactionItemClicked={onTransactionItemClicked}
      />
    )
  }
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

export default connect(makeMapStateToProps)(TransactionsReportContainer);