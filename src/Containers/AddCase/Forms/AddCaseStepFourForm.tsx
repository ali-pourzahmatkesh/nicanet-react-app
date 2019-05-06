import React, { useState } from 'react'
import { createForm } from 'rc-form';
import PhotoUploader, { Photo } from 'components/PhotoUploader/PhotoUploaderComponent';
import Picker from 'components/Picker/PickerComponent';
import CameraSilver from 'Assets/CameraSilver.svg'
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title } from '../Components/Styled';
import Radio from 'components/Radio/RadioComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';

interface AddCaseStepFourFormProps {
  form: any
}

function AddCaseStepFourForm(props: AddCaseStepFourFormProps) {
  const [photos, setPhotos] = useState<Photo[]>([])

  const {
    getFieldDecorator
  } = props.form;

  return (
    <div>

      <Drawer title="Skin">
        <PaddedWrapper>
          <Title primary>Review of System (ROS):</Title>
          <CaseFormItem>
            {getFieldDecorator('Rashes')(
              <Radio label="Rashes" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Ulcers and Lesions')(
              <Radio label="Ulcers and Lesions" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Itching')(
              <Radio label="Itching" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
            )}
          </CaseFormItem>
          <Title primary>Physical Examination (Ph/E):</Title>
          <CaseFormItem>
            {getFieldDecorator('Pallor')(
              <Radio label="Pallor" options={[{ name: 'Yes', value: 0 }, { name: 'No', value: 1 }]} />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Note')(
              <Textarea placeholder="Note" />
            )}
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="Head">
        hi bitch
      </Drawer>
      
      <Drawer title="Ear">
        hi bitch
      </Drawer>
      
      <Drawer title="Eye">
        hi bitch
      </Drawer>
      
      <Drawer title="Nose and Sinuses">
        hi bitch
      </Drawer>
      
      <Drawer title="Mouth and Pharynx">
        hi bitch
      </Drawer>
      
      <Drawer title="Neck and Lymph Nodes">
        hi bitch
      </Drawer>
      
      <Drawer title="Breasts and Axilla">
        hi bitch
      </Drawer>
      
      <Drawer title="Chest and Lungs">
        hi bitch
      </Drawer>
      
      <Drawer title="Cardiovascular">
        hi bitch
      </Drawer>
      
      <Drawer title="Abdomen">
        hi bitch
      </Drawer>
      
      <Drawer title="Peripheral Vessels">
        hi bitch
      </Drawer>
      
      <Drawer title="Urinary System / Rectum / Prostate">
        hi bitch
      </Drawer>
      
      <Drawer title="Reproductive System">
        hi bitch
      </Drawer>
      
      <Drawer title="Musculoskeletal">
        hi bitch
      </Drawer>
      
      <Drawer title="Psychiatry">
        hi bitch
      </Drawer>
      
      <Drawer title="Neurologic">
        hi bitch
      </Drawer>
      
      <Drawer title="Hematologic">
        hi bitch
      </Drawer>
      
      <Drawer title="Endocrine">
        hi bitch
      </Drawer>

      <PhotoUploader
        photos={photos}
        Picker={(onClick) => <Picker title="Upload a Photo" onClick={() => onClick()} iconSource={CameraSilver} />}
        onAddPhoto={photo => setPhotos(prevPhotos => [...prevPhotos, photo])}
        onDeletePhoto={photoIndex => setPhotos([ ...photos ].filter((p, index) => index !== photoIndex))}
      />
    </div>
  )
}


export default createForm({ name: 'AddCaseStepFourForm' })(AddCaseStepFourForm);
