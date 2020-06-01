import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Chứa các item trong product
class ProductItems extends Component {
  render() {
    // Gọi thèn props ra và đặt các tên biến
    var { product, index } = this.props;
    var statusName = product.status ? 'Sẵn Sàng' : 'Hết Món';
    var statusClass = product.status ? 'success' : 'warning';
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{product.foodName}</td>
        <td>{product.foodImage}</td>
        <td>{product.foodUnit}</td>
        <td>{product.price}</td>
        <td>{product.foodDescription}</td>
        <td>{product.quantity}</td>
        <td>
          <span className={`btn btn-${statusClass} btn-sm`}>{statusName}</span>
        </td>
        <td className="td-actions ">
          <button
            type="button"
            rel="tooltip"
            className="btn btn-success"
            style={{ marginRight: '10px' }}
          >
            <i className="material-icons">edit</i>
          </button>
          <button type="button" rel="tooltip" className="btn btn-danger">
            <i className="material-icons">close</i>
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductItems;
