import { Dispatch, SetStateAction } from "react";
import tw from "tailwind-styled-components";
import { recipeFormType } from "./../recipeCommonComponent/recipeFormType";
import axios from "axios";
import CancelBtn from "./CancelBtn";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
  recipeForm: recipeFormType;
  recipeImg: string;
  setRecipeImg: Dispatch<SetStateAction<string | undefined>>;
  FormChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const RecipeCreateFirst = ({
  stepHandler,
  recipeForm,
  FormChangeHandler,
  recipeImg,
  setRecipeImg,
}: Props) => {
  const { recipeTitle, intro, relatedUrl } = recipeForm;

  const imgUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    const maxSize = 5 * 1024 * 1024;
    let fileSize: number;

    const imgFile = e.target.value;

    // 이미지 업로드 유효성검사
    if (imgFile !== "" && imgFile != null) {
      fileSize = e.target.files[0].size;

      if (!imgFile.match(fileForm)) {
        alert("이미지 파일만 업로드 가능");
        return;
      } else if (fileSize === maxSize) {
        alert("파일 사이즈는 5MB까지 가능");
        return;
      }
    }
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("https://pnale.online/api/img/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // res로 S3 주소 string 올 예정
        const imgUrl = res.data;
        console.log(res.data);
        // 성공시 recipeImg에 url 할당
        setRecipeImg(imgUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <CancelBtn />
      <FormBox>
        <FormTitle>미리보기 사진</FormTitle>
        {/*  */}
        <input
          type="file"
          name="recipeImg"
          id="recipeImg"
          onChange={imgUploadHandler}
          // style={{ display: "none" }}
        />
        <ImgBox src={recipeImg} />
      </FormBox>

      <FormBox>
        <FormTitle>제목</FormTitle>
        <TitleBox
          rows={1}
          value={recipeTitle}
          name="recipeTitle"
          onChange={FormChangeHandler}
          placeholder="제목을 입력해주세요."
        ></TitleBox>
      </FormBox>

      <FormBox>
        <FormTitle>간단 설명</FormTitle>
        <IntroBox
          rows={1}
          value={intro}
          name="intro"
          onChange={FormChangeHandler}
          placeholder="레시피 간단 설명을 작성해주세요."
        ></IntroBox>
      </FormBox>

      <FormBox>
        <FormTitle>관련 영상 추가</FormTitle>
        <RelatedUrlBox
          type="text"
          name="relatedUrl"
          value={relatedUrl}
          onChange={FormChangeHandler}
          placeholder="URL을 입력해주세요"
        ></RelatedUrlBox>
      </FormBox>

      <BtnBox>
        <BlueBtn
          onClick={() => {
            stepHandler("2");
          }}
        >
          다음으로
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
shadow
`;
