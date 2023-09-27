import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

interface Props {
  width: string;
  height: string;
  element: JSX.Element;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const RecipeCommonModal = ({ width, height, element, setModal }: Props) => {
  const disableModal = () => {
    setModal(false);
  };

  return (
    <>
      <Container width={width} height={height}>
        <img
          className="exit-wrapper"
          onClick={disableModal}
          src="/img/btn/close-btn.png"
          alt="닫기"
        />
        <Wrapper>{element}</Wrapper>
      </Container>
      <Canvas onClick={disableModal} />
    </>
  );
};

export default RecipeCommonModal;

const Container = styled.div<{ width: string; height: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: calc(50vw - ${(props) => props.width}rem / 2);
  top: calc(40vh - ${(props) => props.height}rem / 2);
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  padding: 8px;
  background-color: white;
  border-radius: 0.625rem;
  border-width: 2px;
  border-color: #1e2b4f;
  z-index: 2000;
  .exit-wrapper {
    position: absolute;
    top: 2rem;
    right: 1rem;
    font-size: 32px;
    width: 32px;
    height: 32px;
    line-height: 26px;
    background-color: transparent;
    cursor: pointer;
    z-index: 50;
  }
`;

const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 53;
`;

const Wrapper = styled.div`
  background-color: transparent;
`;
