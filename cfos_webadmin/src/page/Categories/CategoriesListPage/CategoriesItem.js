import React, { Component } from 'react';
import { Table, Icon, Tooltip } from 'antd';
import { isEmpty } from '../../../utils/helpers/helpers';

class CategoriesItem extends Component {
  render() {
    const { categoryList } = this.props;

    const columns = [
      {
        title: 'Tên Danh Mục',
        dataIndex: 'categoryName',
        key: 'categoryName',
        align: 'center'
      },
      {
        title: 'Hình Ảnh',
        dataIndex: 'image',
        render: (text, records) => (
          <b>
            {!isEmpty(records.image) && (
              <img className="image" src={records.image} alt="" />
            )}
          </b>
        ),
        key: 'image',
        align: 'center'
      },
      // {
      //   title: 'Trạng Thái',
      //   dataIndex: 'active',
      //   render: (text, record) => (
      //     <span>
      //       {record.active ? (
      //         <span style={{ color: '#1890ff' }}>Còn Hàng</span>
      //       ) : (
      //         <span style={{ color: 'red' }}>Hết Hàng</span>
      //       )}
      //     </span>
      //   ),
      //   align: 'center',
      //   key: 'active'
      // },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, record) => (
          <Tooltip title="Chỉnh Sửa Danh Mục">
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

    if (isEmpty(categoryList)) return '';
    return (
      <Table
        dataSource={categoryList}
        columns={columns}
        pagination={false}
        bordered
      />
    );
  }
}
export default CategoriesItem;
