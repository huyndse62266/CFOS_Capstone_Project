import React, { Component } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import { createFoodOption, updateFoodOption } from './FoodOptionService';
import { MODE } from '../../../utils/constants/constants';

class FoodOptionModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { parent, mode } = this.props.subFoodOptionModal;
          const { subFoodOptionModal } = this.props;
          if (mode === MODE.ADD) {
            // implemenet add function
            await createFoodOption({
              ...values,
              foodOptionParent: parent.foodOptionParentId
            });
            message.success('Tạo Mới Thành Công!');
          } else {
            await updateFoodOption({
              ...values,
              foId: subFoodOptionModal.item.foId
            });
            message.success('Chỉnh Sửa Thành Công!');
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
    const { subFoodOptionModal } = this.props;
    const titleModal =
      subFoodOptionModal.mode === MODE.ADD
        ? 'Tạo Mới Tùy Chọn Món Ăn'
        : 'Chỉnh Sửa Tùy Chọn Món Ăn';
    return (
      <Modal
        title={titleModal}
        centered
        visible={subFoodOptionModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Tùy Chọn Món Ăn</span>
              <Form.Item>
                {getFieldDecorator('foodOptionNameParent', {
                  initialValue: subFoodOptionModal.parent.foodOptionNameParent
                })(<Input disabled />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Mô Tả Tùy Chọn</span>
              <Form.Item>
                {getFieldDecorator('foName', {
                  initialValue: subFoodOptionModal.item.foName,
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1 - 100 kí tự!'
                    }
                  ]
                })(<Input placeholder="Tùy chọn" maxLength={100} />)}
              </Form.Item>
            </div>
            <div className="col-md-12">
              <span className="lab-text">Giá</span>
              <Form.Item>
                {getFieldDecorator('optionPrice', {
                  initialValue: subFoodOptionModal.item.optionPrice,
                  rules: [
                    {
                      required: true,
                      message: 'Nhập giá!'
                    }
                  ]
                })(<Input type="number" placeholder="Giá" />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Tùy Chọn Mặc Định</span>
              <Form.Item>
                {getFieldDecorator('default', {
                  initialValue: subFoodOptionModal.item.default
                })(
                  <Radio.Group>
                    <Radio value={true}>Có</Radio>
                    <Radio value={false}>Không</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </div>
          </div>
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Danh mục món ăn đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(FoodOptionModal);
