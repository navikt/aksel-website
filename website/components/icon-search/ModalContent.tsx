import styled from "styled-components";

const ScModalContent = styled.div`
  min-width: 300px;
  min-height: 300px;
`;

const ModalContent = ({ icon }: { icon: string }) => {
  return <ScModalContent>{icon}</ScModalContent>;
};

export default ModalContent;
