import React, { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import { CaseApi } from '../../../Api/CaseApi';
import { StringValue, LoadingWrapprer, Value } from '../Components/Styled';
import ShowCaseItem from '../Components/ShowCaseItem';
import ShowCaseStringArray from '../Components/ShowCaseStringArray';
import ImageSlider from '../../../components/ImageSlider/ImageSliderComponent';
import DrugItem from '../Components/DrugItem';
import ContinueButton from '../Components/ContinueButton';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';
interface ShowCaseStepOneProps {
  caseId: string;
  onSubmit: () => void;
}

function ShowCaseStepOne(props: ShowCaseStepOneProps) {
  const { caseId, onSubmit } = props;
  const [caseInfo, setCase] = useState(null);
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
      const response = await CaseApi.getCase(caseId, true);
      // console.log('response', response);
      if (response.status === 200) {
        const data = response.data;

        setCase(data);

        setchiefComplaintImages(
          data.CaseImages.filter((item: any) => item.TypeId === 145)
        );

        setPresentIllness(
          data.PatientSigns.filter(
            (item: any) => item.TypeId === 122 && item.ResultValue === 'Yes'
          )
        );

        setGeneralAppearance(
          data.PatientSigns.filter(
            (item: any) => item.TypeId === 123 && item.ResultValue === 'Yes'
          )
        );

        if (data.CaseDrug && data.CaseDrug.length > 0) {
          setDhDrugs(data.CaseDrug.filter((item: any) => +item.TypeId === 350));
          setOtcDrugs(
            data.CaseDrug.filter((item: any) => +item.TypeId === 351)
          );
        }

        setPastMedicalHistories(data.PastMedicalHistories);
        setHabitualHistories(data.HabitualHistories);
        setHerbalHistories(data.HerbalHistories);
      }
    };

    effect();
  }, [caseId]);

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
    OTCDrugNote
  } = caseInfo;
  const { PatientDescription, Height, Weight } = Patient;

  return (
    <div>
      {PatientDescription && (
        <ShowCaseItem title="Patient Information:">
          <DetectLanguage value={PatientDescription}>
            <Value>{PatientDescription}</Value>
          </DetectLanguage>
          {Height > 0 && <Value>Height: {Height}</Value>}
          {Weight > 0 && <Value>Weight: {Weight}</Value>}
        </ShowCaseItem>
      )}

      {ChiefComplaint && (
        <ShowCaseItem title="Chief Complaint(CC):">
          <DetectLanguage value={ChiefComplaint}>
            <Value>{ChiefComplaint}</Value>
          </DetectLanguage>
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
          {PiNote && (
            <DetectLanguage value={PiNote}>
              <Value>{PiNote}</Value>
            </DetectLanguage>
          )}
        </ShowCaseItem>
      )}

      {(generalAppearance.length > 0 || GaNote) && (
        <ShowCaseItem title="General Appearance (GA):">
          <ShowCaseStringArray stringArray={generalAppearance} title="Title" />
          {GaNote && (
            <DetectLanguage value={GaNote}>
              <Value>{GaNote}</Value>
            </DetectLanguage>
          )}
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
          {PastMedicalHistory && (
            <DetectLanguage value={PastMedicalHistory}>
              <Value>{PastMedicalHistory}</Value>
            </DetectLanguage>
          )}
        </ShowCaseItem>
      )}

      {PastSurgicalHistory && (
        <ShowCaseItem title="Past Surgical History (PSH):">
          <DetectLanguage value={PastSurgicalHistory}>
            <Value>{PastSurgicalHistory}</Value>
          </DetectLanguage>
        </ShowCaseItem>
      )}

      {FamilyHistory && (
        <ShowCaseItem title="Family History (FH):">
          <DetectLanguage value={FamilyHistory}>
            <Value>{FamilyHistory}</Value>
          </DetectLanguage>
        </ShowCaseItem>
      )}

      {(dhDrugs.length > 0 || DHDrugNote) && (
        <ShowCaseItem title="Drug History (DH):" theme={{ hasLine: true }}>
          {dhDrugs.length > 0 &&
            dhDrugs.map(item => {
              return <DrugItem key={item.CaseDrugId} drug={item} />;
            })}
          {DHDrugNote && (
            <DetectLanguage value={DHDrugNote}>
              <Value>{DHDrugNote}</Value>
            </DetectLanguage>
          )}
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
          {OTCDrugNote && (
            <DetectLanguage value={OTCDrugNote}>
              <Value>{OTCDrugNote}</Value>
            </DetectLanguage>
          )}
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
          {HerbalHistory && (
            <DetectLanguage value={HerbalHistory}>
              <Value>{HerbalHistory}</Value>
            </DetectLanguage>
          )}
        </ShowCaseItem>
      )}

      <ContinueButton onClick={() => onSubmit()} />
    </div>
  );
}

export default ShowCaseStepOne;
