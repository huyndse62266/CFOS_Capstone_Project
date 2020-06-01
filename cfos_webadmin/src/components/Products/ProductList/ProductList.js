import React, { Component } from 'react';
// import ProductItems from '../ProductItem/ProductItems';

class ProductList extends Component {
  render() {
    return (
      <div className="card">
        <div className="d-flex flex-row-reverse input-group card-header col-md-12">
          <div className="d-flex flex-row-reverse col-md-4">
            <span className="input-group-btn">
              <button
                className="btn btn-default btn-fab btn-fab-mini btn-round"
                type="button"
              >
                <i className="material-icons">search</i>
              </button>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="card-body">
          <table className="table table-responsive-sm table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Đơn vị thức ăn</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {/* Gọi ProductItem thông qua thèn Product truyền qua các props children */}
              {this.props.children}
            </tbody>
          </table>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Prev
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductList;
