import React, { useState } from 'react'
import { createForm } from 'rc-form';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';

import Layout from 'components/Partials/Layout';
import PencilIconSource from 'Assets/Pencil.svg'
import GalleryIconSource from 'Assets/Gallery.svg'
import PhotoUploader, { Photo } from 'components/PhotoUploader/PhotoUploaderComponent';
import { UsersApi } from 'Api/UsersApi';
import { getPersonId } from 'utils/auth';

const PencilIcon = styled.img`

`

const Heading = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #212121;
`

const Container = styled.div`
  padding: 1rem;
`

const Input = styled.input`
  outline: 0;
  display: flex;
  flex: 1;
  border: 0;
  width: 100%;
  border-bottom: 1px solid #bdbdbd;
  margin: 1rem 0;
  padding-bottom: 0.5rem;
  font-family: Roboto;
`

const TextArea = styled.textarea`
  font-family: Roboto;
  height: 300px;
  outline: 0;
  display: flex;
  flex: 1;
  border: 0;
  width: 100%;
  border-bottom: 1px solid #bdbdbd;
  margin: 1rem 0;
  padding-bottom: 0.5rem;
  resize: none;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`

const FooterIcon = styled.img`

`

const Button = styled.div`
  background-color: #263551;
  display: flex;
  color: #fff;
  padding: 0 3rem;
  border-radius: 0.5rem;
  align-items: center;
  height: 2.5rem;
`

const ErrorMesseage = styled.div`
  color: red;
  font-size: 0.8rem;
`


interface AddPostContainerProps {
  form: any
}

function AddPostContainer(props: AddPostContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  
  const {
    getFieldError,
    getFieldDecorator,
  } = props.form;

  const onSubmit = () => {
    props.form.validateFields(async (error: any, values: any) => {
      if (error !== null) return
      try {
        setIsSubmitting(true)
        const bodyFormData = new FormData();
        
        Object.keys(values).forEach(key => bodyFormData.append(key, values[key]))
        
        // @ts-ignore
        bodyFormData.append('CategoryId', 2)
        // @ts-ignore
        bodyFormData.append('IsPin', false)
        // @ts-ignore
        bodyFormData.append('TypeId', 104)

        if (photos.length > 0 ) {
          const image = new File([photos[0].file], photos[0].file.name, {type: photos[0].file.type});        
          bodyFormData.append('file', image)
        }

        console.log(bodyFormData)
        
        const response = await UsersApi.addPost(bodyFormData)
        console.log('response', response);
      } catch (_) {}
      finally {
        setIsSubmitting(false)
      }
    });
  }

  return (
    <Layout>
      <Container>
        <Heading>
          <PencilIcon src={PencilIconSource} />
          <Title>Title</Title>
        </Heading>
        {getFieldDecorator('Subject', { rules: [{required: true, message: 'Title is required'}], initialValue: '' })(
          <Input placeholder="Enter title..." />
        )}
        {
          getFieldError('Subject') && <ErrorMesseage>{getFieldError('Subject').join(', ') }</ErrorMesseage>
        }
        {getFieldDecorator('ContentText', { initialValue: '' })(
          <TextArea placeholder="Enter text..." />
        )}
        <Footer>
          <div>
            <PhotoUploader
              photos={photos}
              Picker={(onClick) => <FooterIcon onClick={() => onClick()} src={GalleryIconSource} />} 
              onAddPhoto={photo => setPhotos([photo])}
              onDeletePhoto={photoIndex => setPhotos([ ...photos ].filter((p, index) => index !== photoIndex))}
            />
          </div>
          <Button onClick={onSubmit}>
            {
              isSubmitting ?
              <PulseLoader
                sizeUnit="rem"
                size={0.5}
                color="#fff"
              /> : 'Post'
            }
          </Button>
        </Footer>
      </Container>

    </Layout>
  )
}

export default createForm({ name: 'AddPostContainer' })(AddPostContainer);

fetch("https://api.pointina.ir/api/Content", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI3IiwibmJmIjoxNTU3NjA4ODM4LCJleHAiOjE1NjAyMDA4MzgsImlhdCI6MTU1NzYwODgzOH0.7PbPoG1yK8A4MrIANtb7YA0ANkNOYmNpJWXE_piFyUo","content-type":"multipart/form-data; boundary=----WebKitFormBoundary3VBWtt0XiZtFEi9x","sec-ch-ua":"Google Chrome 74","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site","sec-fetch-user":"?F"},"referrer":"http://localhost:3000/add-post","referrerPolicy":"no-referrer-when-downgrade","body":"------WebKitFormBoundary3VBWtt0XiZtFEi9x\r\nContent-Disposition: form-data; name=\"Subject\"\r\n\r\ntest\r\n------WebKitFormBoundary3VBWtt0XiZtFEi9x\r\nContent-Disposition: form-data; name=\"ContentText\"\r\n\r\nhi there\r\n------WebKitFormBoundary3VBWtt0XiZtFEi9x\r\nContent-Disposition: form-data; name=\"CategoryId\"\r\n\r\n2\r\n------WebKitFormBoundary3VBWtt0XiZtFEi9x\r\nContent-Disposition: form-data; name=\"IsPin\"\r\n\r\nfalse\r\n------WebKitFormBoundary3VBWtt0XiZtFEi9x\r\nContent-Disposition: form-data; name=\"TypeId\"\r\n\r\n104\r\n------WebKitFormBoundary3VBWtt0XiZtFEi9x--\r\n","method":"POST","mode":"cors"});