import tw from "tailwind-styled-components";

const RecipeRelatedVideo = ({ videoUrl }: { videoUrl: string }) => {
  // const ThuUrl = videoUrl
  //   .replace("https://youtu.be/", "")
  //   .replace("https://www.youtube.com/embed/", "")
  //   .replace("https://www.youtube.com/watch?v=", "")
  //   .split("&")[0];

  const LinkUrl = videoUrl
    .replace("https://youtu.be/", "https://www.youtube.com/embed/")
    .replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");

  const startUrl = "https://www.youtube.com/embed/";
  return (
    <>
      {LinkUrl && LinkUrl.startsWith(startUrl) && (
        <Container>
          <Header>
            관련 영상
            <a
              href={videoUrl}
              className="w-[100%]
          h-[1.6875rem]
          text-[.75rem] 
          line-clamp-1 
          mb-[.625rem] 
          p-[.25rem]
          py-[.4rem]
          border-[0.05rem]
          rounded-[0.625rem]
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

            <iframe
              className="w-[calc(100%)] h-[18.75rem]"
              src={LinkUrl}
              title="비디오화면"
            ></iframe>
          </VideoBox>
        </Container>
      )}
    </>
  );
};

export default RecipeRelatedVideo;

const Container = tw.div`
bg-white my-[.625rem]
`;

const Header = tw.div`
pt-[1rem] px-[1.875rem] text-[1.25rem] text-common-text-color
`;

const VideoBox = tw.div`
pb-[1rem] px-[1.875rem]
`;
