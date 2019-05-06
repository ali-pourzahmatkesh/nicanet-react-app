import React from 'react'
import { createForm } from 'rc-form';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title } from '../Components/Styled';
import Radio from 'components/Radio/RadioComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';

interface AddCaseStepFiveFormOneProps {
  form: any
}

function AddCaseStepFiveFormOne(props: AddCaseStepFiveFormOneProps) {

  const {
    getFieldDecorator
  } = props.form;

  return (
    <div>

      <Drawer title="Hematologic">
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

      <Drawer title="Blood Gas">
        hi bitch
      </Drawer>
      
      <Drawer title="Biochemistry">
        hi bitch
      </Drawer>
      
      <Drawer title="Gastrointestinal Function">
        hi bitch
      </Drawer>
      
      <Drawer title="Cardiac Enzymes">
        hi bitch
      </Drawer>
      
      <Drawer title="Lipid Profile">
        hi bitch
      </Drawer>
      
      <Drawer title="Hormones">
        hi bitch
      </Drawer>
      
      <Drawer title="Body Fluid Analysis">
        hi bitch
      </Drawer>
      
      <Drawer title="Cultures">
        hi bitch
      </Drawer>
      
      <Drawer title="Biopsy Reports">
        hi bitch
      </Drawer>
      
      <Drawer title="Blood Bank">
        hi bitch
      </Drawer>
    </div>
  )
}


export default createForm({ name: 'AddCaseStepFiveFormOne' })(AddCaseStepFiveFormOne);
