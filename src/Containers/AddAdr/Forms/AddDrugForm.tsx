import React, { Fragment, Component } from 'react';
import { createForm } from 'rc-form';
import Modal from 'components/Modal/ModalComponent';
import Picker from 'components/Picker/PickerComponent';
import AsyncSelect from 'react-select/lib/Async';
import DrugIcon from 'Assets/Drug.svg';
import CaseFormItem from '../../AddCase/Forms/CaseFormItem';
import Input from 'components/Input/InputComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import Select from 'components/Select/SelectComponent';
import ContinueButton from '../../AddCase/Components/ContinueButton';
import { ConfigApi } from 'Api/ConfigApi';
import { CaseApi } from 'Api/CaseApi';
import DatePicker from 'components/DatePicker/DatePicker';

type AddDrugFormProps = {
  placeholder?: string
  form: any
  onSubmit: (values: any) => void
}

type AddDrugFormState = {
  isOpen: boolean
  frequencies: any[]
  routes: any[]
  DrugId: number | null
  DrugName: string
  dosages: any[]
}

class AddDrugForm extends Component<AddDrugFormProps, AddDrugFormState> {
  state = {
    isOpen: false,
    frequencies: [],
    routes: [],
    DrugId: null,
    DrugName: '',
    dosages: [],
  }

  componentDidMount = () => {
    this.getFrequencies()
    this.getRoutes()
    this.getDosages()
  }

  getFrequencies = async () => {
    try {
      const response = await ConfigApi.getConfig(90)
      this.setState({
        frequencies: response.data.map((item: any) => ({ name: item.ConfigName, value: item.ConfigId }))
      })
    } catch (_) {}
  }

  getDosages = async () => {
    try {
      const response = await ConfigApi.getConfig(19)
      this.setState({
        dosages: response.data.map((item: any) => ({ name: item.ConfigName, value: item.ConfigId }))
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

  onSelectDrug = ({ value }: { value: any }) => {
    this.setState({
      DrugName: value.Name,
      DrugId: value.DrugId
    })
  }
  
  loadDrugs = async (inputValue: string, callback: Function) => {
    const response = await CaseApi.searchDrugs(inputValue)
    if (response.status !== 200) return
    const options = response.data.map((drug: any) => ({
      value: drug,
      label: drug.Name 
    }))
    callback(options)
  };

  render () {
    const { isOpen, frequencies, dosages, routes } = this.state
    const {
      form: {
        getFieldDecorator,
        validateFields,
      },
      onSubmit,
      placeholder,
    } = this.props;    

    const submit = () => {
      validateFields(async (error: any, values: any) => {
        const { DrugId, DrugName } = this.state
        if (DrugId === null) return
        if (error !== null) return
        try {
          onSubmit({ ...values, DosageUnitId: values.DosageUnitId, AmountOfDose: +values.AmountOfDose, FrequencyId: +values.FrequencyId, RouteId: +values.RouteId, DrugId, DrugName })
          this.setState({ isOpen: false })
        } catch (_) {}
      })
    }

    return (
      <Fragment>
        <Picker title="Add a Drug" iconSource={DrugIcon} onClick={() => this.setState({ isOpen: true })} />
        <Modal isOpen={isOpen} title="Add a Drug" onClose={() => this.setState({ isOpen: false })}>
          <CaseFormItem>
            <AsyncSelect
              placeholder={placeholder || "Select a drug"}
              onChange={(data: any) => this.onSelectDrug(data)}
              cacheOptions
              loadOptions={this.loadDrugs}
              defaultOptions
            />
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
            {getFieldDecorator('StartDate')(
              <DatePicker placeholder="Start Date" id="AddDrugForm-StartDate" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('EndDate')(
              <DatePicker placeholder="End Date" id="AddDrugForm-EndDate" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Indication')(
              <Input placeholder="Indication" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('AmountOfDose')(
              <Input placeholder="Amount Of Dose" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('DosageUnitId')(
              <Select placeholder="Dosage Unit" options={dosages} />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('BatchNo')(
              <Input placeholder="Batch Number" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('Explanation')(
              <Textarea placeholder="Explanation" />
            )}
          </CaseFormItem>
          <ContinueButton onClick={submit} title="Add Drug" />
        </Modal>
      </Fragment>
    );
  }
}

export default createForm({ name: 'AdrAddDrugForm' })(AddDrugForm);
