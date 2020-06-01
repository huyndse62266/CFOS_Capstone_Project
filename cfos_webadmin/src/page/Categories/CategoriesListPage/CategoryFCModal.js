import React, { Component } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import { createCategoryFc, updateCategoryFc } from './CategoryService';
import { MODE } from '../../../utils/constants/constants';

class CategoryFCModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { categoryModal } = this.props;
          if (categoryModal.mode === MODE.ADD) {
            await createCategoryFc({ ...values, active: true });
            message.success('Tạo mới thành công');
          } else {
            console.log('edit', { ...categoryModal.item, ...values }, values);
            // await updateCategoryFc({ ...categoryModal.item, ...values });
            await updateCategoryFc({
              ...values,
              categoryId: categoryModal.item.fcCategoryId
            });
            message.success('Chỉnh sửa thành công');
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
        ? 'Tạo Mới Danh Mục Food Court'
        : 'Chỉnh Sửa Danh Mục Food Court';
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
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Food Court</span>
              <Form.Item>
                {getFieldDecorator('categoryName', {
                  initialValue:
                    categoryModal.mode === MODE.EDIT
                      ? categoryModal.item.fcCategoryName
                      : '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1 - 100 kí tự!'
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
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>Inactive</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </div>
          )}
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Tên danh mục đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CategoryFCModal);
