import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon } from 'antd';
import ManageFCModal from './ManageFCModal';
import { getAllFoodCourt } from './ManageFCService';
import { isEmpty } from './../../../utils/helpers/helpers';
import './ManageFC.scss';
import { MODE } from './../../../utils/constants/constants';
class ManageFCPage extends Component {
  state = {
    visibleModal: false,
    mode: MODE.ADD,
    itemSelected: {},
    foodcourtList: []
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
    const res = await getAllFoodCourt();
    this.setState({ foodcourtList: res.data });
  };
  render() {
    const { visibleModal, itemSelected, mode, foodcourtList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
        key: 'no'
      },
      {
        title: 'Tên Food Court',
        dataIndex: 'fcName',
        key: 'fcName',
        align: 'center'
      },
      {
        title: 'Địa Điểm Food Court',
        dataIndex: 'fcLocation',
        key: 'fcLocation',
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
            Tạo Mới Food Court
          </Button>
        </div>
        <div className="card-body fc-container">
          <p className="header-table">Danh Sách Food Court</p>
          <Table
            dataSource={!isEmpty(foodcourtList) ? foodcourtList : []}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
        {visibleModal && (
          <ManageFCModal
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

export default ManageFCPage;
