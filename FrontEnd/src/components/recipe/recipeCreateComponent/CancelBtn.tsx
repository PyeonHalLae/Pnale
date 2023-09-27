import { useNavigate } from "react-router-dom";
import {
  recipeContentsState,
  recipeFormState,
  recipeImgState,
  recipeProductsState,
} from "@/recoil/khiRecoil";
import { useResetRecoilState } from "recoil";

const CancelBtn = () => {
  const navigate = useNavigate();
  const resetForm = useResetRecoilState(recipeFormState);
  const restContents = useResetRecoilState(recipeContentsState);
  const restImg = useResetRecoilState(recipeImgState);
  const restProducts = useResetRecoilState(recipeProductsState);

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
