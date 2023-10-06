import { Dispatch, SetStateAction, useRef } from "react";
import tw from "tailwind-styled-components";
import axios from "axios";
import CancelBtn from "./CancelBtn";
import { useRecoilState } from "recoil";
import { recipeFormState, recipeFormImg } from "@/recoil/khiRecoil";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import imageCompression from "browser-image-compression";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
  action: string;
}

const RecipeCreateFirst = ({ stepHandler, action }: Props) => {
  const [{ rcpName, rcpSimple, rcpVideo }, setRecipeForm] = useRecoilState(recipeFormState);
  const [rcpThumbnail, setRcpThumbnail] = useRecoilState(recipeFormImg);

  const inputFileRef = useRef(null);

  const FormChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipeForm((recipeForm) => {
      return { ...recipeForm, [name]: value };
    });
  };

  // 이미지 클릭시
  const imgChangBtnClickHandler = () => {
    inputFileRef.current.click();
  };

  // 업로드
  const imgUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf|JPG|JPEG|PNG|GIF|BMP|PDF)$/;

    // let fileSize: number;

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const imgFile = e.target.value;

    // 이미지 업로드 유효성검사
    if (imgFile !== "" && imgFile != null) {
      // fileSize = e.target.files[0].size;

      if (!imgFile.match(fileForm)) {
        ToastErrorMessage("이미지 파일만 업로드 가능");
        return;
      }
      // else if (fileSize === maxSize) {
      //   ToastErrorMessage("파일 사이즈는 5MB까지 가능");
      //   return;
      // }
    }

    const file = await imageCompression(e.target.files[0], options);

    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("/api/img/recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // res로 S3 주소 string 올 예정
        const imgUrl = res.data;
        console.log(res.data);
        // 성공시 recipeImg에 url 할당
        setRcpThumbnail(imgUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formCheckHandler = () => {
    if (rcpThumbnail === "") {
      ToastErrorMessage("레시피 미리보기 사진을 추가해주세요.");
    } else if (rcpName === "") {
      ToastErrorMessage("레시피 제목을 입력해주세요.");
    } else if (rcpName.length > 20) {
      ToastErrorMessage("제목의 최대 길이는 20자 입니다");
    } else if (rcpSimple === "") {
      ToastErrorMessage("레시피 간단 설명을 입력해주세요.");
    } else if (rcpSimple.length > 50) {
      ToastErrorMessage("한줄 설명의 최대 길이는 50자 입니다");
    } else {
      stepHandler("2");
    }
  };

  return (
    <Container>
      <CancelBtn action={action} />
      <FormBox>
        <FormTitle>
          미리보기 사진<span className="text-common-orange">*</span>
        </FormTitle>
        {/*  */}
        <input
          type="file"
          ref={inputFileRef}
          name="rcpThumbnail"
          id="rcpThumbnail"
          onChange={imgUploadHandler}
          className="hidden"
          accept="image/*"
        />
        <ImgBox
          src={rcpThumbnail == "" ? "/img/etc/empty-image.png" : rcpThumbnail}
          onClick={imgChangBtnClickHandler}
        />
      </FormBox>

      <FormBox>
        <FormTitle>
          제목<span className="text-common-orange">*</span>
        </FormTitle>
        <RcpNameBox
          rows={1}
          value={rcpName}
          name="rcpName"
          onChange={FormChangeHandler}
          placeholder="제목을 입력해주세요."
        ></RcpNameBox>
        <InfoBox>최대 20자</InfoBox>
      </FormBox>

      <FormBox>
        <FormTitle>
          간단 설명<span className="text-common-orange">*</span>
        </FormTitle>
        <RcpSimpBox
          rows={1}
          value={rcpSimple}
          name="rcpSimple"
          onChange={FormChangeHandler}
          placeholder="레시피 간단 설명을 작성해주세요."
        ></RcpSimpBox>
        <InfoBox>최대 50자</InfoBox>
      </FormBox>

      <FormBox>
        <FormTitle>관련 영상 추가</FormTitle>
        <RcpVideoBox
          type="text"
          name="rcpVideo"
          value={rcpVideo}
          onChange={FormChangeHandler}
          placeholder="URL을 입력해주세요"
        ></RcpVideoBox>
      </FormBox>

      <BtnBox>
        <BlueBtn onClick={formCheckHandler}>다음으로</BlueBtn>
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
relative
mb-[1.5rem]
w-[100%]
`;

const FormTitle = tw.div`
text-[1.25rem]
text-common-text-color
`;

const InfoBox = tw.div`
absolute
right-0
bottom-[-0.5rem]
text-[0.625rem]
text-common-text-color
`;

const ImgBox = tw.img`
w-[100%]
h-[15.25rem]
`;

const RcpNameBox = tw.textarea`
text-[1.5rem]
w-[100%]
bg-common-back-color
border-b-2
break-all
resize-none
`;

const RcpSimpBox = tw.textarea`
w-[100%]
bg-common-back-color
border-b-2
break-all
resize-none
`;

const RcpVideoBox = tw.input`
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
