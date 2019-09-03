import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// 引入样式
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less';

export default class RichTextEditor extends Component {
  static propTypes = {
    editorChange: PropTypes.func.isRequired,
    detail: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    const { detail, editorChange } = this.props;

    const blocksFromHtml = htmlToDraft(detail);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    if (detail) {
      editorChange(detail);
    }

    this.state = {
      editorState
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    // 子组件通知父组件值发生了变化
    // 返回值默认有一个换行符，通过trim方法去除
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent())).trim();
    // 解决点击时默认值是 <p></p>, 如果是置为空
    if (/^<p><\/p>$/.test(text)) {
      text = '';
    }
    this.props.editorChange(text);
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"
          editorClassName="product-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/*<textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />*/}
      </div>
    );
  }
}