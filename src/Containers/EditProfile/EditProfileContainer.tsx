import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';
import Input from 'components/Input/InputComponent';
import Select from 'components/Select/SelectComponent';
import AsyncSelect from 'react-select/lib/Async';
import Textarea from 'components/Textarea/TextareaComponent';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Layout from 'components/Partials/Layout';
import { ConfigApi } from 'Api/ConfigApi';
import { UsersApi } from 'Api/UsersApi';
import { RouteComponentProps } from 'react-router';
import { passwordValidation } from '../../utils/validation';
import avatarPhoto from '../../Assets/avatar.jpg';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import PhotoUploader, {
  Photo
} from 'components/PhotoUploader/PhotoUploaderComponent';

const ProfileFormItem = styled.div`
  margin: 1.8rem 0;
`;

const ProfileFormImageItem = styled.div`
  margin: 1.8rem 0;
  text-align: center;
  min-height: 180px;
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 90px;
  border: solid 1px #eeeeee;
`;

const Title = styled.div<{ primary?: boolean }>`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: ${props => (props.primary ? '#5498a9' : '#212121')};
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.8rem 0;
  background-color: #263551;
  cursor: pointer;
`;

const ErrorMesseage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const UploadPhoto = styled.div`
  color: #5498a9;
  margin-top: 0.5rem;
  display: inline-block;
  cursor: pointer;
`;

type EditProfileContainerProps = {
  form: any;
};

const EditProfileContainer: React.FC<
  EditProfileContainerProps & RouteComponentProps
> = props => {
  const [major, setMajor] = useState([]);
  const [university, setUniversity] = useState({ UniversityId: '' });
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    getFieldError,
    getFieldDecorator,
    setFieldsInitialValue
  } = props.form;

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await ConfigApi.getConfig(13);
        setMajor(
          response.data.map((item: any) => ({
            name: item.ConfigName,
            value: item.ConfigId
          }))
        );
      } catch (_) {}
    };
    effect();
  }, []);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await UsersApi.getCurrentUser();
        if (response.status === 200) {
          const data = response.data;
          setUser(data);
          setUniversity({ UniversityId: data.UniversityId });
        }
      } catch (_) {}
    };
    effect();
  }, [setFieldsInitialValue]);

  if (major.length === 0 || user === null)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  const onSelectUniversity = ({ value }: { value: any }) => {
    setUniversity(value);
  };

  const loadUniversities = async (inputValue: string, callback: Function) => {
    const response = await UsersApi.getUniversities(inputValue);
    if (response.status !== 200) return;
    const options = response.data.map((university: any) => ({
      value: university,
      label: university.EnName
    }));
    callback(options);
  };

  const onSubmit = (selectedUniversity: any, GroupId: null) => {
    props.form.validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      if (!isValid(values)) {
        return;
      }
      try {
        setIsSubmitting(true);
        const UniversityId =
          selectedUniversity && selectedUniversity.UniversityId
            ? selectedUniversity.UniversityId
            : '';

        const params = {
          UniversityId,
          ...values,
          // GroupId: values.GroupId || GroupId
        };

        const { status } = await UsersApi.editUser(params);
        if (status !== 204) throw status;
        toast.success('Profile Updated Successfully', {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          setIsSubmitting(false);
          props.history.push('/profile');
        }, 4000);
      } catch (_) {
        setCurrentPasswordError('Current Password is not true!!');
        setIsSubmitting(false);
      }
    });
  };

  const isValid = (values: any) => {
    let hasError = false;

    setNewPasswordError('');
    setPasswordRepeatError('');
    setCurrentPasswordError('');

    const { PassKey, passwordRepeat, VerificationCode } = values;

    if (PassKey && !passwordValidation(PassKey)) {
      setNewPasswordError('At least 6 characters.');
      hasError = true;
    } else if (PassKey && PassKey !== passwordRepeat) {
      setPasswordRepeatError("Password and confirm password don't match");
      hasError = true;
    } else if (
      PassKey &&
      passwordRepeat &&
      passwordRepeat === PassKey &&
      !VerificationCode
    ) {
      setCurrentPasswordError('Please full current password');
      hasError = true;
    }

    if (!hasError) {
      return true;
    }

    return false;
  };

  const uploadPhoto = async (photo: Photo) => {
    try {
      setIsLoading(true);
      const bodyFormData = new FormData();

      const image = new File([photo.file], photo.file.name, {
        type: photo.file.type
      });
      bodyFormData.append('file', image);

      const reponse = await UsersApi.uploadUserPhoto(bodyFormData);
      if (reponse.status === 204) setPhotos([photo]);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const {
    FirstName,
    LastName,
    Group,
    UniversityNameEn,
    Bio,
    GroupId,
    ImageUrl
  } = user;
  const { ConfigName } = Group;
  return (
    <Layout>
      <ProfileFormImageItem>
        {photos.length > 0 ? (
          <div>
            {photos.map((photo, index) => {
              if (photo.previewUrl === null) return null;

              return (
                <Avatar
                  key={photo.previewUrl.toString()}
                  src={photo.previewUrl.toString()}
                />
              );
            })}{' '}
          </div>
        ) : (
          <Avatar
            src={ImageUrl ? `${API_FILES_BASE_URL}/${ImageUrl}` : avatarPhoto}
          />
        )}
        <PhotoUploader
          isLoading={isLoading}
          photos={photos}
          Picker={onClick => (
            <UploadPhoto onClick={() => onClick()}>Edit Photo</UploadPhoto>
          )}
          onAddPhoto={photo => uploadPhoto(photo)}
          onDeletePhoto={photoIndex =>
            setPhotos([...photos].filter((p, index) => index !== photoIndex))
          }
          preview={false}
        />
      </ProfileFormImageItem>

      <ProfileFormItem>
        {getFieldDecorator('FirstName', {
          rules: [{ required: true, message: 'First Name is required' }],
          initialValue: FirstName
        })(<Input placeholder="First Name" />)}
        {getFieldError('FirstName') && (
          <ErrorMesseage>{getFieldError('FirstName').join(', ')}</ErrorMesseage>
        )}
      </ProfileFormItem>

      <ProfileFormItem>
        {getFieldDecorator('LastName', {
          rules: [{ required: true, message: 'Last Name is required' }],
          initialValue: LastName
        })(<Input placeholder="Last Name" />)}
        {getFieldError('LastName') && (
          <ErrorMesseage>{getFieldError('LastName').join(', ')}</ErrorMesseage>
        )}
      </ProfileFormItem>
      <ProfileFormItem>
        {getFieldDecorator('GroupId', { initialValue: GroupId })(
          <Select options={major} placeholder={'Major'} />
          // <Select options={major} placeholder={ConfigName || 'Major'} />
        )}
      </ProfileFormItem>
      <ProfileFormItem>
        <AsyncSelect
          placeholder={UniversityNameEn || 'University or Academic Center'}
          onChange={(data: any) => onSelectUniversity(data)}
          cacheOptions
          loadOptions={loadUniversities}
          defaultOptions
        />
      </ProfileFormItem>
      <ProfileFormItem>
        {getFieldDecorator('Bio', {
          initialValue: Bio
        })(<Textarea placeholder={Bio || 'Bio'} />)}
      </ProfileFormItem>
      <Title>Change Password</Title>
      <ProfileFormItem>
        {getFieldDecorator('VerificationCode')(
          <Input
            placeholder="Current Password"
            type="password"
            onChange={() => {
              setCurrentPasswordError('');
            }}
          />
        )}
        {currentPasswordError && (
          <ErrorMesseage>{currentPasswordError}</ErrorMesseage>
        )}
      </ProfileFormItem>
      <ProfileFormItem>
        {getFieldDecorator('PassKey')(
          <Input
            placeholder="New Password"
            type="password"
            onChange={() => {
              setNewPasswordError('');
            }}
          />
        )}
        {newPasswordError && <ErrorMesseage>{newPasswordError}</ErrorMesseage>}
      </ProfileFormItem>
      <ProfileFormItem>
        {getFieldDecorator('passwordRepeat')(
          <Input
            placeholder="Confirm New Password"
            type="password"
            onChange={() => {
              setPasswordRepeatError('');
            }}
          />
        )}
        {passwordRepeatError && (
          <ErrorMesseage>{passwordRepeatError}</ErrorMesseage>
        )}
      </ProfileFormItem>

      <Button onClick={() => onSubmit(university, GroupId)}>
        {isSubmitting ? (
          <PulseLoader sizeUnit="rem" size={0.5} color="#fff" />
        ) : (
          'ApplyChanges'
        )}
      </Button>
    </Layout>
  );
};

export default createForm({ name: 'EditProfileContainer' })(
  EditProfileContainer
);
