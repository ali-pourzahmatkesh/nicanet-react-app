import React from "react";
import styled from "styled-components";
import Modal from "../../../components/Modal/ModalComponent";
import { Value } from "./Styled";
import ShowCaseItem from "./ShowCaseItem";

const DrugWrapper = styled.div`
  border-radius: 10px;
  padding: 1.5rem;
  margin: 0 2rem 1.3rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const DrugTitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #5498a9;
  margin-bottom: 0.5rem;
`;

const DrugDesc = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #212121;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1rem;
`;

type DrugItemProps = {
  drug: any;
};

class DrugItem extends React.Component<DrugItemProps> {
  state = {
    isOpen: false
  };

  renderModal = () => {
    const { drug } = this.props;
    const {
      DrugFullName,
      Manufacture,
      Frequency,
      Route,
      Indication,
      BatchNo,
      Description
    } = drug;
    return (
      <Modal
        isOpen={this.state.isOpen}
        onClose={() =>
          this.setState({ isOpen: false }, () => {
            console.log("isopen", this.state.isOpen);
          })
        }
        ChildrenWrapperStyle={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: "2rem",
          paddingBottom: "7rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          zIndex: 9
        }}
        title="Drug Details"
      >
        {DrugFullName && (
          <ShowCaseItem title="Drug Name:" noLine>
            <Value noIndent>{DrugFullName}</Value>
          </ShowCaseItem>
        )}

        {Manufacture && (
          <ShowCaseItem title="Manufacturer:" noLine>
            <Value noIndent>{Manufacture}</Value>
          </ShowCaseItem>
        )}

        {Frequency && (
          <ShowCaseItem title="Frequency:" noLine>
            <Value noIndent>{Frequency}</Value>
          </ShowCaseItem>
        )}

        {Route && (
          <ShowCaseItem title="Route:" noLine>
            <Value noIndent>{Route}</Value>
          </ShowCaseItem>
        )}

        {Indication && (
          <ShowCaseItem title="Indication:" noLine>
            <Value noIndent>{Indication}</Value>
          </ShowCaseItem>
        )}

        {BatchNo && (
          <ShowCaseItem title="Batch Number:" noLine>
            <Value noIndent>{BatchNo}</Value>
          </ShowCaseItem>
        )}

        {Description && (
          <ShowCaseItem title="Description:" noLine>
            <Value noIndent>{Description}</Value>
          </ShowCaseItem>
        )}
      </Modal>
    );
  };

  render() {
    const { drug } = this.props;
    return (
      <div>
        <DrugWrapper onClick={() => this.setState({ isOpen: true })}>
          {drug.DrugFullName && <DrugTitle>{drug.DrugFullName}</DrugTitle>}
          {(drug.Route || drug.Frequency) && (
            <DrugDesc>{`${drug.Route.trim()} ${drug.Route ? "-" : ""} ${
              drug.Frequency
            }`}</DrugDesc>
          )}
        </DrugWrapper>
        {this.renderModal()}
      </div>
    );
  }
}

export default DrugItem;
