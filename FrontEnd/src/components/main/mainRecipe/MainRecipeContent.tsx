import React from "react";
import tw from "tailwind-styled-components";
const MainRecipeContent = () => {
  return (
    <div className="bg-white border-2 border-white">
      <div className="m-3 border-2 shadow-xl border-common-white-divider">
        <img src="/img/test/recipeTest.png" alt="레시피 사진" className=""></img>
        <TextBox>
          <div className="w-10/12 text-common-text-color">
            <Title>짜파구리</Title>
            <Tag>#짜파게티</Tag>
            <Tag>#너구리</Tag>
          </div>
          <div>
            <Profile src="/img/test/profileTest.png" alt="프로필사진" />
            <span className="font-[G-sans-light] text-xl">김동민</span>
          </div>
        </TextBox>
      </div>
    </div>
  );
};

export default MainRecipeContent;

const TextBox = tw.div`
relative
mx-5
my-3
flex
`;

const Title = tw.div`
text-4xl
mt-2
mb-1
`;

const Tag = tw.span`
font-[G-sans-light]
text-2xl
`;
const Profile = tw.img`
w-14
mb-1
`;
