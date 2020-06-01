import React, { Component } from 'react';

import { Table, Icon, Tooltip } from 'antd';
import { isEmpty } from '../../../utils/helpers/helpers';
import NumberFormat from 'react-number-format';
class FoodOptionItem extends Component {
  render() {
    const { foodList } = this.props;

    const columns = [
      {
        title: 'Tên Tùy Chọn',
        dataIndex: 'foName',
        key: 'foName',
        align: 'center'
      },
      {
        title: 'Giá Tiền',
        dataIndex: 'optionPrice',
        render: text => (
          <span>
            <NumberFormat
              value={text}
              displayType={'text'}
              thousandSeparator={','}
            />
          </span>
        ),
        key: 'optionPrice',
        align: 'center'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, record) => (
          <Tooltip title="Update">
            <Icon
              type="edit"
              className="edit-icon"
              onClick={() => this.props.handleEdit(record)}
            />
          </Tooltip>
        ),
        align: 'center',
        key: 'action'
      }
    ];

    if (isEmpty(foodList)) return '';
    return (
      <Table
        dataSource={foodList}
        columns={columns}
        pagination={false}
        bordered
      />
    );
  }
}
export default FoodOptionItem;
