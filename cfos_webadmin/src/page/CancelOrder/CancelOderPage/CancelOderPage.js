import React, { Component } from 'react';

class CancelOderPage extends Component {
  render() {
    return (
      <div style={{ paddingLeft: '20%', paddingTop: '5%' }}>
        <div className="col-lg-10">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-align-justify" /> Order Cancel Table
            </div>
            <div className="card-body">
              <table className="table table-responsive-sm table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Ảnh</th>
                    <th>Loại Thức Ăn</th>
                    <th>Giá</th>
                    <th>Mô tả</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Yiorgos Avraamu</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>
                      <span className="badge badge-success">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Avram Tarasios</td>
                    <td>2012/02/01</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>
                      <span className="badge badge-danger">Banned</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Quintin Ed</td>
                    <td>2012/02/01</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>
                      <span className="badge badge-secondary">Inactive</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Enéas Kwadwo</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>
                      <span className="badge badge-warning">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Agapetus Tadeáš</td>
                    <td>2012/01/21</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>Member</td>
                    <td>
                      <span className="badge badge-success">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CancelOderPage;
