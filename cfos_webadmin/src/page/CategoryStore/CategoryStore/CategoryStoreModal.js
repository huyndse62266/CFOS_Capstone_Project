import React, { Component } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import {
  createCategoryStore,
  updateCategoryStore
} from './CategoryStoreService';
import { MODE } from '../../../utils/constants/constants';
class CategoryStoreModal extends Component {
  async componentDidMount() {}
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mode, itemSelected } = this.props;
        try {
          if (mode === MODE.ADD) {
            await createCategoryStore(values);
            message.success('Tạo mới thành công');
          } else {
            await updateCategoryStore({ ...itemSelected, ...values });
            message.success('Chỉnh sửa thành công');
          }
          this.props.cancelModal();
          this.props.fetchData();
        } catch (err) {}
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, mode, itemSelected } = this.props;
    const titleModal =
      mode === MODE.ADD
        ? 'Tạo Mới Danh Mục Thức Ăn'
        : 'Chỉnh Sửa Danh Mục Thức Ăn';
    return (
      <Modal
        title={titleModal}
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Tên Danh Mục</span>
              <Form.Item>
                {getFieldDecorator('categoryName', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.categoryName : '',
                  rules: [
                    { required: true, message: 'Chưa Nhập Tên Danh Mục!' }
                  ]
                })(<Input placeholder="Tên danh mục" />)}
              </Form.Item>
            </div>
          </div>
          {mode === MODE.EDIT && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Trạng Thái</span>
                <Form.Item>
                  {getFieldDecorator('active', {
                    initialValue: itemSelected.active
                  })(
                    <Radio.Group>
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>Inactive</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </div>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CategoryStoreModal);
