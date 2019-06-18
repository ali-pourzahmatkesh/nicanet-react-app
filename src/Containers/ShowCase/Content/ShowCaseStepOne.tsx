import React, { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';
import { Value, StringValue, LoadingWrapprer } from '../Components/Styled';
import ShowCaseItem from '../Components/ShowCaseItem';
import ShowCaseStringArray from '../Components/ShowCaseStringArray';
import ImageSlider from '../../../components/ImageSlider/ImageSliderComponent';
import DrugItem from '../Components/DrugItem';
import ContinueButton from '../Components/ContinueButton';

const Delete = styled.div`
  display: inline-block;
  color: #f00;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem;
`;

const DeleteBtn = styled.div`
  text-align: center;
  margin-bottom: -2rem;
  margin-top: 2.5rem;
`;

interface ShowCaseStepOneProps {
  caseInfo: any;
  onSubmit: () => void;
  onDelete: () => void;
  user: any;
}

function ShowCaseStepOne(props: ShowCaseStepOneProps) {
  const { onSubmit, caseInfo, onDelete, user } = props;
  const [chiefComplaintImages, setchiefComplaintImages] = useState<any[]>([]);
  const [presentIllness, setPresentIllness] = useState<any[]>([]);
  const [generalAppearance, setGeneralAppearance] = useState<any[]>([]);
  const [pastMedicalHistories, setPastMedicalHistories] = useState<any[]>([]);
  const [habitualHistories, setHabitualHistories] = useState<any[]>([]);
  const [herbalHistories, setHerbalHistories] = useState<any[]>([]);
  const [dhDrugs, setDhDrugs] = useState<any[]>([]);
  const [otcDrugs, setOtcDrugs] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      if (caseInfo === null) return;
      setchiefComplaintImages(
        caseInfo.CaseImages.filter((item: any) => item.TypeId === 145)
      );

      setPresentIllness(
        caseInfo.PatientSigns.filter(
          (item: any) => item.TypeId === 122 && item.ResultValue === 'Yes'
        )
      );

      setGeneralAppearance(
        caseInfo.PatientSigns.filter(
          (item: any) => item.TypeId === 123 && item.ResultValue === 'Yes'
        )
      );

      if (caseInfo.CaseDrug && caseInfo.CaseDrug.length > 0) {
        setDhDrugs(
          caseInfo.CaseDrug.filter((item: any) => +item.TypeId === 350)
        );
        setOtcDrugs(
          caseInfo.CaseDrug.filter((item: any) => +item.TypeId === 351)
        );
      }

      setPastMedicalHistories(caseInfo.PastMedicalHistories);
      setHabitualHistories(caseInfo.HabitualHistories);
      setHerbalHistories(caseInfo.HerbalHistories);
    };

    effect();
  }, [caseInfo]);

  if (caseInfo === null)
    return (
      <div>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </div>
    );

  const {
    Patient,
    ChiefComplaint,
    PiNote,
    GaNote,
    BloodPressure,
    PulseRate,
    RespiratoryRate,
    Temprature,
    PastMedicalHistory,
    PastSurgicalHistory,
    FamilyHistory,
    HerbalHistory,
    DHDrugNote,
    OTCDrugNote,
    WritenById
  } = caseInfo;
  const { PatientDescription, Height, Weight } = Patient;

  return (
    <div>
      {PatientDescription && (
        <ShowCaseItem title="Patient Information:">
          <Value>{PatientDescription}</Value>
          {Height > 0 && <Value>Height: {Height}</Value>}
          {Weight > 0 && <Value>Weight: {Weight}</Value>}
        </ShowCaseItem>
      )}

      {ChiefComplaint && (
        <ShowCaseItem title="Chief Complaint(CC):">
          <Value>{ChiefComplaint}</Value>
        </ShowCaseItem>
      )}

      {chiefComplaintImages.length > 0 && (
        <ShowCaseItem title="Photos:">
          <ImageSlider showsButtons images={chiefComplaintImages} />
        </ShowCaseItem>
      )}

      {(presentIllness.length > 0 || PiNote) && (
        <ShowCaseItem title="Present Illness (PI):">
          <ShowCaseStringArray stringArray={presentIllness} title="Title" />
          {PiNote && <Value>{PiNote}</Value>}
        </ShowCaseItem>
      )}

      {(generalAppearance.length > 0 || GaNote) && (
        <ShowCaseItem title="General Appearance (GA):">
          <ShowCaseStringArray stringArray={generalAppearance} title="Title" />
          {GaNote && <Value>{GaNote}</Value>}
        </ShowCaseItem>
      )}

      {(BloodPressure || PulseRate || RespiratoryRate || Temprature > 0) && (
        <ShowCaseItem title="Vital Sign (VS):">
          {BloodPressure && <StringValue>{`BP: ${BloodPressure}`}</StringValue>}
          {PulseRate && <StringValue>{`PR: ${PulseRate}`}</StringValue>}
          {RespiratoryRate && (
            <StringValue>{`RR: ${RespiratoryRate}`}</StringValue>
          )}
          {+Temprature > 0 && (
            <StringValue>{`Tempreture: ${Temprature}`}</StringValue>
          )}
        </ShowCaseItem>
      )}

      {(pastMedicalHistories.length > 0 || PastMedicalHistory) && (
        <ShowCaseItem title="Past Medical History (PMH):">
          <ShowCaseStringArray
            stringArray={pastMedicalHistories}
            title="DiseaseTitle"
          />
          {PastMedicalHistory && <Value>{PastMedicalHistory}</Value>}
        </ShowCaseItem>
      )}

      {PastSurgicalHistory && (
        <ShowCaseItem title="Past Surgical History (PSH):">
          <Value>{PastSurgicalHistory}</Value>
        </ShowCaseItem>
      )}

      {FamilyHistory && (
        <ShowCaseItem title="Family History (FH):">
          <Value>{FamilyHistory}</Value>
        </ShowCaseItem>
      )}

      {(dhDrugs.length > 0 || DHDrugNote) && (
        <ShowCaseItem title="Drug History (DH):" theme={{ hasLine: true }}>
          {dhDrugs.length > 0 &&
            dhDrugs.map(item => {
              return <DrugItem key={item.CaseDrugId} drug={item} />;
            })}
          {DHDrugNote && <Value>{DHDrugNote}</Value>}
        </ShowCaseItem>
      )}

      {(otcDrugs.length > 0 || OTCDrugNote) && (
        <ShowCaseItem
          title="Over The Counter Drugs (OTC):"
          theme={{ hasLine: true }}
        >
          {otcDrugs.length > 0 &&
            otcDrugs.map(item => {
              return <DrugItem key={item.CaseDrugId} drug={item} />;
            })}
          {OTCDrugNote && <Value>{OTCDrugNote}</Value>}
        </ShowCaseItem>
      )}

      {habitualHistories.length > 0 && (
        <ShowCaseItem title="Habitual History:">
          {habitualHistories.map((item, index) => (
            <Value key={index.toString()}>{`${
              item.HabitualTitle
            } ${item.DailyUsage && '-'} ${item.DailyUsage} ${item.Duration &&
              '-'} ${item.Duration}`}</Value>
          ))}
        </ShowCaseItem>
      )}

      {(herbalHistories.length > 0 || HerbalHistory) && (
        <ShowCaseItem title="Herbal Histories:" theme={{ noLine: true }}>
          <ShowCaseStringArray
            stringArray={herbalHistories}
            title="HerbalTitle"
            valueSize="0.9rem"
          />
          {HerbalHistory && <Value>{HerbalHistory}</Value>}
        </ShowCaseItem>
      )}
      {+user.PersonId === +WritenById && (
        <DeleteBtn>
          <Delete onClick={onDelete}>Delete Case</Delete>
        </DeleteBtn>
      )}

      <ContinueButton onClick={() => onSubmit()} />
    </div>
  );
}

export default ShowCaseStepOne;
