import React, { Fragment, Component } from 'react';
import { createForm } from 'rc-form';
import Modal from 'components/Modal/ModalComponent';
import Picker from 'components/Picker/PickerComponent';
import DrugIcon from 'Assets/Drug.svg';
import CaseFormItem from './CaseFormItem';
import Input from 'components/Input/InputComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import Select from 'components/Select/SelectComponent';
import ContinueButton from '../Components/ContinueButton';

const Weights = new Array(200).fill(null).map((item, index) => {
  const weight = 200 - index
  return { value: weight.toString(), name: `${weight} KG` }
}).slice(0, -1)

type AddDrugFormProps = {
  form: any
}

type AddDrugFormState = {
  isOpen: boolean
}

class AddDrugForm extends Component<AddDrugFormProps, AddDrugFormState> {
  state = {
    isOpen: false
  }

  render () {
    const { isOpen } = this.state
    const {
      getFieldDecorator
    } = this.props.form;

    return (
      <Fragment>
        <Picker title="Add a Drug" iconSource={DrugIcon} onClick={() => this.setState({ isOpen: true })} />
        <Modal isOpen={isOpen} title="Add a Drug" onClose={() => this.setState({ isOpen: false })}>
          <CaseFormItem>
            {getFieldDecorator('test')(
              <Input placeholder="Drug Name" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('test')(
              <Input placeholder="Manufacturer" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Frequency')(
              <Select options={Weights} placeholder="Frequency" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Route')(
              <Select options={Weights} placeholder="Route" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('test')(
              <Input placeholder="Indication" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('test')(
              <Input placeholder="Batch Number" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('test')(
              <Textarea placeholder="Description" />
            )}
          </CaseFormItem>
          <ContinueButton onClick={() => console.log('hello')} title="Add Drug" />
        </Modal>
      </Fragment>
    );
  }
}

export default createForm({ name: 'AddDrugForm' })(AddDrugForm);

