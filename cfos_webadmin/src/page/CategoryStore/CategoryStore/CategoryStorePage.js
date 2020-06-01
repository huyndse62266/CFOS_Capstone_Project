import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon } from 'antd';
import CategoryStoreModal from './CategoryStoreModal';
import { getListCategoryStore } from './CategoryStoreService';
import { isEmpty } from '../../../utils/helpers/helpers';
import './CategoryPage.scss';
import { MODE } from '../../../utils/constants/constants';

class CategoryStorePage extends Component {
  state = {
    visibleModal: false,
    mode: MODE.ADD,
    itemSelected: {},
    categoryStoreList: []
  };
  openModal = () => {
    this.setState({ visibleModal: true, mode: MODE.ADD, itemSelected: {} });
  };
  editModal = item => {
    this.setState({ visibleModal: true, mode: MODE.EDIT, itemSelected: item });
  };

  handleCancel = () => {
    this.setState({ visibleModal: false, mode: MODE.ADD, itemSelected: {} });
  };

  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async () => {
    const res = await getListCategoryStore();
    this.setState({ categoryStoreList: res.data });
  };
  render() {
    const { visibleModal, itemSelected, mode, categoryStoreList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Tên Danh Mục',
        dataIndex: 'categoryName',
        key: 'categoryName',
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'active',
        render: (text, record) => (
          <span>
            {record.active ? (
              <span style={{ color: '#1890ff' }}>active</span>
            ) : (
              <span style={{ color: 'red' }}>inative</span>
            )}
          </span>
        ),
        align: 'center',
        key: 'active'
      },
      {
        title: 'Hành Động',
        dataIndex: 'action',
        render: (text, record) => (
          <Tooltip title="Update">
            <Icon
              type="edit"
              className="edit-icon"
              onClick={() => this.editModal(record)}
            />
          </Tooltip>
        ),
        align: 'center',
        key: 'action'
      }
    ];
    return (
      <div style={{ paddingLeft: '20%' }} className="category-store-container">
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h3>Quản Lý Danh Mục</h3>
        </div>
        <div className="col-lg-12 header-page-container">
          <Button
            type="primary"
            className="create-btn"
            onClick={this.openModal}
          >
            Tạo Mới Danh Mục
          </Button>
        </div>
        <div className="card-body">
          <Table
            dataSource={!isEmpty(categoryStoreList) ? categoryStoreList : []}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
        {visibleModal && (
          <CategoryStoreModal
            visible={visibleModal}
            itemSelected={itemSelected}
            mode={mode}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
      </div>
    );
  }
}
export default CategoryStorePage;
