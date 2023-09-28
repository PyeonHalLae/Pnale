// import { useNavigate } from "react-router-dom";
import { searchInputData } from "@recoil/kdmRecoil";
import { useRecoilState } from "recoil";
import tw from "tailwind-styled-components";

const SearchInput = () => {
  // const navigate = useNavigate();
  const [name, setName] = useRecoilState(searchInputData);

  return (
    <SearchMain>
      <div className="flex items-end justify-between px-4 text-common-text-color">
        <p className="text-2xl font-bold">최근 검색어</p>
        <button className="text-common-text-gray-color">전체삭제</button>
      </div>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1" onClick={() => setName({ ...name, input: "포카칩" })}>
          포카칩
        </p>
      </RecentTag>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1">맥도날드 더블 쿼터파운드 치즈버거</p>
      </RecentTag>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1">GS-25 김혜자 치킨버거</p>
      </RecentTag>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1">오늘의 점심은?</p>
      </RecentTag>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1">프링글스</p>
      </RecentTag>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1">짜장면 짬뽕 탕수육</p>
      </RecentTag>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1">특화 프로젝트 화이팅</p>
      </RecentTag>
      <RecentTag>
        <img
          src="/img/icons/recentTag.png"
          alt="지난 검색"
          className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
        />
        <p className="mt-1">계란 프라이 프라이</p>
      </RecentTag>
    </SearchMain>
  );
};

export default SearchInput;

const RecentTag = tw.div`
flex
text-xl
my-4
px-3
items-center
`;

const SearchMain = tw.div`
animate-moveToRight
`;
