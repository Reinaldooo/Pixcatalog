import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ErrorFlash, SuccessFlash } from '../utils/customStyledComponents';
// //
import { white, black, blue } from '../utils/colors';
import { UserSVG } from '../utils/helper';
import UploadDetails from '../stateless/UploadDetails'

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
    @media (max-width: 900px) {
      width: 100%;
    }
  }
  @media (max-width: 900px) {
      flex-direction: column;
  }
`

const Details = styled.div`
  text-align: center;
  position: relative;
  color: ${white};
  padding: 2rem;
  min-height: 40vh;
  flex: 1;
  max-width: 800px;

  p {
    width: 80%;
    word-wrap: break-word;
    margin: 1rem auto;
  }

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
  border: none;
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
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [categoryEmpty, setCategoryEmpty] = useState(false)
  const [editSuccess, setEditSuccess] = useState(false)

  useEffect(() => {
    axios(`/api/get_image_details/${props.match.params.image}`)
      .then(({ data }) => {
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

  const handleDeleteConfirm = () => {
    setConfirmDelete(true)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    axios.post(`/api/delete_image/${image.id}`)
      .then((res) => {
        if (res.status === 200) {
          props.history.push("/myphotos")
        }
      })
  }

  const handleSave = (e) => {
    if (category.length === 0) {
      e.preventDefault()
      setCategoryEmpty(true)
      setTimeout(() => {
        setCategoryEmpty(false)
      }, 1500);
    } else {

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
            setEditSuccess(true)
            setTimeout(() => { setEditSuccess(false) }, 1500)
          }
        })
    }
  }

  const { user } = props

  return (
    <Main>
      {
        image &&
        <>
          <BackLink to={`/categories/${image.category_name}`}>Back to category</BackLink>
          <img src={`/api/get_image/${image.address}`} alt={image.title} />
          <Details>
            {
              !edit ?
                <>
                  {
                    editSuccess && <SuccessFlash upper>Image Edited</SuccessFlash>
                  }
                  <h1>{image.title}</h1>
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
                <>
                  {
                    confirmDelete ?
                      <>
                        <StyledButton danger onClick={handleDelete}>Confirm</StyledButton>
                        <StyledButton onClick={() => setConfirmDelete(false)}>Cancel</StyledButton>
                      </>
                      :
                      <>
                        {
                          categoryEmpty && <ErrorFlash>Please choose a category</ErrorFlash>
                        }
                        {
                          editSuccess && <SuccessFlash>Image Edited</SuccessFlash>
                        }
                        <UploadDetails
                          upload={false}
                          defaultTitle={image.title}
                          defaultDescription={image.description}
                          defaultCategory={image.category_name}
                          handleImageText={handleImageText}
                          handleSave={handleSave}
                          handleDeleteConfirm={handleDeleteConfirm}
                          handleCancel={handleCancel}
                          darkBackground={true}
                        />
                      </>
                  }
                </>
            }
          </Details>
        </>
      }
    </Main>
  )
}

export default ImageDetail;