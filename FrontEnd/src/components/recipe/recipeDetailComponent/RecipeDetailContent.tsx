import tw from "tailwind-styled-components";

const RecipeDetailContent = ({ content }: { content: string }) => {
  return (
    <Container>
      <Header>본문</Header>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Container>
  );
};

export default RecipeDetailContent;

const Container = tw.div`
pt-[1rem] px-[1.875rem] bg-white my-[.625rem]
`;
const Header = tw.div`
text-[1.25rem] text-common-text-color
`;
