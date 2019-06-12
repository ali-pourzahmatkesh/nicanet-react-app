import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import { BounceLoader } from 'react-spinners';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title, LoadingWrapprer } from '../Components/Styled';
import Radio from 'components/Radio/RadioComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';
import CasePhotoUploader from '../Components/CasePhotoUploader';
import { CaseApi } from 'Api/CaseApi';
import styled from 'styled-components';
import ContinueButton from '../Components/ContinueButton';

const CasePhotoUploaderWrapper = styled.div`
  margin-top: 1rem;
`;

interface AddCaseStepFourFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

function AddCaseStepFourForm(props: AddCaseStepFourFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tree, setTree] = useState<any[]>([]);
  const [formTree, setFormTree] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    form: { getFieldDecorator, validateFields },
    onSubmit
  } = props;

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getDiseases();
      if (response.status !== 200) return;
      setTree(response.data);
    };
    effect();
  }, []);

  useEffect(() => {
    const formTree = tree.map((node: any) => {
      return (
        <Drawer key={node.Title} title={node.Title}>
          <PaddedWrapper>
            {node.Children.map((childNode: any) => {
              switch (childNode.Level) {
                case 'Caption':
                  return (
                    <Title key={childNode.DiseaseId.toString()} primary>
                      {childNode.Title}
                    </Title>
                  );
                case 'RadioItem':
                  return (
                    <CaseFormItem key={childNode.DiseaseId.toString()}>
                      {getFieldDecorator(`disease_${childNode.DiseaseId}`)(
                        <Radio
                          label={childNode.Title}
                          options={[
                            { name: 'Yes', value: true },
                            { name: 'No', value: false }
                          ]}
                        />
                      )}
                    </CaseFormItem>
                  );
                case 'TextItem':
                  return (
                    <CaseFormItem key={childNode.DiseaseId.toString()}>
                      {getFieldDecorator(`disease_${childNode.DiseaseId}`)(
                        <Textarea
                          key={childNode.DiseaseId.toString()}
                          placeholder="Note"
                        />
                      )}
                    </CaseFormItem>
                  );
                default:
                  return null;
              }
            })}
          </PaddedWrapper>
        </Drawer>
      );
    });
    setFormTree(formTree);
    if (tree.length > 0) {
      setIsLoading(false);
    }
  });

  if (isLoading)
    return (
      <div>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </div>
    );

  return (
    <div>
      {formTree}
      <CasePhotoUploaderWrapper>
        <CasePhotoUploader presetName="ReviewOfSystem" />
        <ContinueButton isLoading={isSubmitting} onClick={submit} />
      </CasePhotoUploaderWrapper>
    </div>
  );
}

export default createForm({ name: 'AddCaseStepFourForm' })(AddCaseStepFourForm);
