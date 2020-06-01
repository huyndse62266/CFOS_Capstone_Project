import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { storage } from '../../firebaseConfig';
class UploadFirebase extends Component {
  uploadFireBase = file => {
    console.log('test', file);
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {},
      () => {
        // complete funtion
        storage
          .ref('images')
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            this.props.handleChangeUpload(url, file);
          });
      }
    );
  };
  handleRemove = file => {
    this.props.handleRemove(file);
  };
  render() {
    const { fileList } = this.props;
    console.log('fileList', fileList);
    return (
      <Upload
        name="avatar"
        multiple={true}
        listType="picture-card"
        className="avatar-uploader"
        // showUploadList={false}
        fileList={fileList}
        action={this.uploadFireBase}
        onChange={this.uploadChange}
        onRemove={this.handleRemove}
      >
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      </Upload>
    );
  }
}

export default UploadFirebase;
