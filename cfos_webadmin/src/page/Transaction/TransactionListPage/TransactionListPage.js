import React, { Component } from 'react';
import { Table, Input, Select, Pagination, message } from 'antd';
import { getListTransaction } from './TransactionService';
import { isEmpty } from '../../../utils/helpers/helpers';
import './Transaction.scss';
import NumberFormat from 'react-number-format';

let pageNo = 0;
class TransactionListPage extends Component {
  state = {
    tracsactionList: [],
    abc: 'DEPOSIT',
    status: '',
    isErr: false
  };

  componentDidMount() {
    this.fetchTransaction();
  }
  fetchTransaction = async params => {
    try {
      const res = await getListTransaction(params);
      this.setState({ tracsactionList: res.data });
    } catch (err) {
      this.setState({ isErr: true });
      message.warning('Chọn loại giao dịch!');
    }
  };
  handleChange = value => {
    this.setState({ status: value });
    this.fetchTransaction({ status: value });
  };
  // handleSelect = value => {
  //   const a = this.state.abc;
  //   this.setState({ a: value });
  //   console.log('a', a);
  // };
  changePagination = (page, pageSize) => {
    pageNo = page - 1;
    this.fetchTransaction({ page: pageNo, status: this.state.status });
  };
  handleSearch = async value => {
    const { status } = this.state;
    try {
      if (isEmpty(value.trim())) {
        this.fetchTransaction({ status: status });
      } else {
        const res = await getListTransaction({
          trandId: value,
          status: status
        });
        this.setState({ tracsactionList: res.data });
      }
    } catch (err) {
      this.setState({ isErr: true });
      message.warning('Không tìm thấy kết quả!');
    }

    // const res = await searchTransaction({ tranId: value });
    // this.setState({ tracsactionList: res.data });
    // console.log('tracsactionListSearch', res.data);
    // console.log('id', value);
  };
  render() {
    const { tracsactionList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{pageNo * 5 + index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Mã Giao Dịch',
        dataIndex: 'tranId',
        key: 'tranId',
        align: 'center'
      },
      {
        title: 'Ngày Giao Dịch',
        dataIndex: 'tranDate',
        render: (text, record) => (
          <span>{new Date(record.tranDate).toLocaleDateString()}</span>
        ),
        key: 'tranDate',
        align: 'center'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'tranTotal',
        render: text => (
          <span>
            <NumberFormat
              value={text}
              displayType={'text'}
              thousandSeparator={','}
            />
          </span>
        ),
        key: 'tranTotal',
        align: 'center'
      },
      {
        title: 'Loại Giao Dịch',
        dataIndex: 'status',
        render: (text, record) => (
          <span>
            {record.status === 'DEPOSIT' ? (
              <span style={{ color: 'green' }}>Nộp Tiền</span>
            ) : (
              <span style={{ color: 'red' }}>Hoàn Tiền</span>
            )}
          </span>
        ),
        align: 'center',
        key: 'status'
      }
    ];
    return (
      <div style={{ paddingLeft: 260 }}>
        <div className="col-lg-12 header-page-container-transaction">
          <Select
            placeholder={'--- Chọn Loại Giao Dịch ---'}
            // style={{ width: 200 }}
            className="select-btn"
            onChange={this.handleChange}
            // onSelect={this.handleSelect}
          >
            <Select.Option value="DEPOSIT">Nộp Tiền</Select.Option>
            <Select.Option value="ROLLBACK">
              Trả Lại Tiền Thành Viên
            </Select.Option>
            <Select.Option value="ROLLBACKGUEST">
              Trả Lại Tiền Khách Vãn Lai
            </Select.Option>
          </Select>
          <Input.Search
            placeholder="Tìm Mã Giao Dịch"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <div className="card-body transaction-container">
          <p className="header-table">Lịch Sử Giao Dịch</p>
          <Table
            dataSource={tracsactionList.content || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(tracsactionList) && (
            <div className="pag-container-trans">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={
                  tracsactionList.content ? tracsactionList.totalElements : 0
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default TransactionListPage;
