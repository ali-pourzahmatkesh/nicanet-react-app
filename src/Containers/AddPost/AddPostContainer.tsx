import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { HOME_ROUTE } from 'router/RouterConstants';
import { RouteComponentProps } from 'react-router';
import DetectLanguage from '../../components/DetectLanguage/DetectLanguageComponent';

import Layout from 'components/Partials/Layout';
import PencilIconSource from 'Assets/Pencil.svg';
import GalleryIconSource from 'Assets/Gallery.svg';
import PhotoUploader, {
  Photo
} from 'components/PhotoUploader/PhotoUploaderComponent';
import { UsersApi } from 'Api/UsersApi';
import { ContentApi } from 'Api/ContentApi';

const PencilIcon = styled.img``;

const Heading = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #212121;
`;

const Container = styled.div`
  padding: 1rem;
`;

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
`;

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
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FooterIcon = styled.img``;

const Button = styled.div`
  background-color: #263551;
  display: flex;
  color: #fff;
  padding: 0 3rem;
  border-radius: 0.5rem;
  align-items: center;
  height: 2.5rem;
`;

const ErrorMesseage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const SelectWrapper = styled.div`
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

interface AddPostContainerProps {
  form: any;
}

function AddPostContainer(props: AddPostContainerProps & RouteComponentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [tagsError, setTagsError] = useState('');
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const { getFieldError, getFieldDecorator, getFieldsValue } = props.form;

  const formValues = getFieldsValue();
  console.log('formValues', formValues);

  useEffect(() => {
    const effect = async () => {
      const response = await ContentApi.getTags();
      if (response.status !== 200) return;
      setTags(
        response.data.map((tag: any) => ({
          label: tag.TagTitle,
          value: tag.TagId
        }))
      );
    };
    effect();
  }, []);

  const onSubmit = () => {
    props.form.validateFields(async (error: any) => {
      if (selectedTags.length === 0) setTagsError('Plz select tags');
      if (error !== null || selectedTags.length === 0) return;
      try {
        setIsSubmitting(true);
        const bodyFormData = new FormData();

        const formValues = props.form.getFieldsValue();

        Object.keys(formValues)
          .filter(key => key !== 'Tags')
          .map(key => {
            bodyFormData.append(key, formValues[key]);
            return key;
          });

        const selectedPostTags = await selectedTags
          .map((tag: any) => tag.value)
          .join(',');

        // @ts-ignore
        bodyFormData.append('CategoryId', 1);
        // @ts-ignore
        bodyFormData.append('IsPin', false);
        // @ts-ignore
        bodyFormData.append('TypeId', 104);
        bodyFormData.append('Tags', selectedPostTags);

        if (photos.length > 0) {
          const image = new File([photos[0].file], 'PostImage.jpg', {
            type: photos[0].file.type
          });
          bodyFormData.append('file', image);
        }

        const { status } = await UsersApi.addPost(bodyFormData);
        if (status !== 204) throw new Error(status.toString());
        toast.success('Post has been successfully published', {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          setIsSubmitting(false);
          props.history.push(HOME_ROUTE);
        }, 4000);
        // console.log('response', response);
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <Layout>
      <Container>
        <Heading>
          <PencilIcon src={PencilIconSource} />
          <Title>Title</Title>
        </Heading>
        <DetectLanguage value={formValues.Subject}>
          {getFieldDecorator('Subject', {
            rules: [{ required: true, message: 'Title is required' }],
            initialValue: ''
          })(<Input placeholder="Enter title..." />)}
          {getFieldError('Subject') && (
            <ErrorMesseage>{getFieldError('Subject').join(', ')}</ErrorMesseage>
          )}
        </DetectLanguage>
        <DetectLanguage value={formValues.ContentText}>
          {getFieldDecorator('ContentText', { initialValue: '' })(
            <TextArea placeholder="Enter text..." />
          )}
        </DetectLanguage>

        {getFieldDecorator('Tags', {})(
          <SelectWrapper>
            <Select
              isMulti
              options={tags}
              placeholder="Select tags"
              onChange={(data: any) => {
                setSelectedTags(data);
                setTagsError('');
              }}
            />
            {tagsError && <ErrorMesseage>{tagsError}</ErrorMesseage>}
          </SelectWrapper>
        )}
        <Footer>
          <div>
            <PhotoUploader
              photos={photos}
              Picker={onClick => (
                <FooterIcon onClick={() => onClick()} src={GalleryIconSource} />
              )}
              onAddPhoto={photo => setPhotos([photo])}
              onDeletePhoto={photoIndex =>
                setPhotos(
                  [...photos].filter((p, index) => index !== photoIndex)
                )
              }
            />
          </div>
          <Button onClick={onSubmit}>
            {isSubmitting ? (
              <PulseLoader sizeUnit="rem" size={0.5} color="#fff" />
            ) : (
              'Post'
            )}
          </Button>
        </Footer>
      </Container>
    </Layout>
  );
}

export default createForm({ name: 'AddPostContainer' })(AddPostContainer);
