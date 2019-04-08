import React, { Component } from 'react';
import axios from 'axios';
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
import { blue } from '../../utils/colors';
import { MainWhiteBox } from '../../basicStyles'
import UploadDetails from '../../stateless/UploadDetails/UploadDetails';
import { ErrorFlash } from '../../utils/customStyledComponents';
import Condition from '../../stateless/Condition/Condition';
import { config } from '../../utils/helper';


// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

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
                allowRevert={false}
                allowMultiple={true}
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