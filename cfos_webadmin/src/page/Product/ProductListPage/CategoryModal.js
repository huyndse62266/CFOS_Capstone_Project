import React, { Component } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import { createCategoryStore, updateCategoryStore } from './CateFoodService';
import { MODE } from '../../../utils/constants/constants';

class CategoryModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { categoryModal } = this.props;
          if (categoryModal.mode === MODE.ADD) {
            await createCategoryStore({
              ...values,
              categoryVM: [],
              active: true
            });
            message.success('Tạo Mới Thành Công !');
          } else {
            await updateCategoryStore({ ...categoryModal.item, ...values });
            message.success('Chỉnh Sửa Thành Công !');
          }
          this.props.cancelModal();
          this.props.fetchData();
        } catch (err) {
          this.setState({ isErr: true });
        }
      }
    });
  };
  render() {
    const { isErr } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { categoryModal } = this.props;
    const titleModal =
      categoryModal.mode === MODE.ADD
        ? 'Tạo Mới Danh Mục'
        : 'Chỉnh Sửa Danh Mục';
    return (
      <Modal
        title={titleModal}
        centered
        visible={categoryModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Danh Mục Món Ăn</span>
              <Form.Item>
                {getFieldDecorator('categoryName', {
                  initialValue:
                    categoryModal.mode === MODE.EDIT
                      ? categoryModal.item.categoryName
                      : '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1-100 ký tự'
                    }
                  ]
                })(<Input placeholder="Tên danh mục" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          {categoryModal.mode === MODE.EDIT && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Trạng Thái</span>
                <Form.Item>
                  {getFieldDecorator('active', {
                    initialValue: categoryModal.item.active
                  })(
                    <Radio.Group>
                      <Radio value={true}>Hiện</Radio>
                      <Radio value={false}>Ẩn</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </div>
          )}
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Danh Mục đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CategoryModal);
