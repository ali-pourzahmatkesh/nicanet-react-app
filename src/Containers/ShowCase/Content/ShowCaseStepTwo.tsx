import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { CaseApi } from "../../../Api/CaseApi";
import Layout from "../../../components/Partials/Layout";
import { Value, StringValue } from "../Components/Styled";
import ShowCaseItem from "../Components/ShowCaseItem";
import ShowCaseStringArray from "../Components/ShowCaseStringArray";
import ImageSlider from "../../../components/ImageSlider/ImageSliderComponent";
import DrugItem from "../Components/DrugItem";
import ContinueButton from "../Components/ContinueButton";

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

interface ShowCaseStepOneProps {
  caseId: string;
}

function ShowCaseStepOne(props: ShowCaseStepOneProps) {
  const { caseId } = props;
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
      console.log("response", response);
      if (response.status === 200) {
        const data = response.data;

        setCase(data);
        localStorage.setItem("caseInfo", JSON.stringify(data));

        setchiefComplaintImages(
          data.CaseImages.filter((item: any) => item.TypeId === 145)
        );

        setPresentIllness(
          data.PatientSigns.filter(
            (item: any) => item.TypeId === 122 && item.ResultValue === "Yes"
          )
        );

        setGeneralAppearance(
          data.PatientSigns.filter(
            (item: any) => item.TypeId === 123 && item.ResultValue === "Yes"
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
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
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
        <div>
          <ImageSlider showsButtons images={chiefComplaintImages} />
        </div>
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
          <StringValue>{`BP: ${BloodPressure}`}</StringValue>
          <StringValue>{`PR: ${PulseRate}`}</StringValue>
          <StringValue>{`RR: ${RespiratoryRate}`}</StringValue>
          <StringValue>{`Tempreture: ${Temprature}`}</StringValue>
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
        <ShowCaseItem title="Drug History (DH):" hasLine>
          {dhDrugs.length > 0 &&
            dhDrugs.map(item => {
              return <DrugItem key={item.CaseDrugId} drug={item} />;
            })}
          {DHDrugNote && <Value>{DHDrugNote}</Value>}
        </ShowCaseItem>
      )}

      {(otcDrugs.length > 0 || OTCDrugNote) && (
        <ShowCaseItem title="Over The Counter Drugs (OTC):" hasLine>
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
            } ${item.DailyUsage && "-"} ${item.DailyUsage} ${item.Duration &&
              "-"} ${item.Duration}`}</Value>
          ))}
        </ShowCaseItem>
      )}

      {(herbalHistories.length > 0 || HerbalHistory) && (
        <ShowCaseItem title="Herbal Histories:">
          <ShowCaseStringArray
            stringArray={herbalHistories}
            title="HerbalTitle"
            valueSize="0.9rem"
          />
          {HerbalHistory && <Value>{HerbalHistory}</Value>}
        </ShowCaseItem>
      )}

      <ContinueButton onClick={() => console.log("yes")} />
    </div>
  );
}

export default ShowCaseStepOne;
