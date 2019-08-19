import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// 引入样式
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
  static propTypes = {
    editorChange: PropTypes.func.isRequired
  };

  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    // 子组件通知父组件值发生了变化
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
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