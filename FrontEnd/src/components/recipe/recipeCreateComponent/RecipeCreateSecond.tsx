import { Dispatch, SetStateAction } from "react";
import tw from "tailwind-styled-components";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
}
const RecipeCreateSecond = ({ stepHandler }: Props) => {
  return (
    <Container>
      RecipeCreateSecond
      <BtnBox>
        <WhiteBtn
          onClick={() => {
            stepHandler("1");
          }}
        >
          dd
        </WhiteBtn>
        <BlueBtn
          onClick={() => {
            stepHandler("3");
          }}
        >
          dd
        </BlueBtn>
      </BtnBox>
    </Container>
  );
};

export default RecipeCreateSecond;

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

const WhiteBtn = tw.div`
justify-center
text-center
w-[8.9375rem]
h-[2.5rem]
rounded-[0.625rem]
py-[.75rem]

bg-white
text-common-text-color
text-[0.9375rem]
shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.25)]
`;
