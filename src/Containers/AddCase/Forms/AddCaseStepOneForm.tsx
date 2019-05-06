import React, { useState } from 'react'
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import { Title, PaddedWrapper, FormRow, FromCol } from '../Components/Styled';
import PhotoUploader, { Photo } from 'components/PhotoUploader/PhotoUploaderComponent';
import Picker from 'components/Picker/PickerComponent';
import CameraSilver from 'Assets/CameraSilver.svg'
import Radio from 'components/Radio/RadioComponent';
import Select from 'components/Select/SelectComponent';

interface AddCaseStepOneFormProps {
  form: any
}

const mockSelectValue = new Array(200).fill(null).map((item, index) => {
  const weight = 200 - index
  return { value: weight.toString(), name: `${weight} KG` }
}).slice(0, -1)

function AddCaseStepOneForm(props: AddCaseStepOneFormProps) {
  const [photos, setPhotos] = useState<Photo[]>([])

  const {
    getFieldDecorator
  } = props.form;

  return (
    <div>
      <Title>Chief Complaint (CC):</Title>
      <CaseFormItem>
        {getFieldDecorator('test1')(
          <Textarea placeholder="Write Description" />
          )}
      </CaseFormItem>
      <PhotoUploader
        photos={photos}
        Picker={(onClick) => <Picker title="Upload a Photo" onClick={() => onClick()} iconSource={CameraSilver} />}
        onAddPhoto={photo => setPhotos(prevPhotos => [...prevPhotos, photo])}
        onDeletePhoto={photoIndex => setPhotos([ ...photos ].filter((p, index) => index !== photoIndex))}
      />
      <Title>Present Illness (PI):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          {getFieldDecorator('Chills')(
            <Radio label="Chills" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('Pain')(
            <Radio label="Pain" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('Fatigue')(
            <Radio label="Fatigue" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
          )}
        </CaseFormItem>
      </PaddedWrapper>

      <Title>General Appearance (GA):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          {getFieldDecorator('test')(
            <Radio label="test" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('test2')(
            <Radio label="test2" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
          )}
        </CaseFormItem>
      </PaddedWrapper>
      <Title>Vital Sign (VS):</Title>
      <CaseFormItem>
        <FormRow>
          <FromCol>
            {getFieldDecorator('BP')(
              <Select options={mockSelectValue} placeholder="BP" />
            )}
          </FromCol>
          <FromCol>
            {getFieldDecorator('PR')(
              <Select options={mockSelectValue} placeholder="PR" />
            )}
          </FromCol>
        </FormRow>
      </CaseFormItem>
      <CaseFormItem>
        <FormRow>
          <FromCol>
            {getFieldDecorator('RR')(
              <Select options={mockSelectValue} placeholder="RR" />
            )}
          </FromCol>
          <FromCol>
            {getFieldDecorator('Tempreture')(
              <Select options={mockSelectValue} placeholder="Tempreture" />
            )}
          </FromCol>
        </FormRow>
      </CaseFormItem>
    </div>
  )
}


export default createForm({ name: 'AddCaseStepOneForm' })(AddCaseStepOneForm);
