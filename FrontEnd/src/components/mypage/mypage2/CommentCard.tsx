import styled from "styled-components";
import tw from "tailwind-styled-components";

const CommentCard = () => {
  return (
    <>
      <BackSize>
        <MenuBtn></MenuBtn>
        <TitleBox>
          <Title>인생 짜빠구리 만드는 방법 입니다 그렇게asdfsdasdsdfaasdf</Title>
        </TitleBox>
        <MainBox>
          <DetailBox>
            <Field>내 댓글:</Field>
            <Content>
              너무 맛있어서 놀랐어요 진짜 쩔요 대박이예요 여기는 그냥 제인생의 전부였어요 맞아요
              그렇다고 알빠예요? 이렇게멋진하늘을볼수asdfsdf
            </Content>
          </DetailBox>
          <DetailBox>
            <Field>작성 일:</Field>
            <Content>2021.11.05</Content>
          </DetailBox>
        </MainBox>
      </BackSize>
    </>
  );
};

export default CommentCard;

const BackSize = tw.div` 
    w-full h-[7.5rem]
    bg-white
    my-[0.625rem]
    mx-auto
    p-[0.625rem]
`;

const TitleBox = tw.div`
  text-base
  border-b-2
  border-common-white-divider
  pb-1
  text-common-text-color
`;

const Title = tw.div`
  w-[calc(100%-2.5rem)]
  overflow-hidden
  whitespace-nowrap
  text-ellipsis
  
`;

const MainBox = tw.div`
  mt-[0.625rem]
`;

const DetailBox = tw.div`
  w-full
  text-[0.8125rem]
  flex
  mt-[0.3125rem]
`;

const Field = tw.div`
  text-common-text-gray-color
  w-[3.125remx]
  align-top
  mr-2
`;

const Content = tw.div`
  text-common-text-color
  w-[calc(100%-55px)] 
  h-[2.5rem]
  line-clamp-2 // 두 줄 이상일 때 ...을 적용하는 클래스
`;

const MenuBtn = styled.div`
  float: right;
  margin-right: 0.3125rem;
  margin-top: 0.125rem;
  width: 0.9375rem;
  height: 0.9375rem;
  background-image: url("/img/btn/menu-btn.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
