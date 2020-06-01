import React, { Component } from 'react';
import {
  Button,
  Table,
  Input,
  Tooltip,
  Icon,
  Modal,
  Pagination,
  message
} from 'antd';
import FoodCourtModal from './FoodCourtModal';
import { getListUser, updateStatusUser, searchUser } from './FoodCourtService';
import './FoodCourt.scss';
import { isEmpty } from '../../../utils/helpers/helpers';

class CreateFoodCourt extends Component {
  state = {
    visibleModal: false,
    roleList: [],
    userList: {},
    isErr: false
  };
  openModal = () => this.setState({ visibleModal: true });
  handleCancel = () => this.setState({ visibleModal: false });
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async params => {
    const res = await getListUser(params);
    this.setState({ userList: res.data });
  };
  handleUpdate = item => {
    Modal.confirm({
      title: 'Cấp Quyền ?',
      content: (
        <span>
          Bạn Muốn Thay Đổi Trạng Thái Từ&nbsp;
          <span style={{ color: '#1890ff' }}>
            {item.active ? 'Cho Phép' : 'Không Cho Phép'}
          </span>
          &nbsp; Sang&nbsp;
          <span style={{ color: 'red' }}>
            {item.active ? 'Không Cho Phép' : 'Cho Phép'}
          </span>
          ?
        </span>
      ),
      onOk: async () => {
        try {
          await updateStatusUser({ ...item, active: !item.active });
          this.fetchUser();
        } catch (err) {}
      },
      onCancel() {}
    });
  };
  handleSearch = async value => {
    try {
      if (isEmpty(value.trim())) {
        this.fetchUser();
      } else {
        const res = await searchUser({ name: value });
        this.setState({ userList: res.data });
      }
    } catch (err) {
      this.setState({ isErr: true });
      message.warning('No matched');
    }
  };
  changePagination = (page, pageSize) => {
    this.fetchUser({ page: page - 1 });
  };
  render() {
    const { visibleModal, userList } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => (
          <span>{userList.number * 5 + index + 1}</span>
        ),
        key: 'no'
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
      },
      {
        title: 'Họ Và Tên',
        dataIndex: 'fullname',
        key: 'fullname',
        align: 'center'
      },
      {
        title: 'Địa Chỉ',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Ngày Sinh',
        dataIndex: 'birthday',
        render: text => (
          <div>
            {text && <span>{new Date(text).toLocaleDateString()}</span>}
            {isEmpty(text) && text === '' && (
              <span>{new Date(text).toLocaleDateString()}</span>
            )}
          </div>
        ),
        key: 'birthday'
      },
      {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'center'
      },
      {
        title: 'Vai Trò',
        dataIndex: 'roleId',
        key: 'roleId',
        render: (text, record) => (
          <span>{record.roleId === 2 && 'Quản Lý Food Court'}</span>
        ),
        align: 'center'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'active',
        render: (text, record) => (
          <span>
            {record.active ? (
              <span style={{ color: '#1890ff' }}>Cho Phép Truy Cập</span>
            ) : (
              <span style={{ color: 'red' }}>Không Cho Phép Truy Cập</span>
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
          <span>
            {record.active ? (
              <Tooltip title="Chỉnh Sửa Trạng Thái">
                <Icon
                  type="unlock"
                  className="edit-icon"
                  onClick={() => this.handleUpdate(record)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Update">
                <Icon
                  type="lock"
                  style={{ color: 'red' }}
                  className="edit-icon"
                  onClick={() => this.handleUpdate(record)}
                />
              </Tooltip>
            )}
          </span>
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
            Tạo Mới Account
          </Button>

          <Input.Search
            placeholder="Tìm Kiếm Thành Viên"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <div className="card-body fc-member-container">
          <p className="header-table">
            Danh Sách Thành Viên Quản Lý Food Court
          </p>
          <Table
            dataSource={userList.content || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(userList) && (
            <div className="pag-fcm-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={userList.content ? userList.totalElements : 0}
              />
            </div>
          )}
        </div>
        {visibleModal && (
          <FoodCourtModal
            visible={visibleModal}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
      </div>
    );
  }
}
export default CreateFoodCourt;
