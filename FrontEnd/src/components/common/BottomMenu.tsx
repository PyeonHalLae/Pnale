// import styled from "styled-components";
import { useEffect } from "react";
import tw from "tailwind-styled-components";

const BottomMenu = ({
  $selectRecipeId,
  BottomMenuStateHandler,
}: {
  $selectRecipeId: number;
  BottomMenuStateHandler: () => void;
}) => {
  useEffect(() => {
    console.log("바텀사이드", $selectRecipeId);
  }, []);

  return (
    <>
      <BackSize
        onClick={() => {
          BottomMenuStateHandler();
        }}
      />
      <MenuBox>
        <ModifyBtn>
          <div className="mx-auto my-auto">수정하기</div>
        </ModifyBtn>
        <DeleteBtn>
          <div className="mx-auto my-auto">삭제하기</div>
        </DeleteBtn>
        <CloseBtn
          onClick={() => {
            BottomMenuStateHandler();
          }}
        >
          <div className="mx-auto my-auto">닫기</div>
        </CloseBtn>
      </MenuBox>
    </>
  );
};

export default BottomMenu;

const BackSize = tw.div`
fixed
bg-[rgba(51,51,51,0.8)]
min-w-[350xp]
max-w-[450px]
w-full
h-full
top-0
z-40
`;

const MenuBox = tw.div`
fixed
bg-white
w-full
min-w-[21.875rem]
max-w-[28.125rem]
h-[8.125rem]
bottom-[0rem]
rounded-[0.625rem_0.625rem_0rem_0rem]
z-50
`;

const ModifyBtn = tw.div`
    h-[2.8125rem]
    flex
    text-[0.9375rem]
    text-common-text-color
    font-bold
    border-b-[0.0938rem]
    border-common-back-color
`;

const CloseBtn = tw.div`
    flex
    h-[2.8125rem]
    text-[0.9375rem]
    font-bold
    text-common-text-color
`;

const DeleteBtn = tw.div`    
    h-[2.5rem]
    flex
    text-[0.9375rem]
    text-seven-r
    font-bold
    border-b-[0.0938rem]
    border-common-white-divider`;