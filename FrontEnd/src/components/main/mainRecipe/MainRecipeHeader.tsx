import tw from "tailwind-styled-components";

const MainRecipeHeader = () => {
  return (
    <Box>
      <Divider></Divider>
      <Recipe>편의점 추천 레시피</Recipe>
      <ReMore>더보기</ReMore>
    </Box>
  );
};

export default MainRecipeHeader;

const Divider = tw.div`
w-[120px] h-1.5 mb-2.5 ml-3 bg-common-peach
`;

const Box = tw.div`
relative
max-w-[450px]
h-[70px]
py-2.5
bg-white
`;

const Recipe = tw.span`
text-2xl
font-bold
text-common-text-color
mx-3
`;

const ReMore = tw.button`
mr-3
absolute
right-0
text-base
text-common-peach
`;
