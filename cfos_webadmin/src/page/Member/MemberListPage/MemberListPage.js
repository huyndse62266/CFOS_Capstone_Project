import React, { Component } from 'react';
import { Button, Table, Input, Tooltip, Icon, Pagination, message } from 'antd';
import MemberModal from './MemberModal';
import DepositModal from './DepositModal';
import { getListMember, searchUser } from './MemberService';
import './Member.scss';
import { isEmpty } from '../../../utils/helpers/helpers';
import { MODE } from './../../../utils/constants/constants';
class MemberListPage extends Component {
  state = {
    visibleModal: false,
    mode: MODE.ADD,
    visibleDepositMember: false,
    itemSelected: {},
    memberList: {},
    isErr: false
  };
  // Create Member
  openModal = () =>
    this.setState({ visibleModal: true, mode: MODE.ADD, itemSelected: {} });
  // Edit member
  editModal = item => {
    this.setState({ visibleModal: true, mode: MODE.EDIT, itemSelected: item });
  };
  handleCancel = () =>
    this.setState({ visibleModal: false, mode: MODE.ADD, itemSelected: {} });
  // Deposit
  callDepositModal = item => {
    this.setState({ visibleDepositMember: true, itemSelected: item });
  };
  handleCancelDepositModal = () => {
    this.setState({ visibleDepositMember: false, itemSelected: {} });
  };

  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async params => {
    const res = await getListMember(params);
    this.setState({ memberList: res.data });
  };
  // handleUpdate = item => {
  //   Modal.confirm({
  //     title: 'Change Status ?',
  //     content: (
  //       <span>
  //         Bạn Muốn Thay Đổi Trạng Thái Từ&nbsp;
  //         <span style={{ color: '#1890ff' }}>
  //           {item.active ? 'Cho Phép' : 'Không Cho Phép'}
  //         </span>
  //         &nbsp; to&nbsp;
  //         <span style={{ color: 'red' }}>
  //           {item.active ? 'Không Cho Phép' : 'Cho Phép'}
  //         </span>
  //         ?
  //       </span>
  //     ),
  //     onOk: async () => {
  //       try {
  //         await updateStatusUser({ ...item, active: !item.active });
  //         this.fetchUser();
  //       } catch (err) {}
  //     },
  //     onCancel() {}
  //   });
  // };
  handleSearch = async value => {
    try {
      if (isEmpty(value.trim())) {
        this.fetchUser();
      } else {
        const res = await searchUser({ name: value });
        this.setState({ memberList: res.data });
      }
    } catch (err) {
      this.setState({ isErr: true });
      message.warning('Không tìm thấy kết quả!');
    }
  };
  changePagination = (page, pageSize) => {
    this.fetchUser({ page: page - 1 });
  };
  render() {
    const {
      visibleModal,
      memberList,
      visibleDepositMember,
      itemSelected,
      mode
    } = this.state;
    const columns = [
      {
        title: 'STT',
        dataIndex: 'no',
        align: 'center',
        render: (text, record, index) => (
          <span>{memberList.number * 5 + index + 1}</span>
        ),
        key: 'no'
      },
      {
        title: 'Tên',
        dataIndex: 'fullname',
        key: 'fullname',
        align: 'center'
      },
      {
        title: 'Mã Thẻ',
        dataIndex: 'cardId',
        key: 'cardId',
        align: 'center'
      },
      {
        title: 'Địa Chỉ',
        dataIndex: 'address',
        key: 'address'
      },
      // {
      //   title: 'Ngày Sinh',
      //   dataIndex: 'birthday',
      //   render: (text, record) => (
      //     <div>
      //       {record.birthday && (
      //         <span>{new Date(record.birthday).toLocaleDateString()}</span>
      //       )}
      //       {isEmpty(record.birthday) && record.birthday === '' && (
      //         <span>{new Date(record.birthday).toLocaleDateString()}</span>
      //       )}
      //     </div>
      //   ),
      //   key: 'birthday',
      //   align: 'center'
      // },
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
          <div>
            <span style={{ marginRight: '5px' }}>
              <Tooltip title="Chỉnh sửa thành viên">
                <Icon
                  type="edit"
                  className="edit-icon"
                  onClick={() => this.editModal(record)}
                />
              </Tooltip>
            </span>
            &nbsp;
            {/* {!isEmpty(memberList) &&
              memberList.content.map(el => ( */}
            <Tooltip title="Nộp Tiền">
              <Icon
                type="dollar"
                className="deposit-icon"
                onClick={e => {
                  this.callDepositModal(record);
                }}
              />
            </Tooltip>
            {/* ))} */}
          </div>
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
            Tạo Mới Thành Viên
          </Button>
          <Input.Search
            placeholder="Tìm Tên Khách Hàng Hoặc Mã Thẻ"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>

        <div className="card-body member-container">
          <p className="header-table">Danh Sách Thành Viên</p>
          <Table
            dataSource={memberList.content || []}
            columns={columns}
            bordered
            pagination={false}
          />
          {!isEmpty(memberList) && (
            <div className="pag-container">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={this.changePagination}
                total={memberList.content ? memberList.totalElements : 0}
              />
            </div>
          )}
        </div>

        {visibleModal && (
          <MemberModal
            visible={visibleModal}
            itemSelected={itemSelected}
            mode={mode}
            cancelModal={this.handleCancel}
            fetchData={this.fetchUser}
          />
        )}
        {visibleDepositMember && (
          <DepositModal
            visible={visibleDepositMember}
            itemSelected={itemSelected}
            cancelDepositModal={this.handleCancelDepositModal}
          />
        )}
      </div>
    );
  }
}
export default MemberListPage;
