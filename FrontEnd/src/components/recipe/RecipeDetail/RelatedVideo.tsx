import tw from "tailwind-styled-components";

const RelatedVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <Container>
      <Header>관련 영상</Header>
      <VideoThumbnail>{videoUrl}여기는 이미지</VideoThumbnail>
    </Container>
  );
};

export default RelatedVideo;

const Container = tw.div`
bg-white my-[.625rem]
`;

const Header = tw.div`
p-[1rem] text-[1.5rem] text-common-text-color
`;

const VideoThumbnail = tw.div`
p-[1rem] pt-0
`;
