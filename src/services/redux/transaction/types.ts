export interface Transaction {
  id: string,
  name: string,
  type: string,
  createdDate: string,
  modifiedDate: string,
}

export interface State {
  rows: Array<Transaction>,
  deleted: Array<string>
}
