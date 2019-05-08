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
import { ConfigApi } from 'Api/ConfigApi';

type AddDrugFormProps = {
  form: any
  onSubmit: (values: any) => void
}

type AddDrugFormState = {
  isOpen: boolean
  frequencies: any[]
  routes: any[]
}

class AddDrugForm extends Component<AddDrugFormProps, AddDrugFormState> {
  state = {
    isOpen: false,
    frequencies: [],
    routes: []
  }

  componentDidMount = () => {
    this.getFrequencies()
    this.getRoutes()
  }

  getFrequencies = async () => {
    try {
      const response = await ConfigApi.getConfig(90)
      this.setState({
        frequencies: response.data.map((item: any) => ({ name: item.ConfigName, value: item.ConfigId }))
      })
    } catch (_) {}
  }

  getRoutes = async () => {
    try {
      const response = await ConfigApi.getConfig(41)
      this.setState({
        routes: response.data.map((item: any) => ({ name: item.ConfigName, value: item.ConfigId }))
      })
    } catch (_) {}
  }

  render () {
    const { isOpen, frequencies, routes } = this.state
    const {
      form: {
        getFieldDecorator,
        validateFields,
      },
      onSubmit,
    } = this.props;    

    const submit = () => {
      validateFields(async (error: any, values: any) => {
        if (error !== null) return
        try {
          onSubmit(values)
        } catch (_) {}
      })
    }

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
            {getFieldDecorator('Manufacture')(
              <Input placeholder="Manufacturer" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('FrequencyId')(
              <Select options={frequencies} placeholder="Frequency" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('RouteId')(
              <Select options={routes} placeholder="Route" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Indication')(
              <Input placeholder="Indication" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('BatchNo')(
              <Input placeholder="Batch Number" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Description')(
              <Textarea placeholder="Description" />
            )}
          </CaseFormItem>
          <ContinueButton onClick={submit} title="Add Drug" />
        </Modal>
      </Fragment>
    );
  }
}

export default createForm({ name: 'AddDrugForm' })(AddDrugForm);
