// import React from 'react'

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface PyenListType {
  name: string;
}

const PyenList: PyenListType[] = [
  { name: "CU" },
  { name: "SEVEN" },
  { name: "GS" },
  { name: "EMART" },
];

const PyeneShopDirectList = ({ scrollHeader }: { scrollHeader: void }) => {
  const { pyenType } = useParams<string>();
  const navigate = useNavigate();

  const PyenMoveHandler = (name: string) => {
    navigate("/pyenE/" + name);
    scrollHeader;
  };

  return (
    <>
      <BackSide>
        <hr className="border-common-bold-back-color" />
        <DirectBox>
          {PyenList.map(
            (value, index) =>
              pyenType !== value.name && (
                <DirectBtn
                  key={value.name + index}
                  $pyenType={value.name}
                  onClick={() => {
                    PyenMoveHandler(value.name);
                  }}
                />
              )
          )}
        </DirectBox>
      </BackSide>
    </>
  );
};

export default PyeneShopDirectList;

const BackSide = tw.div`
    w-[calc(100%-1.25rem)]
    mx-auto
    pt-2
`;

const DirectBox = tw.div`
  flex
  justify-around
  mt-5
`;

const DirectBtn = styled.div<{ $pyenType: string }>`
  width: 6.25rem;
  height: 6.25rem;
  background-image: url("/img/btn/${(props) => props.$pyenType}-direct-btn.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
