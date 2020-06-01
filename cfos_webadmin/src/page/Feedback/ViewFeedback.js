import React, { Component } from 'react';
import { Table, Pagination } from 'antd';
import { isEmpty } from '../../utils/helpers/helpers';
import { getListFeedBack } from './FeedbackService';
import './Feedback.scss';
let pageNo = 0;
class ViewFeedback extends Component {
  state = {
    listFeedback: []
  };
  componentDidMount() {
    this.fecthFeedback();
  }
  fecthFeedback = async params => {
    try {
      const res = await getListFeedBack(params);
      this.setState({ listFeedback: res.data });
    } catch (err) {}
  };
  changePagination = (page, pageSize) => {
    pageNo = page - 1;
    this.fecthFeedback({ page: pageNo });
  };
  render() {
    const { listFeedback } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{pageNo * 5 + index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Ngày Feedback',
        dataIndex: 'fbDate',
        render: (text, record) => (
          <span>{new Date(record.fbDate).toLocaleDateString()}</span>
        ),
        key: 'fbDate',
        align: 'center'
      },

      {
        title: 'Món Ăn',
        dataIndex: 'foodName',
        render: (text, record) => <span>{record.foodVM.foodName}</span>,
        key: 'foodName',
        align: 'center'
      },
      {
        title: 'Nội Dung Feedback',
        dataIndex: 'fbContent',
        key: 'fbContent',
        align: 'center'
      }
    ];
    return (
      <div style={{ paddingLeft: 260 }}>
        <div className="card-body feedback-container">
          <p className="header-table">Feedback Món Ăn</p>
          <Table
            columns={columns}
            dataSource={listFeedback.content || []}
            pagination={false}
            bordered
          />
          {!isEmpty(listFeedback) && (
            <div className="pag-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={listFeedback.content ? listFeedback.totalElements : 0}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ViewFeedback;
