import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const MainRecipeHeader = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Divider></Divider>
      <Recipe>
        편의점
        <div className="mx-1.5 text-common-peach">추천</div>
        레시피
      </Recipe>
      <ReMore onClick={() => navigate("/recipe")}>더보기</ReMore>
    </Box>
  );
};

export default MainRecipeHeader;

const Divider = tw.div`
w-[120px] h-1 mb-1.5 ml-3 bg-common-peach
`;

const Box = tw.div`
relative
max-w-[450px]
h-[60px]
py-2.5
bg-white
`;

const Recipe = tw.span`
flex
text-2xl
font-bold
text-common-text-color
mx-3
`;

const ReMore = tw.button`
mr-3
absolute
bottom-0
right-0
text-base
text-common-peach
`;
