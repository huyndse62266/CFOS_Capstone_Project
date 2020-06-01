import React, { Component } from 'react';
import { Button, Tooltip, Icon, Collapse } from 'antd';
import FoodOptionModal from './FoodOptionModal';
import TypeModal from './TypeModal';
import { MODE } from '../../../utils/constants/constants';
import { getAllFoodOption } from './FoodOptionService';
import { isEmpty } from '../../../utils/helpers/helpers';
import './FoodOption.scss';
import FoodOptionItem from './FoodOptionItem';

const Panel = Collapse.Panel;

class FoodOptionPage extends Component {
  state = {
    listFoodOption: [],
    typeModal: { visible: false, mode: MODE.ADD, item: {} },
    subFoodOptionModal: { visible: false, mode: MODE.ADD, item: {}, parent: {} }
  };
  componentDidMount() {
    this.fetchFoodOption();
  }
  fetchFoodOption = async () => {
    try {
      const res = await getAllFoodOption();
      this.setState({ listFoodOption: res.data });
      console.log('listFoodOption', res.data);
    } catch (err) { }
  };
  // type modal
  createTypeModal = () => {
    const temp = { visible: true, mode: MODE.ADD, item: {} };
    this.setState({ typeModal: temp });
  };
  editTypeModal = element => {
    const temp = { visible: true, mode: MODE.EDIT, item: element };
    this.setState({ typeModal: temp });
  };
  cancelTypeModal = () => {
    const temp = { visible: false, mode: MODE.ADD, item: {} };
    this.setState({ typeModal: temp });
  };
  // sub FoodOption modal
  createSubFoodOptionModal = el => {
    const temp = { visible: true, mode: MODE.ADD, item: {}, parent: el };
    this.setState({ subFoodOptionModal: temp });
  };
  editSubFoodOptionModal = (element, parentElement) => {
    const temp = {
      visible: true,
      mode: MODE.EDIT,
      item: element,
      parent: parentElement
    };
    this.setState({ subFoodOptionModal: temp });
  };
  cancelSubFoodOptionModal = () => {
    const temp = { visible: false, mode: MODE.ADD, item: {}, parent: {} };
    this.setState({ subFoodOptionModal: temp });
  };
  render() {
    const { typeModal, subFoodOptionModal, listFoodOption } = this.state;

    return (
      <div className="food-option-container">
        <div className="col-lg-12">
          <div className="card">
            <div className="header-wrapper">
              <p className="header-page">Danh Mục Tùy Chọn Món Ăn</p>
              <Button type="primary" onClick={this.createTypeModal}>
                <Icon type="plus-circle" />
                Tạo Mới Danh Mục Tùy Chọn 
              </Button>
            </div>

            <div className="card-body">
              <Collapse
                accordion
                bordered={false}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                {!isEmpty(listFoodOption) &&
                  listFoodOption.map(el => {
                    let abc;
                    if(!isEmpty(el.foodOptionNameParent && el.subName)){
                      abc = (<span> {el.foodOptionNameParent} - {el.subName}</span>);
                    }else{
                      abc = (<span> {el.foodOptionNameParent}</span>);
                    }
                   
                    // const abc =  (
                    //   <div>
                    //     {isEmpty(el.subName) && el.subName === "" && <span>
                    //       {el.foodOptionNameParent}
                    //     </span>}
                    //     {el.subName && el.foodOptionNameParent && <span>
                    //       {el.foodOptionNameParent} - {el.subName}
                    //     </span>}
                    //   </div>                 
                    // );
                    return (
                      <Panel
                        header={abc}
                        key={el.foId}
                        className="panel-item"
                        extra={
                          <span>
                            <Tooltip title="Tạo Option">
                              <Icon
                                style={{ color: 'blue' }}
                                type="plus-circle"
                                onClick={e => {
                                  this.createSubFoodOptionModal(el);
                                  e.stopPropagation();
                                }}
                              />
                            </Tooltip>
                            &nbsp; &nbsp;&nbsp;
                            <Tooltip title="Chỉnh Sửa Danh Mục Món Ăn Thêm">
                              <Icon
                                type="edit"
                                onClick={e => {
                                  this.editTypeModal(el);
                                  e.stopPropagation();
                                }}
                              />
                            </Tooltip>
                          </span>
                        }
                      >
                        {!isEmpty(el.foodOptionVMS) && (
                          <FoodOptionItem
                            foodList={el.foodOptionVMS}
                            handleEdit={item =>
                              this.editSubFoodOptionModal(item, el)
                            }
                          />
                        )}
                        {/* {!isEmpty(el.foodOptionVMS) &&
                        el.foodOptionVMS.map(item => (
                          <div className="sub-cate-item" key={item.foId}>
                            
                            <p className="text-item">{item.foName}</p>
                            <p>{item.optionPrice}</p>

                            <Tooltip title="Chỉnh Sửa Món Ăn Thêm">
                              <Icon
                                type="edit"
                                onClick={e => {
                                  this.editSubFoodOptionModal(item, el);
                                  e.stopPropagation();
                                }}
                              />
                            </Tooltip>
                          </div>
                        ))} */}
                      </Panel>
                    );
                  })}
              </Collapse>
            </div>
          </div>
        </div>
        {typeModal.visible && (
          <TypeModal
            typeModal={typeModal}
            cancelModal={this.cancelTypeModal}
            fetchData={this.fetchFoodOption}
          />
        )}
        {subFoodOptionModal.visible && (
          <FoodOptionModal
            subFoodOptionModal={subFoodOptionModal}
            cancelModal={this.cancelSubFoodOptionModal}
            fetchData={this.fetchFoodOption}
          />
        )}
      </div>
    );
  }
}

export default FoodOptionPage;
