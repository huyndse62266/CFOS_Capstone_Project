import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import './OrderSuccess.scss';
import { isEmpty } from '../../../utils/helpers/helpers';
// import finish from '../../../assets/Image/finish.svg';
class OrderSuccesFc extends Component {
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
        title: 'Nhà Hàng',
        dataIndex: 'storeName',
        render: (text, records) => (
          <div>
            <b style={{ color: 'white' }}>{records.storeName}</b>
          </div>
        ),
        key: 'storeName',
        align: 'center'
      },
      {
        title: 'Hình Ảnh',
        dataIndex: 'storeImage',
        render: (text, records) => (
          <div style={{ display: 'flex' }}>
            <div>
              <img
                style={{
                  WebkitBorderRadius: '100px',
                  background: 'white',
                  border: '1px solid  #E1E1E1'
                }}
                width={50}
                height={50}
                alt="logo"
                src={records.storeIcon}
              />
            </div>
            <div
              style={{
                WebkitBorderRadius: '100px',
                width: '50px',
                height: '50px',
                marginLeft: '20px',
                textAlign: 'center',
                color: 'white',
                backgroundColor: '#FF5D25',
                fontWeight: '600',
                fontSize: '30px',
                paddingTop: '5px'
              }}
            >
              <span>{records.storeNumber}</span>
            </div>
          </div>
        ),
        key: 'storeImage',
        align: 'center'
      }
    ];
    let leftList = [];
    let rightList1 = [];
    let rightList2 = [];
    let rightList3 = [];
    if (!isEmpty(listSuccess)) {
      const temp = listSuccess;
      // const temp = listSuccess.reverse();
      const total = temp.length;
      if (total <= 10) leftList = [...temp];
      else {
        temp.forEach((el, index) => {
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

export default OrderSuccesFc;
