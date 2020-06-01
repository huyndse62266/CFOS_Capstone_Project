import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import './OrderSuccessStore.scss';
import { isEmpty } from '../../../utils/helpers/helpers';
class OrderSuccess extends Component {
  render() {
    const { listSuccess } = this.props;
    const columns = [
      {
        title: 'Số Order',
        dataIndex: 'orderNumber',
        render: (text, records) => (
          <span
            style={{
              color: 'white',
              borderRadius: '10px',
              padding: '5px 20px 5px 20px',
              border: '5px solid  #3caf1e',
              fontWeight: 800,
              fontSize: 36
            }}
          >
            {records.orderNumber}
          </span>
        ),
        key: 'orderNumber',
        align: 'center'
      },
      {
        title: 'Món Ăn',
        dataIndex: 'foodName',
        render: (text, records) => (
          <div
          // style={{
          //   whiteSpace: 'nowrap',
          //   width: '40px',
          //   overflow: 'hidden',
          //   textOverflow: 'ellipsis'
          // }}
          >
            <b style={{ color: 'white' }}>{records.foodVM.foodName}</b>
          </div>
        ),
        key: 'foodName'
        // align: 'center'
      }
      // {
      //   title: 'Nhà Hàng',
      //   dataIndex: 'storeName',
      //   render: (text, records) => (
      //     <div>
      //       <b style={{ color: 'white' }}>{records.storeVM.storeName}</b>
      //     </div>
      //   ),
      //   key: 'storeName',
      //   align: 'center'
      // },
      // {
      //   title: 'Hình Ảnh',
      //   dataIndex: 'storeIcon',
      //   render: (text, records) => (
      //     <div style={{ display: 'flex' }}>
      //       <div>
      //         <img
      //           style={{
      //             WebkitBorderRadius: '100px',
      //             background: 'white',
      //             border: '1px solid  #E1E1E1'
      //           }}
      //           width={50}
      //           height={50}
      //           alt="logo"
      //           src={records.storeVM.storeIcon}
      //         />
      //       </div>
      //       {/* <div
      //         style={{
      //           WebkitBorderRadius: '100px',
      //           width: '50px',
      //           height: '50px',
      //           marginLeft: '20px',
      //           textAlign: 'center',
      //           color: 'white',
      //           backgroundColor: '#FF5D25',
      //           fontWeight: '600',
      //           fontSize: '30px',
      //           paddingTop: '5px'
      //         }}
      //       >
      //         <span>{records.storeVM.storeNumber}</span>
      //       </div> */}
      //     </div>
      //   ),
      //   key: 'storeIcon',
      //   align: 'center'
      // }
    ];
    let leftList = [];
    let rightList1 = [];
    let rightList2 = [];
    let rightList3 = [];
    if (!isEmpty(listSuccess)) {
      const total = listSuccess.length;
      if (total <= 10) leftList = [...listSuccess];
      else {
        listSuccess.forEach((el, index) => {
          if (index < 10) {
            leftList.push(el);
          } else if (index < 20) {
            rightList1.push(el);
          } else if (index < 30) {
            rightList2.push(el);
          } else if (index < 40) {
            rightList3.push(el);
          }
        });
      }
    }
    return (
      <div>
        <div className="tab-content-container">
          <div
            className={`table-container ${
              isEmpty(rightList1)
                ? 'full-list'
                : isEmpty(rightList2)
                ? 'full-list-1'
                : isEmpty(rightList3)
                ? 'full-list-2'
                : ''
            }`}
          >
            <Table
              columns={columns}
              dataSource={leftList}
              pagination={false}
              rowClassName={(record, index) =>
                index % 2 === 0 ? 'row-custom' : ''
              }
            />
          </div>
          {!isEmpty(rightList1) && (
            <div
              className={`table-container ${
                isEmpty(rightList2)
                  ? 'full-list-1'
                  : isEmpty(rightList3)
                  ? 'full-list-2'
                  : ''
              }`}
            >
              <Table
                columns={columns}
                dataSource={rightList1}
                pagination={false}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'row-custom' : ''
                }
              />
            </div>
          )}
          {!isEmpty(rightList2) && (
            <div
              className={`table-container ${
                isEmpty(rightList3) ? 'full-list-2' : ''
              }`}
            >
              <Table
                columns={columns}
                dataSource={rightList2}
                pagination={false}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'row-custom' : ''
                }
              />
            </div>
          )}
          {!isEmpty(rightList3) && (
            <div className="table-container">
              <Table
                columns={columns}
                dataSource={rightList3}
                pagination={false}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'row-custom' : ''
                }
              />
            </div>
          )}
        </div>
        <div className="footer-container">
          <Icon
            type="warning"
            style={{ marginRight: '5px', color: 'orange' }}
          />
          <b>Lưu ý: </b>
          Món ăn sẽ bị hủy sau 1 tiếng nếu như không có người đến lấy (Tính từ
          khi được hoàn thành)
        </div>
      </div>
    );
  }
}

export default OrderSuccess;
