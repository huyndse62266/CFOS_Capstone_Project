import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import './OrderSuccess.scss';
import { isEmpty } from '../../../utils/helpers/helpers';
// import cancel from '../../../assets/Image/cancel.svg';
class OrderCancelFc extends Component {
  render() {
    const { listCancel } = this.props;
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
              border: '5px solid  #f3331d',
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
          <div>
            <b style={{ color: 'white' }}>{records.foodVM.foodName}</b>
          </div>
        ),
        key: 'foodName'
        // align: 'center'
      },
      {
        title: 'Nhà Hàng',
        dataIndex: 'storeName',
        render: (text, records) => (
          <div>
            <b style={{ color: 'white' }}>{records.storeVM.storeName}</b>
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
                src={records.storeVM.storeIcon}
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
              <span>{records.storeVM.storeNumber}</span>
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
    if (!isEmpty(listCancel)) {
      const total = listCancel.length;
      if (total <= 10) leftList = [...listCancel];
      else {
        listCancel.forEach((el, index) => {
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
      <>
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
        <div className="footer-container-cancel">
          <div
            style={{
              marginRight: '20px',
              color: 'black',
              backgroundColor: 'orange',
              width: 40,
              height: 40,
              textAlign: 'center',
              paddingTop: '10px',
              borderRadius: 5
            }}
          >
            <Icon style={{ fontSize: '20px' }} type="warning" />
          </div>
          <div>
            <b style={{ fontSize: '20px', fontWeight: '800' }}>
              Xin lỗi quý khách!
            </b>
            <br />
            Món ăn bị hủy vì lý do nhà hàng hết nguyên liệu ngoài ý muốn (Chúng
            tôi đã cập nhật lại menu)
            <br /> Xin quý khách vui lòng chọn lại món ăn khác
            <br />
            Chúng tôi xin lỗi vì sự bất tiện này!
          </div>
        </div>
      </>
    );
  }
}

export default OrderCancelFc;
