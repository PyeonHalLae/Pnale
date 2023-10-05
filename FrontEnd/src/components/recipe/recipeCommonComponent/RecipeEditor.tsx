import { useRef, useMemo } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

interface Props {
  rcpDesc: string;
  setRcpDesc: Dispatch<SetStateAction<string>>;
}

export const RecipeEditor = ({ rcpDesc, setRcpDesc }: Props) => {
  const QuillRef = useRef<ReactQuill>();
  // 이미지를 업로드 하기 위한 함수

  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const formData = new FormData();

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files[0];

      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const newImage = await imageCompression(file, options);

      if (file !== null) {
        formData.append("image", newImage);
        // axios를 통해 백엔드 개발자분과 통신했고, 데이터는 폼데이터로 주고받았습니다.
        axios
          .post("/api/img/recipe", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            // res로 S3 주소 string 올 예정
            console.log(res.data);
            // 성공시 recipeImg에 url 할당
            const url = res.data;
            const range = QuillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
              const quill = QuillRef.current?.getEditor();

              quill?.setSelection(range, 1);

              quill?.clipboard.dangerouslyPasteHTML(
                range,
                `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
  };

  // const imageHandler = () => {
  //   console.log("gg");
  // };

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: [] }],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={rcpDesc}
        onChange={setRcpDesc}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        className="w-[100%] h-[28.125rem]"
      />
    </>
  );
};
