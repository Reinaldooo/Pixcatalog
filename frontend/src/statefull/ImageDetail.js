import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ErrorFlash, SuccessFlash, BackLink, Details, OtherImages } from '../utils/customStyledComponents';
// //
import { white, black } from '../utils/colors';
import { UserSVG } from '../utils/helper';
import UploadDetails from '../stateless/UploadDetails'
import Condition from '../stateless/Condition'
import { config } from '../utils/helper';

const Main = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 45%;
    border-radius: .9rem;
    flex: 1;
    margin: 2rem 0;
    @media (max-width: 1100px) {
      width: 100%;
    }
  }
  img.thumb {
    width: 8rem;
    margin-right: .5rem;
    @media (max-width: 1500px) {
      width: 6rem;
    }
    @media (max-width: 600px) {
      width: 35%;
      margin: .25rem;
    }
  }
  @media (max-width: 1100px) {
      flex-direction: column;
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

const ImageDetail = (props) => {

  const [image, setImage] = useState(false)
  const [userImages, setUserImages] = useState(false)
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [categoryEmpty, setCategoryEmpty] = useState(false)
  const [editSuccess, setEditSuccess] = useState(false)

  const getData = async () => {
    setUserImages(false)
    await axios(`/api/get_image_details/${props.match.params.image}`)
      .then(({ data: {image} }) => {
        setImage(image)
        axios(`/api/get_user_images/${image.user_id}`)
          .then(({ data: { images, user } }) => {
            let slicedImages = images.filter((img) => img.id !== image.id).slice(0, 4)
            setUserImages(slicedImages)
          })
      })
  }

  useEffect(() => {
    getData()
  }, [props.match.params.image])

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
    axios.post(`/api/delete_image`, { imageId: image.id }, config)
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
      axios.post(`/api/update_image_details/${image.id}`, formData, config)
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
      <Condition test={image}>
        <BackLink to={`/categories/${image.category_name}`}>Back to category</BackLink>
        <img src={`/api/get_image/${image.address}`} alt={image.title} />
        <Details>
          {
            !edit ?
              <>
                <Condition test={editSuccess}>
                  <SuccessFlash upper>Image Edited</SuccessFlash>
                </Condition>
                <h1>{image.title}</h1>
                <span className="creator"><UserSVG />{`${image.username}`}</span>
                <span>{`#${image.category_name}`}</span>
                <p>{image.description}</p>
                <Condition test={user.user_id === image.user_id}>
                  <StyledButton onClick={() => handleEdit()}>Edit</StyledButton>
                </Condition>
                <OtherImages>
                  {
                    (userImages && userImages.length > 0) &&
                    <>
                    <p>{`Other images by ${image.username}`}</p>
                    <div>
                      {
                        userImages.map((img) => (
                          <Link to={`/images/${img.address}`} key={img.address}>
                            <img className="thumb" src={`/api/get_image_thumb/${img.address}`} alt={img.title} />
                          </Link>
                        ))
                      }
                    </div>
                    </>
                  }
                </OtherImages>
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
                      <Condition test={categoryEmpty}>
                        <ErrorFlash>Please choose a category</ErrorFlash>
                      </Condition>
                      <Condition test={editSuccess}>
                        <SuccessFlash>Image Edited</SuccessFlash>
                      </Condition>
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
      </Condition>
    </Main>
  )
}

export default ImageDetail;