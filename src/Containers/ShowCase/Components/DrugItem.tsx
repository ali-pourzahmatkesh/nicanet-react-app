import React from "react";
import styled from "styled-components";
import Modal from "../../../components/Modal/ModalComponent";

const DrugWrapper = styled.div`
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.3rem;
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

type DrugItemProps = {
  drug: any;
};

class DrugItem extends React.Component<DrugItemProps> {
  state = {
    isOpen: false
  };

  renderModal = () => {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onClose={() => this.setState({ isOpen: false })}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        ChildrenWrapperStyle={{ padding: 0 }}
      >
        <div>aa</div>
      </Modal>
    );
  };

  render() {
    const { drug } = this.props;
    return (
      <div>
        <DrugWrapper
          onClick={() =>
            this.setState({
              isOpen: true
            })
          }
        >
          {drug.DrugFullName && <DrugTitle>{drug.DrugFullName}</DrugTitle>}
          {(drug.Route || drug.Frequency) && (
            <DrugDesc>{`${drug.Route.trim()} ${drug.Route ? "-" : ""} ${
              drug.Frequency
            }`}</DrugDesc>
          )}
          {this.renderModal()}
        </DrugWrapper>
      </div>
    );
  }
}

export default DrugItem;
