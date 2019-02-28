import React from 'react';
import styled from 'styled-components';
//
import { Input, StyledButton } from './Login';
import { Textarea } from './Upload';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const UploadDetails = ({ handleSave, handleImageText, defaultTitle, defaultDescription, defaultCategory, handleDeleteConfirm, handleCancel }) => {

  // const [categories, setCategories] = useState([])

  // useEffect(() => {
  //   axios(`/api/categories`)
  //     .then(({ data }) => {
  //       data.categories.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  //       setCategories(data.categories)
  //     })
  // }, [])

  return (
    <Form onSubmit={handleSave}>
      <Input
        white
        type="text"
        name="title"
        placeholder='Title'
        defaultValue={defaultTitle}
        onChange={handleImageText}
      />
      <Textarea
        white
        name="description"
        placeholder='Description'
        defaultValue={defaultDescription}
        onChange={handleImageText}
      />
      <Input
        white
        type="text"
        name="category"
        placeholder='Category'
        defaultValue={defaultCategory}
        onChange={handleImageText}
      />
      <div>
        <StyledButton white onClick={handleSave}>Save</StyledButton>
        {
          handleDeleteConfirm &&
          <>
            <StyledButton white onClick={handleCancel}>Cancel</StyledButton>
            <StyledButton white danger onClick={handleDeleteConfirm}>Delete</StyledButton>
          </>
        }
      </div>
    </Form>
  )
}

export default UploadDetails;