import React from 'react';
//
import { StyledButtonOne } from '../../basicStyles';
import { Textarea, Form } from './styles';
import { Input, Label, InputWrapper } from '../../utils/customStyledComponents';
import Condition from '../Condition/Condition';



const UploadDetails = ({
  handleSave,
  handleImageText,
  defaultTitle,
  defaultDescription,
  defaultCategory,
  handleDeleteConfirm,
  handleCancel,
  darkBackground }) => {

  return (
    <Form onSubmit={handleSave}>
      <InputWrapper>
        <Label darkBackground={darkBackground} htmlFor="title">Image Title</Label>
        <Input
          white
          id="title"
          type="text"
          name="title"
          placeholder='Title'
          defaultValue={defaultTitle}
          onChange={handleImageText}
        />
      </InputWrapper>
      <InputWrapper>
        <Label darkBackground={darkBackground} htmlFor="description">Image description</Label>
        <Textarea
          white
          id="description"
          name="description"
          placeholder='Description'
          defaultValue={defaultDescription}
          onChange={handleImageText}
        />
      </InputWrapper>
      <InputWrapper>
        <Label darkBackground={darkBackground} htmlFor="category">Category</Label>
        <Input
          white
          id="category"
          type="text"
          name="category"
          placeholder='Category'
          defaultValue={defaultCategory}
          onChange={handleImageText}
        />
      </InputWrapper>
      <div>
        <StyledButtonOne white onClick={handleSave}>Save</StyledButtonOne>
        <Condition test={handleDeleteConfirm}>
            <StyledButtonOne white onClick={handleCancel}>Cancel</StyledButtonOne>
            <StyledButtonOne white danger onClick={handleDeleteConfirm}>Delete</StyledButtonOne>
        </Condition>
      </div>
    </Form>
  )
}

export default UploadDetails;