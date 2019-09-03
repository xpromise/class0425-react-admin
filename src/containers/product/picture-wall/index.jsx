import React, { Component } from 'react';
import { Icon, Upload, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    id: -2
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleRemove = (removedFile) => {
    this.setState({
      fileList: this.state.fileList.filter((file) => {
        return +file.uid !== +removedFile.uid;
      })
    })
  };

  customRequest = async ({filename, file}) => {
    console.log(file, filename);

    const preview = await getBase64(file);
    let { fileList, id } = this.state;
    --id;
    this.setState({
      fileList: [
        ...fileList,
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: preview,
        }
      ],
      id
    })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          customRequest={this.customRequest}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
