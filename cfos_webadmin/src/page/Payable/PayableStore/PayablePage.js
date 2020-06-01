import React, { Component } from 'react';
import { Table, Tooltip, Icon } from 'antd';
import PayableModal from './PayableModal';
import PayableTransactionModal from './PayableTransactionModal';
import { getListPayableStore } from './PayableService';
import { isEmpty } from '../../../utils/helpers/helpers';
import './Payable.scss';
import { MODE } from '../../../utils/constants/constants';
import NumberFormat from 'react-number-format';
class PayablePage extends Component {
  state = {
    visibleModal: false,
    transactionModal: false,
    mode: MODE.ADD,
    itemSelected: {},
    payableList: []
  };
  // Payable
  openModal = () => {
    this.setState({ visibleModal: true, mode: MODE.ADD, itemSelected: {} });
  };
  editModal = item => {
    this.setState({ visibleModal: true, mode: MODE.EDIT, itemSelected: item });
  };

  handleCancel = () => {
    this.setState({ visibleModal: false, mode: MODE.ADD, itemSelected: {} });
  };
  //Transaction
  openTransactionModal = () => {
    this.setState({ transactionModal: true, mode: MODE.ADD, itemSelected: {} });
  };
  editTransactionModal = item => {
    this.setState({
      transactionModal: true,
      mode: MODE.EDIT,
      itemSelected: item
    });
  };

  handleTransactionCancel = () => {
    this.setState({
      transactionModal: false,
      mode: MODE.ADD,
      itemSelected: {}
    });
  };

  componentDidMount() {
    this.fetchPayable();
  }
  fetchPayable = async () => {
    const res = await getListPayableStore();
    this.setState({ payableList: res.data });
  };
  render() {
    const {
      visibleModal,
      itemSelected,
      mode,
      payableList,
      transactionModal
    } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Tên Cửa Hàng',
        dataIndex: 'storeName',
        key: 'storeName',
        align: 'center'
      },
      {
        title: 'Tổng Công Nợ',
        dataIndex: 'payableRemain',
        render: text => (
          <span>
            <NumberFormat
              value={text}
              displayType={'text'}
              thousandSeparator={','}
            />
          </span>
        ),
        key: 'payableRemain',
        align: 'center'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, record) => (
          <div>
            <Tooltip title="Trả Tiền">
              <Icon
                type="dollar"
                className="edit-icon"
                style={{ color: 'orange', marginRight: '10px' }}
                onClick={() => this.editModal(record)}
              />
            </Tooltip>
            <Tooltip title="Lịch Sử Giao Dịch">
              <Icon
                type="history"
                className="edit-icon"
                onClick={() => this.editTransactionModal(record)}
              />
            </Tooltip>
          </div>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div style={{ paddingLeft: 260 }}>
        <div className="col-lg-12 header-page-container" />
        <div className="card-body store-container">
          <p className="header-table">Công Nợ Từng Cửa Hàng</p>
          <Table
            dataSource={!isEmpty(payableList) ? payableList : []}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
        {visibleModal && (
          <PayableModal
            visible={visibleModal}
            itemSelected={itemSelected}
            mode={mode}
            cancelModal={this.handleCancel}
            fetchData={this.fetchPayable}
          />
        )}
        {transactionModal && (
          <PayableTransactionModal
            visible={transactionModal}
            itemSelected={itemSelected}
            mode={mode}
            cancelModal={this.handleTransactionCancel}
            fetchDataTransaction={this.fetchPayable}
          />
        )}
      </div>
    );
  }
}
export default PayablePage;
