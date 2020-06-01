import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon } from 'antd';
import StoreModal from './StoreModal';
import { getListStore } from './StoreService';
import { isEmpty } from '../../../utils/helpers/helpers';
import './StorePage.scss';
import { MODE } from '../../../utils/constants/constants';

class StoreListPage extends Component {
  state = {
    visibleModal: false,
    mode: MODE.ADD,
    itemSelected: {},
    storeList: []
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
    const res = await getListStore();
    this.setState({ storeList: res.data });
  };
  render() {
    const { visibleModal, itemSelected, mode, storeList } = this.state;
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
        title: 'Ảnh',
        dataIndex: 'storeImage',
        render: (text, records) => (
          <img className="image" src={records.storeImage} alt="" />
        ),
        key: 'storeImage',
        align: 'center'
      },
      {
        title: 'Logo',
        dataIndex: 'storeIcon',
        render: (text, records) => (
          <img className="image" src={records.storeIcon} alt="" />
        ),
        key: 'storeIcon',
        align: 'center'
      },
      {
        title: 'Vị Trí',
        dataIndex: 'storeNumber',
        key: 'storeNumber',
        align: 'center'
      },
      {
        title: 'Mô Tả Cửa Hàng',
        dataIndex: 'storeDescription',
        key: 'storeDescription',
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'active',
        render: (text, record) => (
          <span>
            {record.active ? (
              <span style={{ color: '#1890ff' }}>Hoạt Động</span>
            ) : (
              <span style={{ color: 'red' }}>Ngưng Hoạt Động</span>
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
          <Tooltip title="Chỉnh Sửa Thông Tin Cửa Hàng">
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
      <div style={{ paddingLeft: 260 }}>
        <div className="col-lg-12 header-page-container">
          <Button
            type="primary"
            className="create-btn"
            onClick={this.openModal}
          >
            <Icon type="plus" />
            Tạo Mới Cửa Hàng
          </Button>
        </div>
        <div className="card-body store-container">
          <p className="header-table">Danh Sách Cửa Hàng</p>
          <Table
            dataSource={!isEmpty(storeList) ? storeList : []}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
        {visibleModal && (
          <StoreModal
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
export default StoreListPage;
