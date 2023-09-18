import tw from "tailwind-styled-components";

const MainProductHeader = () => {
  return (
    <Box>
      <Divider></Divider>
      <Recipe>
        <div className="mr-1.5 text-common-orange">행사</div>
        중인 상품
      </Recipe>
    </Box>
  );
};

export default MainProductHeader;

const Divider = tw.div`
w-[95px] h-1 mb-1.5 ml-3 bg-common-orange
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
