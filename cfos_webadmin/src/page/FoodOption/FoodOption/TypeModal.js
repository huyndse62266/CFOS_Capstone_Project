import React, { Component } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import { createFoodOption, updateFoodOption } from './FoodOptionService';
import { MODE } from '../../../utils/constants/constants';

class TypeModal extends Component {
  state = {
    isErr: false
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { typeModal } = this.props;
          console.log('typeModal', typeModal.item.count);
          if (typeModal.mode === MODE.ADD) {
            await createFoodOption({ ...values });
            message.success('Tạo mới thành công');
          } else {
            console.log('edit', { ...typeModal.item, ...values }, values);
            // await updateCategoryFc({ ...categoryModal.item, ...values });
            await updateFoodOption({
              ...values,
              foId: typeModal.item.foodOptionParentId
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
    const { typeModal } = this.props;
    const titleModal =
      typeModal.mode === MODE.ADD
        ? 'Tạo Mới Danh Mục Tùy Chọn Món'
        : 'Chỉnh Sửa Danh Mục Tùy Chọn Món';
    return (
      <Modal
        title={titleModal}
        centered
        visible={typeModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Tùy Chọn Chung</span>
              <Form.Item>
                {getFieldDecorator('foName', {
                  initialValue:
                    typeModal.mode === MODE.EDIT
                      ? typeModal.item.foodOptionNameParent
                      : '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1 - 100 kí tự!'
                    }
                  ]
                })(<Input placeholder="Tên danh mục tùy chọn chung" maxLength={100} />)}
              </Form.Item>
            </div>
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Tùy Chọn Riêng</span>
              <Form.Item>
                {getFieldDecorator('subName', {
                  initialValue:
                    typeModal.mode === MODE.EDIT ? typeModal.item.subName : ''
                
                })(<Input placeholder="Tên danh mục tùy chọn riêng"  />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Tăng Số Lượng</span>
              <Form.Item>
                {getFieldDecorator('count', {
                  initialValue:
                    typeModal.mode === MODE.EDIT && typeModal.item.count
                })(
                  <Radio.Group>
                    <Radio value={true}>Có</Radio>
                    <Radio value={false}>Không</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Cho Phép Chọn Nhiều</span>
              <Form.Item>
                {getFieldDecorator('selectMore', {
                  initialValue:
                    typeModal.mode === MODE.EDIT && typeModal.item.selectMore
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
              Tên danh mục đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(TypeModal);
