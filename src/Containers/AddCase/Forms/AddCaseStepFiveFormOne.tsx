import React, { useState, useEffect, Fragment } from 'react'
import { createForm } from 'rc-form';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title } from '../Components/Styled';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';
import { CaseApi } from 'Api/CaseApi';
import Input from 'components/Input/InputComponent';
import CasePhotoUploader from '../Components/CasePhotoUploader';
import Select from 'components/Select/SelectComponent';

interface AddCaseStepFiveFormOneProps {
  form: any
}

function AddCaseStepFiveFormOne(props: AddCaseStepFiveFormOneProps) {
  const [examinations, setExaminations] = useState<any[]>([])
  const [tree, setTree] = useState<any>(null)

  const {
    form: {
      getFieldDecorator,
      getFieldsValue,
    },
  } = props;

  setTimeout(() => {
    localStorage.setItem('AddCaseStepFiveFormOne', JSON.stringify(getFieldsValue()))
  }, 0)

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getExaminationTypes()
      if (response.status !== 200) return
      setExaminations(response.data)
    }
    effect()
  }, [])

  useEffect(() => {
    const formTree = examinations.map((node: any) => {
      return (
      <Drawer key={node.Title} title={node.Title}>
        <PaddedWrapper>
          {
            node.Children.map((childNode: any) => {
              switch (childNode.Level) {
                case 'Caption':
                return ( 
                  <Fragment key={childNode.ExaminationTypeId.toString()}>
                    <Title>{childNode.Title}</Title>
                    {
                      childNode.NeedImage &&
                      <CaseFormItem>
                        <CasePhotoUploader presetName={childNode.Title.replace('/', '_')} />
                      </CaseFormItem>
                    }
                  </Fragment>
                )
                case 'TextItem':
                return (
                  <Fragment key={childNode.ExaminationTypeId.toString()}>
                    <CaseFormItem>
                    {
                      childNode.Title === 'Note' &&
                      getFieldDecorator(`Note_ExaminationValue_${childNode.ExaminationTypeId}`)(
                        <Textarea
                          placeholder="Note"
                        />
                      )
                    }
                    {
                      childNode.Title !== 'Note' &&
                      getFieldDecorator(`ExaminationValue_${childNode.ExaminationTypeId}`)(
                        <Input 
                          placeholder={`${childNode.Title} ${childNode.Unit.UnitId !== 0 ? `(${childNode.Unit.Title})` : ''}`} 
                        />
                      )
                    }
                    </CaseFormItem>
                    {
                      childNode.UnitChild && childNode.UnitChild.length > 0 ?
                        <Fragment>
                          <CaseFormItem>
                            {
                              getFieldDecorator(`Unit_ExaminationValue_${childNode.ExaminationTypeId}`)(
                                <Select placeholder="Unit:" options={childNode.UnitChild.map((unitChild: any) => ({ name: unitChild.Title, value: unitChild.UnitId }))} />
                              )
                            }
                          </CaseFormItem>
                        </Fragment>
                      : getFieldDecorator(`Unit_ExaminationValue_${childNode.ExaminationTypeId}`, { initialValue: childNode.Unit.UnitId })(<div />)
                    }
                    {
                      childNode.NeedImage &&
                      <CasePhotoUploader presetName={childNode.Title.replace('/', '_')} />
                    }
                  </Fragment>
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
    setTree(formTree)
  }, [examinations, getFieldDecorator])

  return (
    <div>
      {tree}
      <Drawer title="Blood Bank">
        <CaseFormItem>
          {
            getFieldDecorator('BloodGroupId')(
              <Select placeholder="Blood Group" options={bloodGroups} />
            )
          }
        </CaseFormItem>
        <CaseFormItem>
          {
            getFieldDecorator('RH')(
              <Select placeholder="Rh" options={rhList} />
            )
          }
        </CaseFormItem>
        <CaseFormItem>
          {
            getFieldDecorator('CrossMatch')(
              <Input placeholder="CrossMatch" />
            )
          }
        </CaseFormItem>
        <CaseFormItem>
          {
            getFieldDecorator('BloodBankNote')(
              <Input placeholder="BloodBankNote" />
            )
          }
        </CaseFormItem>
      </Drawer>
    </div>
  )
}

const bloodGroups = [
  {
    name: 'A',
    value: '141',
  },
  {
    name: 'B',
    value: '142',
  },
  {
    name: 'AB',
    value: '143',
  },
  {
    name: 'O',
    value: '144',
  },
]

const rhList = [
  {
    name: '+',
    value: '1',
  },
  {
    name: '-',
    value: '0',
  },
]

export default createForm({ name: 'AddCaseStepFiveFormOne' })(AddCaseStepFiveFormOne);
