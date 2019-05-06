import React from 'react'
import { createForm } from 'rc-form';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title } from '../Components/Styled';
import Radio from 'components/Radio/RadioComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';

interface AddCaseStepFiveFormTwoProps {
  form: any
}

function AddCaseStepFiveFormTwo(props: AddCaseStepFiveFormTwoProps) {

  const {
    getFieldDecorator
  } = props.form;

  return (
    <div>

      <Drawer title="X - Ray">
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

      <Drawer title="Sonography">
        hi bitch
      </Drawer>
      
      <Drawer title="CT - Scan">
        hi bitch
      </Drawer>
      
      <Drawer title="MRI">
        hi bitch
      </Drawer>
      
      <Drawer title="Others">
        hi bitch
      </Drawer>
    </div>
  )
}


export default createForm({ name: 'AddCaseStepFiveFormTwo' })(AddCaseStepFiveFormTwo);
