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

const ProfileFormItem = styled.div`
  margin: 1.8rem 0;
`;

export const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const Title = styled.div<{ primary?: boolean }>`
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

type EditProfileContainerProps = {
  form: any;
};

const EditProfileContainer: React.FC<EditProfileContainerProps & RouteComponentProps> = props => {
  const [major, setMajor] = useState([]);
  console.log('props', props);
  const [university, setUniversity] = useState({ UniversityId: '' });
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getFieldError, getFieldDecorator, setFieldsInitialValue } = props.form;

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
          setFieldsInitialValue({ GroupId: data.GroupId});
        }
      } catch (_) {}
    };
    effect();
  }, []);

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

  const onSubmit = (selectedUniversity: any) => {
    props.form.validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        const UniversityId =
          selectedUniversity && selectedUniversity.UniversityId
            ? selectedUniversity.UniversityId
            : '';

        console.log('values', values);
        const params = {
          UniversityId,
          ...values
        };

        const { status } = await UsersApi.editUser(params);
        if (status !== 200) throw status;
        // toast.success('Profile Updated Successfully', {
        //   position: toast.POSITION.TOP_CENTER
        // });
        setTimeout(() => {
          setIsSubmitting(false);
          console.log('props', props);
          props.history.push('/profile');
        }, 4000);
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  console.log('user', user);
  const { FirstName, LastName, Group, UniversityNameEn, Bio } = user;
  const { ConfigName } = Group;
  console.log('ConfigName', ConfigName);

  return (
    <Layout>
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
        {getFieldDecorator('GroupId')(
          <Select options={major} placeholder={ConfigName || 'Major'} />
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
          <Input placeholder="Current Password" type="password" />
        )}
      </ProfileFormItem>
      <ProfileFormItem>
        {getFieldDecorator('PassKey')(
          <Input placeholder="New Password" type="password" />
        )}
      </ProfileFormItem>
      <ProfileFormItem>
        {getFieldDecorator('passwordRepeat')(
          <Input placeholder="Confirm New Password" type="password" />
        )}
      </ProfileFormItem>

      <Button onClick={() => onSubmit(university)}>
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
