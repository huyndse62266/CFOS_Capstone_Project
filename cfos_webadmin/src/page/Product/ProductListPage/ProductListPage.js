import React, { Component } from 'react';
import { Collapse, Icon, Button, Tooltip } from 'antd';
import './CateFood.scss';
import { getListCategoryStore } from './CateFoodService';
import { isEmpty } from '../../../utils/helpers/helpers';
import { MODE } from '../../../utils/constants/constants';
import CategoryModal from './CategoryModal';
import FoodModal from './FoodModal';
import Item from './Item';

const Panel = Collapse.Panel;

class ProductListPage extends Component {
  state = {
    listCategory: {},
    categoryModal: { visible: false, mode: MODE.ADD, item: {} },
    foodModal: { visible: false, mode: MODE.ADD, item: {}, parent: {} }
  };
  componentDidMount() {
    this.fetchCategory();
  }
  fetchCategory = async () => {
    try {
      const res = await getListCategoryStore();
      this.setState({ listCategory: res.data });
    } catch (err) {}
  };

  // category modal
  createCategoryModal = () => {
    const temp = { visible: true, mode: MODE.ADD, item: {} };
    this.setState({ categoryModal: temp });
  };
  editCategoryModal = element => {
    const temp = { visible: true, mode: MODE.EDIT, item: element };
    this.setState({ categoryModal: temp });
  };
  cancelCategoryModal = () => {
    const temp = { visible: false, mode: MODE.ADD, item: {} };
    this.setState({ categoryModal: temp });
  };

  // food modal
  createFoodModal = el => {
    const temp = { visible: true, mode: MODE.ADD, item: {}, parent: el };
    this.setState({ foodModal: temp });
  };
  editFoodModal = (element, parent) => {
    const temp = { visible: true, mode: MODE.EDIT, item: element, parent };
    this.setState({ foodModal: temp });
  };
  cancelFoodModal = () => {
    const temp = { visible: false, mode: MODE.ADD, item: {}, parent: {} };
    this.setState({ foodModal: temp });
  };
  render() {
    const { listCategory, categoryModal, foodModal } = this.state;
    return (
      <div className="food-container">
        <div className="col-lg-12">
          <div className="card">
            <div className="header-wrapper">
              <p className="header-page">Danh Sách Món Ăn</p>
              <Button type="primary" onClick={this.createCategoryModal}>
                <Icon type="plus" />
                Tạo Danh Mục Món Ăn
              </Button>
            </div>

            <div className="card-body">
              <Collapse
                accordion
                bordered={false}
                destroyInactivePanel={true}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                {!isEmpty(listCategory) &&
                  listCategory.map(el => (
                    <Panel
                      header={el.categoryName}
                      key={el.categoryId}
                      className="panel-item"
                      extra={
                        <span>
                          <Tooltip title="Tạo Món Ăn Mới">
                            <Icon
                              type="plus-circle"
                              onClick={e => {
                                this.createFoodModal(el);
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                          &nbsp;&nbsp;&nbsp;
                          <Tooltip title="Chỉnh Sửa Danh Mục">
                            <Icon
                              type="edit"
                              style={{ color: 'blue' }}
                              onClick={e => {
                                this.editCategoryModal(el);
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                        </span>
                      }
                    >
                      <Item
                        categoryId={el.categoryId}
                        editFoodModal={item => this.editFoodModal(item, el)}
                      />
                    </Panel>
                  ))}
              </Collapse>
            </div>
          </div>
        </div>
        {categoryModal.visible && (
          <CategoryModal
            categoryModal={categoryModal}
            cancelModal={this.cancelCategoryModal}
            fetchData={this.fetchCategory}
          />
        )}
        {foodModal.visible && (
          <FoodModal
            foodModal={foodModal}
            cancelModal={this.cancelFoodModal}
            fetchData={this.fetchCategory}
          />
        )}
      </div>
    );
  }
}
export default ProductListPage;
