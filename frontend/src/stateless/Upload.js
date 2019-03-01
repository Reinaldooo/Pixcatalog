import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
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
import { white, blue } from '../utils/colors';
import { Main } from './LoginAndRegister'
import UploadDetails from './UploadDetails';


// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

export const Textarea = styled.textarea`
  display: block;
  height: 6rem;
  width: 60%;
  margin-bottom: 1rem;
  border: 2px solid ${blue};
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
`

export const Select = styled.select`
  width: 60%;
  border: 2px solid ${blue};
  height: 1.5rem;
  background-color: ${props => props.white ? 'white' : white};
`

class Upload extends Component {

  state = {
    files: [],
    title: '',
    description: '',
    imageAddress: shortid.generate() ,
    category: '',
    saving: false,
    uploaded: false
  }

  handleImageText = (e) => {
    switch (e.target.name) {
      case 'title':
        this.setState({ title: e.target.value })
        break
      case 'description':
        this.setState({ description: e.target.value })
        break
      case 'category':
        this.setState({ category: e.target.value })
        break
      default:
        break
    }
  }

  handleUploadFinish = (err, file) => {
    if (!err) {
      this.setState({
        uploaded: true
      })
    }
  }

  handleSave = (e) => {
    e.preventDefault()
    let details = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      user_id: this.props.user.user_id
    }
    const formData = new FormData()
    formData.append(
      'details',
      JSON.stringify(details),
    )
    axios.post('api/upload_image_details', formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          this.props.history.push(`/images/${this.state.imageAddress}`)
        }
      })
    this.setState({ saving: true })
  }

  render() {
    const { files, saving, title, description, imageAddress } = this.state
    return (
      <Main white upload>
        {
          saving ?
            <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
            :
            <>
              <FilePond
                ref={ref => (this.pond = ref)}
                files={files}
                allowMultiple={false}
                allowReplace={true}
                instantUpload={true}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/*']}
                maxFiles={1}
                server={{
                  url: '/',
                  process: {
                    url: 'api/upload_image',
                    method: 'POST',
                    headers: { 'fileId': `${imageAddress}` }
                  }
                }}
                onprocessfile={this.handleUploadFinish}
                onupdatefiles={fileItems => {
                  // Set currently active file objects to this.state
                  fileItems[0] && fileItems[0].setMetadata({ customName: imageAddress })
                  this.setState({
                    files: fileItems.map(fileItem => fileItem.file)
                  });
                }}
              />
              <UploadDetails
                upload={true}
                title={title}
                description={description}
                handleImageText={this.handleImageText}
                handleSave={this.handleSave}
              />
            </>
        }
      </Main>
    );
  }
}

export default Upload;