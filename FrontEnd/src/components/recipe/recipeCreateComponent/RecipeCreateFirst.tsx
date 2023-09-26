import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { recipeFormType } from "./../recipeCommonComponent/recipeFormType";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
  recipeForm: recipeFormType;
  setRecipeForm: Dispatch<SetStateAction<recipeFormType>>;
  FormChangeHandler: 
}

const RecipeCreateFirst = ({ stepHandler, recipeForm, setRecipeFrom, FormChangeHandler }: Props) => {
  const navigate = useNavigate();
  const {recipeImg, recipeTitle, intro} = recipeForm;

  const cancleBtn = () => {
    navigate("/recipe");
  };

  return (
    <Container>
      <div
        className="absolute top-[-2rem] right-[2.5rem] text-[1.25rem] text-common-text-color"
        onClick={cancleBtn}
      >
        작성 취소
      </div>
      <FormBox>
        <FormTitle>미리보기 사진</FormTitle>
        <ImgBox />
      </FormBox>

      <FormBox>
        <FormTitle>제목</FormTitle>
        <TitleBox rows={1} value={recipeTitle} name="recipeTitle" onChange={FormChangeHandler} placeholder="제목을 입력해주세요."></TitleBox>
      </FormBox>

      <FormBox>
        <FormTitle>간단 설명</FormTitle>
        <IntroBox rows={1} value={intro} name="intro" onChange={FormChangeHandler} placeholder="레시피 간단 설명을 작성해주세요."></IntroBox>
      </FormBox>

      <FormBox>
        <FormTitle>관련 영상 추가</FormTitle>
        <RelatedUrlBox type="text" name="relatedUrl" onChange={FormChangeHandler} placeholder="URL을 입력해주세요"></RelatedUrlBox>
      </FormBox>

      <BtnBox>
        <BlueBtn
          onClick={() => {
            stepHandler("2");
          }}
        >
          dd
        </BlueBtn>
      </BtnBox>
    </Container>
  );
};

export default RecipeCreateFirst;

const Container = tw.div`
relative
px-[2.5rem]
w-[100%]
`;

const FormBox = tw.div`
mb-[1.5rem]
w-[100%]
`;

const FormTitle = tw.div`
text-[1.25rem]
text-common-text-color
`;

const ImgBox = tw.img`
w-[100%]
h-[15.25rem]
`;

const TitleBox = tw.textarea`
text-[1.5rem]
w-[100%]
bg-common-back-color
border-b-2
break-all
`;

const IntroBox = tw.textarea`
w-[100%]
bg-common-back-color
border-b-2
break-all
`;

const RelatedUrlBox = tw.input`
w-[100%]
h-[1.8125rem]
text-[.75rem] 
line-clamp-1 
mb-[.625rem] 
p-[.25rem]
py-[.1rem]
border-[0.05rem]
rounded-[0.625rem]
border-common-bold-back-color
bg-common-back-color"
`;

const BtnBox = tw.div`
flex
w-[100%]
relative
itmes-center
justify-between
`;

const BlueBtn = tw.div`
absolute
right-0
justify-center
text-center
w-[8.9375rem]
h-[2.5rem]
rounded-[0.625rem]
py-[.75rem]

bg-common-text-color
text-white
text-[0.9375rem]
shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.25)]
`;
