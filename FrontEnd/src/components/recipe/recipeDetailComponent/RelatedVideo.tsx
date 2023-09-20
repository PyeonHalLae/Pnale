import tw from "tailwind-styled-components";

const RelatedVideo = ({ videoUrl }: { videoUrl: string }) => {
  // const ThuUrl = videoUrl
  //   .replace("https://youtu.be/", "")
  //   .replace("https://www.youtube.com/embed/", "")
  //   .replace("https://www.youtube.com/watch?v=", "")
  //   .split("&")[0];

  const LinkUrl = videoUrl
    .replace("https://youtu.be/", "https://www.youtube.com/embed/")
    .replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");

  return (
    <Container>
      <Header>
        관련 영상
        <a
          href={videoUrl}
          className="w-[100%]
          text-[.75rem] 
          line-clamp-1 
          mb-[.625rem] 
          p-[.25rem]
          border-[0.05rem]
          rounded-[0.5rem]
          border-common-bold-back-color
          bg-common-back-color"
        >
          {videoUrl}
        </a>
      </Header>
      <VideoBox>
        {/* <a rel="stylesheet" href={videoUrl}>
          <img
            className="w-full"
            src={`https://img.youtube.com/vi/${ThuUrl}/mqdefault.jpg`}
            alt="보러가기"
          />
        </a> */}

        <iframe className="w-[calc(100%)] h-[18.75rem]" src={LinkUrl} title="정의"></iframe>
      </VideoBox>
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

const VideoBox = tw.div`
p-[1rem] pt-0
`;
