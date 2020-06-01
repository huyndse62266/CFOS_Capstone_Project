import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { createFoodCourt, updateFoodCourt } from './ManageFCService';
import { MODE } from '../../../utils/constants/constants';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class ManageFCModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.mode === MODE.EDIT ? props.itemSelected.fcLocation : ''
    };
  }
  state = {
    isErr: false
  };
  async componentDidMount() {}

  handleSubmit = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mode, itemSelected } = this.props;
        try {
          if (mode === MODE.ADD) {
            await createFoodCourt({
              ...values,
              fcLocation: this.state.address
            });
            message.success('Tạo Mới Foodcourt Thành Công!');
          } else {
            await updateFoodCourt({
              ...itemSelected,
              ...values,
              fcLocation: this.state.address
            });
            message.success('Chỉnh Sửa Foodcourt Thành Công!');
          }
          this.props.cancelModal();
          this.props.fetchData();
        } catch (err) {
          this.setState({ isErr: true });
        }
      }
    });
  };
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
  render() {
    const { isErr, address } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { visible, mode, itemSelected } = this.props;
    const titleModal =
      mode === MODE.ADD ? 'Tạo Mới Food Court' : 'Chỉnh Sửa Food Court';
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
              <span className="lab-text">Tên Food Court</span>
              <Form.Item>
                {getFieldDecorator('fcName', {
                  initialValue: mode === MODE.EDIT ? itemSelected.fcName : '',
                  rules: [{ required: true, message: 'Nhập từ 1-100 kí tự!' }]
                })(<Input placeholder="fcName" maxLength={100} />)}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <span className="lab-text">Vị Trí Food Court</span>
              <PlacesAutocomplete
                value={address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <Input
                      {...getInputProps({
                        placeholder: 'Tìm Địa Chỉ ...',
                        className: 'location-search-input'
                      })}
                      required
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: '#fafafa',
                              cursor: 'pointer'
                            }
                          : {
                              backgroundColor: '#ffffff',
                              cursor: 'pointer'
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              {/* <Form.Item>
                {getFieldDecorator('fcLocation', {
                  initialValue:
                    mode === MODE.EDIT ? itemSelected.fcLocation : address,
                  rules: [{ required: true, message: 'Nhập từ 1-100 kí tự!' }]
                })(
                  <PlacesAutocomplete
                    // value={address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading
                    }) => (
                      <div>
                        <Input
                          {...getInputProps({
                            placeholder: 'Tìm Địa Chỉ ...',
                            className: 'location-search-input'
                          })}
                          required
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: '#fafafa',
                                  cursor: 'pointer'
                                }
                              : {
                                  backgroundColor: '#ffffff',
                                  cursor: 'pointer'
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                )}
              </Form.Item> */}
            </div>
          </div>
          {isErr && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Food court đã tồn tại!
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ManageFCModal);
