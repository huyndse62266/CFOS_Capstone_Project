import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { updateCategoryFc, createCategoryFc } from './CategoryService';
import { MODE } from '../../../utils/constants/constants';
import UploadImageStore from '../../../components/uploadFirebase/UploadImageStore';

class CategorySubModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlImage: props.subCategoryModal.item.image || '',
      isErr: false
    };
  }
  handleChangeUpload = url => {
    this.setState({ urlImage: url });
  };
  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { parent, mode, item } = this.props.subCategoryModal;
          const { urlImage } = this.state;
          if (mode === MODE.ADD) {
            // implemenet add function
            await createCategoryFc({
              categoryName: values.categoryName,
              parentId: parent.fcCategoryId,
              image: urlImage
            });
            message.success('Tạo Mới Thành Công!');
          } else {
            await updateCategoryFc({
              active: values.active,
              categoryId: item.categoryId,
              categoryName: values.categoryName,
              parentId: parent.fcCategoryId,
              image: urlImage
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
    const { isErr, urlImage } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { subCategoryModal } = this.props;
    const titleModal =
      subCategoryModal.mode === MODE.ADD
        ? 'Tạo Mới Danh Mục Món Ăn'
        : 'Chỉnh Sửa Danh Mục Món Ăn';
    return (
      <Modal
        title={titleModal}
        centered
        visible={subCategoryModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Food Court</span>
              <Form.Item>
                {getFieldDecorator('fcCategoryName', {
                  initialValue: subCategoryModal.parent.fcCategoryName
                })(<Input disabled />)}
              </Form.Item>
            </div>
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Món Ăn</span>
              <Form.Item>
                {getFieldDecorator('categoryName', {
                  initialValue: subCategoryModal.item.categoryName,
                  rules: [
                    {
                      required: true,
                      message: 'Nhập từ 1 - 100 kí tự!'
                    }
                  ]
                })(<Input placeholder="Danh Mục Món Ăn" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Hình Ảnh</span>
              <div>
                <UploadImageStore
                  handleChangeUpload={this.handleChangeUpload}
                  imageUrl={urlImage}
                />
              </div>
            </div>
          </div>
          {/* {subCategoryModal.mode === MODE.EDIT && (
            <div className="row">
              <div className="col-md-12">
                <span className="lab-text">Trạng Thái</span>
                <Form.Item>
                  {getFieldDecorator('active', {
                    initialValue: subCategoryModal.item.active
                  })(
                    <Radio.Group>
                      <Radio value={true}>Hiện</Radio>
                      <Radio value={false}>Ẩn</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </div>
          )} */}
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

export default Form.create()(CategorySubModal);
