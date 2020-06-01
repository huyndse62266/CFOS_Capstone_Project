import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { storage } from '../../firebaseConfig';
class UploadImageStore extends Component {
  uploadFireBase = file => {
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
            this.props.handleChangeUpload(url);
          });
      }
    );
  };
  render() {
    const { imageUrl } = this.props;

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={this.uploadFireBase}
        onChange={this.uploadChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: 104 }} />
        ) : (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
    );
  }
}

export default UploadImageStore;
