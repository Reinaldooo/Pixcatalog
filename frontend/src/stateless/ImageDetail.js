import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
// //
import { white, black, blue } from '../utils/colors';
import { UserSVG } from '../utils/helper';
import UploadDetails from './UploadDetails'

const Main = styled.div`
  position: relative;
  width: 80%;
  margin: 1rem auto 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50%;
    border-radius: .9rem;
    flex: 1;
  }
`

const Details = styled.div`
  text-align: center;
  color: ${white};
  padding: 2rem;
  flex: 1;

  h1 {
    margin-bottom: 0;
  }

  span.creator {
    color: ${blue};
    display: block;
  }

  svg {
    height: .7rem;
  }
`

const StyledButton = styled.button`
  text-decoration: none;
  color: ${black};
  display: inline-block;
  font-weight: 600;
  font-size: .9rem;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .5rem .2rem;
  text-align: center;
  cursor: pointer;
`

const BackLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  background-color: ${blue};
  padding: 5px 10px 10px;
  border-top-left-radius: .9rem;
  border-bottom-right-radius: .9rem;
  color: ${white};
  font-weight: 600;
`

const ImageDetail = (props) => {

  const [image, setImage] = useState(false)
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    axios(`/api/get_image_details/${props.match.params.image}`)
      .then(({ data }) => {
        console.log(data.image);
        setImage(data.image)
      })
  }, [])

  const handleImageText = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value)
        break
      case 'description':
        setDescription(e.target.value)
        break
      case 'category':
        setCategory(e.target.value)
        break
      default:
        break
    }
  }

  const handleEdit = () => {
    setTitle(image.title)
    setDescription(image.description)
    setCategory(image.category_name)
    setEdit(true)
  }

  const handleCancel = () => {
    setEdit(false)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    console.log('delete')
  }
  
  const handleSave = (e) => {
    e.preventDefault()
    let details = {
      title,
      description,
      category,
    }
    image.title = title
    image.description = description
    image.category_name = category
    setImage(image)
    setEdit(false)
    const formData = new FormData()
    formData.append(
      'editedDetails',
      JSON.stringify(details),
    )
    axios.post(`/api/update_image_details/${image.id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
         }
      })
  }

  const { user } = props

  return (
    <Main>
      {
        image &&
        <>
          <BackLink to={`/categories/${image.category_name}`}>Back to category</BackLink>
          <img src={`/api/get_image/${image.address}`} alt={image.title} />
          {/* <MainII/> */}
          <Details>
            {
              !edit ?
              <>
              <h1>{image.title}</h1>
              {console.log(props)}
              <span className="creator"><UserSVG />{` ${image.username}`}</span>
              <span>{`#${image.category_name}`}</span>
              <p>{image.description}</p>
              {
                user.user_id === image.user_id &&
                <>
                  <StyledButton onClick={() => handleEdit()}>Edit</StyledButton>
                </>
              }
              </>
              :
                <UploadDetails
                  upload={false}
                  defaultTitle={image.title}
                  defaultDescription={image.description}
                  defaultCategory={image.category_name}
                  handleImageText={handleImageText}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  handleCancel={handleCancel}
                />
            }
          </Details>
        </>
      }
    </Main>
  )
}

export default ImageDetail;