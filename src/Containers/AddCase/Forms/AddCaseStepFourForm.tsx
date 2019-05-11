import React, { useState, useEffect } from 'react'
import { createForm } from 'rc-form';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title } from '../Components/Styled';
import Radio from 'components/Radio/RadioComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';
import CasePhotoUploader from '../Components/CasePhotoUploader';
import { CaseApi } from 'Api/CaseApi';
import ContinueButton from '../Components/ContinueButton';

interface AddCaseStepFourFormProps {
  form: any
  onSubmit: (values: any) => Promise<any>
}

function AddCaseStepFourForm(props: AddCaseStepFourFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tree, setTree] = useState<any[]>([])
  const [formTree, setFormTree] = useState<any>()
  const {
    form: {
      getFieldDecorator,
      validateFields,
    },
    onSubmit,
  } = props;

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return
      try {
        setIsSubmitting(true)
        await onSubmit(values)
      } catch (_) {
        setIsSubmitting(false)
      }
    });
  }

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getDiseases()
      if (response.status !== 200) return
      setTree(response.data)
    }
    effect()
  }, [])

  useEffect(
    () => {
      const formTree = tree.map((node: any) => {
        return (
        <Drawer key={node.Title} title={node.Title}>
          <PaddedWrapper>
            {
              node.Children.map((childNode: any) => {
                switch (childNode.Level) {
                  case 'Caption':
                    return <Title key={childNode.DiseaseId.toString()} primary>{childNode.Title}</Title>
                  case 'RadioItem':
                    return (
                      <CaseFormItem key={childNode.DiseaseId.toString()}>
                        {getFieldDecorator(`disease_${childNode.DiseaseId}`)(
                          <Radio label={childNode.Title} options={[{ name: 'Yes', value: true }, { name: 'No', value: false }]} />
                        )}
                      </CaseFormItem>
                    )
                  case 'TextItem':
                  return (
                    <CaseFormItem key={childNode.DiseaseId.toString()}>
                      {getFieldDecorator(`disease_${childNode.DiseaseId}`)(
                        <Textarea key={childNode.DiseaseId.toString()} placeholder="Note" />
                      )}
                    </CaseFormItem>
                  )     
                  default:
                    return null
                }
              })
            }
            
          </PaddedWrapper>
        </Drawer>
        )
      })
      setFormTree(formTree)
    }
  );
  

  return (
    <div>
      {
        formTree
      }
      <CasePhotoUploader presetName="ReviewOfSystem" />
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  )
}


export default createForm({ name: 'AddCaseStepFourForm' })(AddCaseStepFourForm);
