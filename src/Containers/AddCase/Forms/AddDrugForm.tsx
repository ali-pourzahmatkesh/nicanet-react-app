import React, { Fragment, Component } from 'react';
import { createForm } from 'rc-form';
import Modal from 'components/Modal/ModalComponent';
import Picker from 'components/Picker/PickerComponent';
import AsyncSelect from 'react-select/lib/Async';
import DrugIcon from 'Assets/Drug.svg';
import CaseFormItem from './CaseFormItem';
import Input from 'components/Input/InputComponent';
import Textarea from 'components/Textarea/TextareaComponent';
import Select from 'components/Select/SelectComponent';
import ContinueButton from '../Components/ContinueButton';
import styled from 'styled-components';
import { ConfigApi } from 'Api/ConfigApi';
import { CaseApi } from 'Api/CaseApi';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';

type AddDrugFormProps = {
  form: any;
  onSubmit: (values: any) => void;
};

type AddDrugFormState = {
  isOpen: boolean;
  frequencies: any[];
  routes: any[];
  DrugId: number | null;
  DrugName: string;
  drugNameError: string;
};

const ErrorMesseage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

class AddDrugForm extends Component<AddDrugFormProps, AddDrugFormState> {
  state = {
    isOpen: false,
    frequencies: [],
    routes: [],
    DrugId: null,
    DrugName: '',
    drugNameError: ''
  };

  componentDidMount = () => {
    this.getFrequencies();
    this.getRoutes();
  };

  getFrequencies = async () => {
    try {
      const response = await ConfigApi.getConfig(90);
      this.setState({
        frequencies: response.data.map((item: any) => ({
          name: item.ConfigName,
          value: item.ConfigId
        }))
      });
    } catch (_) {}
  };

  getRoutes = async () => {
    try {
      const response = await ConfigApi.getConfig(41);
      this.setState({
        routes: response.data.map((item: any) => ({
          name: item.ConfigName,
          value: item.ConfigId
        }))
      });
    } catch (_) {}
  };

  onSelectDrug = ({ value }: { value: any }) => {
    this.setState({
      DrugName: value.Name,
      DrugId: value.DrugId,
      drugNameError: ''
    });
  };

  loadDrugs = async (inputValue: string, callback: Function) => {
    const response = await CaseApi.searchDrugs(inputValue);
    if (response.status !== 200) return;
    const options = response.data.map((drug: any) => ({
      value: drug,
      label: drug.Name
    }));
    callback(options);
  };

  render() {
    const { isOpen, frequencies, routes } = this.state;
    const {
      form: { getFieldDecorator, validateFields, resetFields, getFieldsValue },
      onSubmit
    } = this.props;
    const formValues = getFieldsValue();

    const submit = () => {
      validateFields(async (error: any, values: any) => {
        const { DrugId, DrugName } = this.state;
        if (DrugId === null) {
          this.setState({ drugNameError: 'Drug Name is required' });
        }
        if (error !== null || DrugId === null) return;
        try {
          onSubmit({
            ...values,
            FrequencyId: +values.FrequencyId,
            RouteId: +values.RouteId,
            DrugId,
            DrugName
          });
          resetFields();

          this.setState(
            {
              DrugId: null,
              DrugName: '',
              drugNameError: ''
            },
            () => {
              this.setState({ isOpen: false });
            }
          );
        } catch (_) {}
      });
    };

    return (
      <Fragment>
        <Picker
          title="Add a Drug"
          iconSource={DrugIcon}
          onClick={() => this.setState({ isOpen: true })}
        />
        <Modal
          isOpen={isOpen}
          title="Add a Drug"
          onClose={() => this.setState({ isOpen: false })}
        >
          <CaseFormItem>
            <AsyncSelect
              placeholder="Select a drug"
              onChange={(data: any) => this.onSelectDrug(data)}
              cacheOptions
              loadOptions={this.loadDrugs}
              defaultOptions
            />
            {this.state.drugNameError && (
              <ErrorMesseage>{this.state.drugNameError}</ErrorMesseage>
            )}
          </CaseFormItem>
          <CaseFormItem>
            <DetectLanguage value={formValues.Manufacture}>
              {getFieldDecorator('Manufacture', { initialValue: '' })(
                <Input placeholder="Manufacturer" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('FrequencyId', { initialValue: '' })(
              <Select options={frequencies} placeholder="Frequency" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            {getFieldDecorator('RouteId', { initialValue: '' })(
              <Select options={routes} placeholder="Route" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            <DetectLanguage value={formValues.Indication}>
              {getFieldDecorator('Indication', { initialValue: '' })(
                <Input placeholder="Indication" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            <DetectLanguage value={formValues.BatchNo}>
              {getFieldDecorator('BatchNo', { initialValue: '' })(
                <Input placeholder="Batch Number" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            <DetectLanguage value={formValues.Description}>
              {getFieldDecorator('Description', { initialValue: '' })(
                <Textarea placeholder="Description" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <ContinueButton onClick={submit} title="Add Drug" />
        </Modal>
      </Fragment>
    );
  }
}

export default createForm({ name: 'AddDrugForm' })(AddDrugForm);
