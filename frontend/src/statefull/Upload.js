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
import { MainWhiteBox } from '../basicStyles'
import UploadDetails from '../stateless/UploadDetails';
import { ErrorFlash } from '../utils/customStyledComponents';
import Condition from '../stateless/Condition';
import { config } from '../utils/helper';


// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

export const Textarea = styled.textarea`
  display: block;
  height: 6rem;
  width: 100%;
  margin-top: .5rem;
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
    categoryEmpty: false,
    saving: false,
    noFile: false
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

  handleSave = (e) => {
    e.preventDefault()
    let categoryOk = this.state.category.length > 2
    let fileAdded = this.state.files.length > 0
    if (categoryOk && fileAdded) {
      this.pond.processFile().then(file => {
        this.setState({ saving: true })
        let details = {
          title: this.state.title,
          description: this.state.description,
          category: this.state.category,
          address: this.state.imageAddress,
          user_id: this.props.user.user_id
        }
        const formData = new FormData()
        formData.append(
          'details',
          JSON.stringify(details),
        )
        axios.post('api/upload_image_details', formData, config)
          .then(({ data, status }) => {
            if (status === 200) {
              this.props.history.push(`/images/${this.state.imageAddress}`)
            }
          })
      });
    } else if (!fileAdded) {

      this.setState({ noFile: true })
      setTimeout(() => {
        this.setState({ noFile: false })
      }, 2000);

    } else {      

      this.setState({ categoryEmpty: true })
      setTimeout(() => {
        this.setState({ categoryEmpty: false })
      }, 2000);
    }
  }

  render() {
    const { files, saving, title, description, imageAddress,  categoryEmpty, noFile } = this.state
    return (
      <MainWhiteBox white upload>
        {
          saving ?
            <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
            :
            <>
              <Condition test={categoryEmpty}>
                <ErrorFlash>Please choose a category</ErrorFlash>
              </Condition>
              <Condition test={noFile}>
                <ErrorFlash>You must choose one image</ErrorFlash>
              </Condition>
              <FilePond
                ref={ref => (this.pond = ref)}
                files={files}
                allowMultiple={false}
                allowRevert={false}
                instantUpload={false}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/*']}
                maxFiles={1}
                server={{
                  url: '/',
                  process: {
                    url: 'api/upload_image',
                    method: 'POST',
                    headers: {
                      'fileId': `${imageAddress}`,
                      "X-CSRFToken": config.headers["X-CSRFToken"]
                    }
                  }
                }}
                onprocessfile={this.handleUploadFinish}
                onupdatefiles={fileItems => {
                  // Set currently active file objects to this.state
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
      </MainWhiteBox>
    );
  }
}

export default Upload;