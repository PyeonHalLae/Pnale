import tw from "tailwind-styled-components";

const RecipeDetailContent = ({ content }: { content: string }) => {
  return <Container dangerouslySetInnerHTML={{ __html: content }}></Container>;
};

export default RecipeDetailContent;

const Container = tw.div`
p-[1.875rem] bg-white my-[.625rem]
`;
