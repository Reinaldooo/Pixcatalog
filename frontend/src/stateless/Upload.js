import React, { Component } from 'react';
// import styled from 'styled-components';
import { FilePond, registerPlugin } from "react-filepond";
import shortid from 'shortid';
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// //
// import { white, blue, black } from '../utils/colors';
import { Main, Input, StyledButton } from './Login'


// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

class Upload extends Component {

  state = {
    files: [],
    title: '',
    description: ''
  }

  componentDidMount() { }

  handleInit(e) {
    console.log(e)
  }

  handleImageText = (e) => {
    e.target.name === 'title' ?
      this.setState({ title: e.target.value })
      :
      this.setState({ description: e.target.value })
  }

  // handleSave = () => {
  //   if 
  // }

  render() {
    return (
      <Main white>
        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={false}
          allowReplace={true}
          instantUpload={true}
          allowFileTypeValidation={true}
          acceptedFileTypes={['image/*']}
          maxFiles={1}
          server={{
            url: '/',
            process: {
              url: 'api/upload',
              method: 'POST',
              withCredentials: false,
              headers: {'fileId': `${shortid.generate()}`},
              timeout: 7000,
              onload: null,
              onerror: null,
              ondata: null
            }
          }}
          onprocessfileprogress={this.handleInit}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        />
        <Input
          type="text"
          name="title"
          placeholder='Title'
          onChange={this.handleImageText}
          value={this.state.title}
        />
        <Input
          type="text"
          name="description"
          placeholder='Description'
          onChange={this.handleImageText}
          value={this.state.description}
        />
        <div>
          <StyledButton to='/' white onClick={this.handleSave}>Save</StyledButton>
          <p>{`Uploading as ${this.props.user.username}`}</p>
        </div>
      </Main>
    );
  }
}

export default Upload;