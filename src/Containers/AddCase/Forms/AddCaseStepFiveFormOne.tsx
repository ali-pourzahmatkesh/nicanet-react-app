import React, { useState, useEffect, Fragment } from 'react';
import { createForm } from 'rc-form';
import Drawer from 'components/Drawer/DrawerComponent';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import { PaddedWrapper, Title, LoadingWrapprer } from '../Components/Styled';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';
import { CaseApi } from 'Api/CaseApi';
import Input from 'components/Input/InputComponent';
import CasePhotoUploader from '../Components/CasePhotoUploader';
import Select from 'components/Select/SelectComponent';
import { setCase, getCase } from '../../../utils/utils';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';

const CaseFormItemesWrapper = styled.div<{ hasUnit?: boolean }>`
  display: ${props => (props.hasUnit ? 'flex' : 'block')};
`;

const InputWrapper = styled.div<{ hasUnit?: boolean }>`
  flex: ${props => (props.hasUnit ? '0.6' : '1')};
`;

const UnitWrapper = styled.div`
  flex: 0.4;
  margin-left: 1rem;
  padding: 0.5rem 0;
`;

interface AddCaseStepFiveFormOneProps {
  form: any;
  caseId: string;
}

function AddCaseStepFiveFormOne(props: AddCaseStepFiveFormOneProps) {
  const [examinations, setExaminations] = useState<any[]>([]);
  const [tree, setTree] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    form: { getFieldDecorator, getFieldsValue, setFieldsValue, getFieldValue },
    caseId
  } = props;

  useEffect(() => {
    const effect = async () => {
      const oldValues = await getCase(caseId);
      setFieldsValue(oldValues);
    };
    effect();
  }, [setFieldsValue, caseId, examinations]);

  const formValues = getFieldsValue();

  useEffect(() => {
    const effect = async () => {
      await setCase(caseId, getFieldsValue());
    };
    effect();
  }, [caseId, formValues, getFieldsValue]);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getExaminationTypes();
      if (response.status !== 200) return;
      setExaminations(response.data);
    };
    effect();
  }, []);

  useEffect(() => {
    const formTree = examinations.map((node: any) => {
      return (
        <Drawer key={node.Title} title={node.Title}>
          <PaddedWrapper>
            {node.Children.map((childNode: any) => {
              switch (childNode.Level) {
                case 'Caption':
                  return (
                    <Fragment key={childNode.ExaminationTypeId.toString()}>
                      <Title>{childNode.Title}</Title>
                      {childNode.NeedImage && (
                        <CaseFormItem>
                          <CasePhotoUploader
                            presetName={childNode.Title.replace('/', '_')}
                            caseId={caseId}
                            fieldName={`${childNode.Title}Photos`}
                          />
                        </CaseFormItem>
                      )}
                    </Fragment>
                  );
                case 'TextItem':
                  return (
                    <Fragment key={childNode.ExaminationTypeId.toString()}>
                      <CaseFormItemesWrapper
                        hasUnit={
                          childNode.UnitChild && childNode.UnitChild.length > 0
                        }
                      >
                        <InputWrapper
                          hasUnit={
                            childNode.UnitChild &&
                            childNode.UnitChild.length > 0
                          }
                        >
                          <CaseFormItem>
                            <DetectLanguage
                              value={
                                formValues[
                                  `Note_ExaminationValue_${
                                    childNode.ExaminationTypeId
                                  }`
                                ]
                              }
                            >
                              {childNode.Title === 'Note' &&
                                getFieldDecorator(
                                  `Note_ExaminationValue_${
                                    childNode.ExaminationTypeId
                                  }`
                                )(<Textarea placeholder="Note" />)}
                            </DetectLanguage>
                            {childNode.Title !== 'Note' &&
                              getFieldDecorator(
                                `ExaminationValue_${
                                  childNode.ExaminationTypeId
                                }`
                              )(
                                <Input
                                  type="number"
                                  pattern="\d*"
                                  placeholder={`${childNode.Title} ${
                                    childNode.Unit.UnitId !== 0
                                      ? `(${childNode.Unit.Title})`
                                      : ''
                                  }`}
                                />
                              )}
                          </CaseFormItem>
                        </InputWrapper>
                        {childNode.UnitChild &&
                        childNode.UnitChild.length > 0 ? (
                          <UnitWrapper>
                            <CaseFormItem>
                              {getFieldDecorator(
                                `Unit_ExaminationValue_${
                                  childNode.ExaminationTypeId
                                }`
                              )(
                                <Select
                                  placeholder={
                                    getFieldValue(
                                      `Unit_ExaminationValue_${
                                        childNode.ExaminationTypeId
                                      }`
                                    ) === undefined
                                      ? 'Unit:'
                                      : ''
                                  }
                                  options={childNode.UnitChild.map(
                                    (unitChild: any) => ({
                                      name: unitChild.Title,
                                      value: unitChild.UnitId
                                    })
                                  )}
                                />
                              )}
                            </CaseFormItem>
                          </UnitWrapper>
                        ) : (
                          getFieldDecorator(
                            `Unit_ExaminationValue_${
                              childNode.ExaminationTypeId
                            }`,
                            { initialValue: childNode.Unit.UnitId }
                          )(<div />)
                        )}
                      </CaseFormItemesWrapper>
                      {childNode.NeedImage && (
                        <CasePhotoUploader
                          presetName={childNode.Title.replace('/', '_')}
                          caseId={caseId}
                          fieldName={`${childNode.Title}Photos`}
                        />
                      )}
                    </Fragment>
                  );
                default:
                  return null;
              }
            })}
          </PaddedWrapper>
        </Drawer>
      );
    });
    setTree(formTree);
    if (examinations.length > 0) {
      setIsLoading(false);
    }
  }, [examinations, getFieldDecorator, getFieldValue, formValues, caseId]);

  if (isLoading)
    return (
      <div>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </div>
    );

  return (
    <div>
      {tree}
      <Drawer title="Blood Bank">
        <CaseFormItem>
          {getFieldDecorator('BloodGroupId')(
            <Select placeholder="Blood Group" options={bloodGroups} />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('RH')(
            <Select placeholder="Rh" options={rhList} />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('CrossMatch')(<Input placeholder="CrossMatch" />)}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('BloodBankNote')(
            <Input placeholder="BloodBankNote" />
          )}
        </CaseFormItem>
      </Drawer>
    </div>
  );
}

const bloodGroups = [
  {
    name: 'A',
    value: '141'
  },
  {
    name: 'B',
    value: '142'
  },
  {
    name: 'AB',
    value: '143'
  },
  {
    name: 'O',
    value: '144'
  }
];

const rhList = [
  {
    name: '+',
    value: '1'
  },
  {
    name: '-',
    value: '0'
  }
];

export default createForm({ name: 'AddCaseStepFiveFormOne' })(
  AddCaseStepFiveFormOne
);
