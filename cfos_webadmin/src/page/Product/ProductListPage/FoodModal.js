import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Input, message, TreeSelect } from 'antd';
import { actionGetListFoodByCate } from '../productAction';
import {
  getCategoryFc,
  createFood,
  updateFood,
  getAllFoodOption
} from './CateFoodService';
import { isEmpty } from '../../../utils/helpers/helpers';
import { MODE } from '../../../utils/constants/constants';
import UploadFirebase from '../../../components/uploadFirebase/UploadFirebase';
class FoodModal extends Component {
  constructor(props) {
    super(props);
    const temp = [];
    const { item } = props.foodModal;
    if (!isEmpty(item.imageVMS)) {
      item.imageVMS.forEach(el =>
        temp.push({ url: el.image, uid: el.id, status: 'done' })
      );
    }
    this.state = {
      cateFCList: [],
      subCate: [],
      foodOptionList: [],
      urlImage: props.foodModal.item.foodImage || '',
      fileList: [...temp],
      isErr: false
    };
  }

  // async để call api, await hoạt động
  async componentDidMount() {
    const res = await getCategoryFc();
    const listFoodOption = await getAllFoodOption();
    this.setState({
      cateFCList: res.data,
      subCate: res.data.categoryVM || [],
      foodOptionList: listFoodOption.data
    });
  }
  handleChangeUpload = (url, file) => {
    const temp = [...this.state.fileList];
    temp.push({ url: url, uid: file.uid, name: file.name, status: 'done' });
    this.setState({ fileList: temp });
  };

  handleRemove = file => {
    const temp = this.state.fileList.filter(item => item.uid !== file.uid);
    this.setState({ fileList: temp });
  };

  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { foodModal } = this.props;
          const { fileList } = this.state;
          const temp = [];
          const foodOptionVMSTemp = [];
          if (!isEmpty(fileList)) {
            fileList.forEach(el => temp.push({ image: el.url }));
          }
          console.log('foodOptionId', values.foodOptionId);
          if (!isEmpty(values.foodOptionId)) {
            values.foodOptionId.forEach(el =>
              foodOptionVMSTemp.push({ foId: el })
            );
          }
          if (foodModal.mode === MODE.ADD) {
            delete values.fcCategoryId;
            await createFood({
              ...values,
              imageVMS: temp,
              foodOptionVMS: [...foodOptionVMSTemp],
              storeCategoryId: foodModal.parent.categoryId
            });
            message.success('Tạo Mới Thành Công !');
          } else {
            await updateFood({
              ...foodModal.item,
              ...values,
              foodOptionVMS: [...foodOptionVMSTemp],
              imageVMS: temp
            });
            message.success('Chỉnh Sửa Thành Công !');
          }
          this.props.cancelModal();
          this.props.fetchData();
          this.props.actionGetListFoodByCate(foodModal.parent.categoryId);
        } catch (err) {
          this.setState({ isErr: true });
        }
      }
    });
  };
  handleSelect = value => {
    const { cateFCList } = this.state;
    const temp = cateFCList.filter(item => item.fcCategoryId === value);
    this.setState({ subCate: !isEmpty(temp) ? temp[0].categoryVM : [] });
  };
  convertData = listData => {
    console.log('data', listData);
    const initialTree = [];
    if (!isEmpty(listData)) {
      listData.forEach(el => initialTree.push(el.foId));
    }
    return initialTree;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { foodModal } = this.props;
    const {
      cateFCList,
      subCate,
      urlImage,
      foodOptionList,
      fileList,
      isErr
    } = this.state;

    const titleModal =
      foodModal.mode === MODE.ADD ? 'Tạo Mới Món Ăn' : 'Chỉnh Sửa Món Ăn';
    let treeData = [];
    if (!isEmpty(foodOptionList)) {
      foodOptionList.forEach(el => {
        let temp = [];
        if (!isEmpty(el.foodOptionVMS)) {
          el.foodOptionVMS.forEach(subItem => {
            temp.push({
              title: subItem.foName,
              value: subItem.foId,
              key: subItem.foId
            });
          });
        }
        if(!isEmpty(el.foodOptionNameParent && el.subName)){
          treeData.push({
            title: el.foodOptionNameParent + ' - ' + el.subName,
            value: el.foodOptionParentId,
            key: el.foodOptionParentId,
            children: [...temp]
          });
        }else{
          treeData.push({
            title: el.foodOptionNameParent,
            value: el.foodOptionParentId,
            key: el.foodOptionParentId,
            children: [...temp]
          });
        }
       
      });
    }
    console.log('foodModal.item', foodModal.item);

    return (
      <Modal
        title={titleModal}
        centered
        width={960}
        visible={foodModal.visible}
        onOk={this.handleSubmit}
        onCancel={() => this.props.cancelModal()}
      >
        <Form>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Tên Món Ăn</span>
              <Form.Item>
                {getFieldDecorator('foodName', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.foodName : '',
                  rules: [{ required: true, message: 'Nhập Từ 1-100 ký tự!' }]
                })(<Input placeholder="Tên Món ăn" maxLength={100} />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Mô Tả</span>
              <Form.Item>
                {getFieldDecorator('foodDescription', {
                  initialValue:
                    foodModal.mode === MODE.EDIT
                      ? foodModal.item.foodDescription
                      : '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập 1-200 ký tự!'
                    }
                  ]
                })(<Input placeholder="Mô tả" maxLength={200} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Hình Ảnh</span>
              <div>
                <UploadFirebase
                  handleChangeUpload={this.handleChangeUpload}
                  handleRemove={this.handleRemove}
                  imageUrl={urlImage}
                  fileList={fileList}
                />
              </div>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Đơn Vị Món Ăn</span>
              <Form.Item>
                {getFieldDecorator('foodUnit', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.foodUnit : '',
                  rules: [{ required: true, message: 'Nhập 1-30 ký tự!' }]
                })(<Input placeholder="Đơn vị" maxLength={30} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className="lab-text">Giá</span>
              <Form.Item>
                {getFieldDecorator('price', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.price : '',
                  rules: [{ required: true, message: 'Nhập Giá!' }]
                })(<Input type="number" placeholder="VNĐ" />)}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <span className="lab-text">Số Lượng</span>
              <Form.Item>
                {getFieldDecorator('quantity', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.quantity : '',
                  rules: [{ required: true, message: 'Nhập Số Lượng!' }]
                })(<Input type="number" placeholder="123" />)}
              </Form.Item>
            </div>
          </div>
          {foodModal.mode === MODE.ADD && (
            <div className="row">
              <div className="col-md-6">
                <span className="lab-text">Danh Mục Food Court</span>
                <Form.Item>
                  {getFieldDecorator('fcCategoryId', {
                    rules: [
                      { required: true, message: 'Chọn Danh Mục Food Court!' }
                    ]
                  })(
                    <Select
                      style={{ width: '100%' }}
                      onSelect={this.handleSelect}
                    >
                      {!isEmpty(cateFCList) &&
                        cateFCList.map(el => (
                          <Select.Option
                            value={el.fcCategoryId}
                            key={el.fcCategoryId}
                          >
                            {el.fcCategoryName}
                          </Select.Option>
                        ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
              {!isEmpty(subCate) && (
                <div className="col-md-6">
                  <span className="lab-text">Danh Mục Món Ăn</span>
                  <Form.Item>
                    {getFieldDecorator('fcSubCategoryId', {
                      rules: [
                        { required: true, message: 'Chọn Danh Mục Món Ăn!' }
                      ]
                    })(
                      <Select style={{ width: '100%' }}>
                        {subCate.map(el => (
                          <Select.Option
                            value={el.categoryId}
                            key={el.categoryId}
                          >
                            {el.categoryName}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              )}
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Danh Mục Tùy Chọn</span>
              <Form.Item>
                {getFieldDecorator('foodOptionId', {
                  initialValue:
                    foodModal.mode === MODE.EDIT
                      ? this.convertData(foodModal.item.foodOptionVMS)
                      : []
                })(
                  <TreeSelect
                    treeData={treeData}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}

                    // value: this.state.value
                    // onChange={this.handleChangeTreeSelect}
                    multiple={true}
                    treeCheckable={true}
                    // showCheckedStrategy={TreeSelect.SHOW_ALL}
                    searchPlaceholder="--- Chọn Các Món Thêm ---"
                  />
                )}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Giảm Giá %</span>
              <Form.Item>
                {getFieldDecorator('promotion', {
                  initialValue:
                    foodModal.mode === MODE.EDIT ? foodModal.item.promotion : ''
                })(<Input type="number" placeholder="Số % giảm giá" />)}
              </Form.Item>
            </div>
          </div>
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Nhà hàng đã tồn tại món ăn này!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    foodList: state.product.foodList
  }),
  {
    actionGetListFoodByCate
  }
)(Form.create()(FoodModal));
