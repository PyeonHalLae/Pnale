import { useNavigate } from "react-router-dom";
import {
  recipeFormContent,
  recipeFormState,
  recipeFormImg,
  recipeFormProduct,
} from "@/recoil/khiRecoil";
import { useResetRecoilState } from "recoil";

const CancelBtn = () => {
  const navigate = useNavigate();

  const resetForm = useResetRecoilState(recipeFormState);
  const restContents = useResetRecoilState(recipeFormContent);
  const restImg = useResetRecoilState(recipeFormImg);
  const restProducts = useResetRecoilState(recipeFormProduct);

  const cancleBtn = () => {
    resetForm();
    restContents();
    restImg();
    restProducts();

    navigate("/recipe");
  };
  return (
    <div
      className="absolute top-[-2rem] right-[2.5rem] text-[1.25rem] text-common-text-color"
      onClick={cancleBtn}
    >
      작성 취소
    </div>
  );
};

export default CancelBtn;
