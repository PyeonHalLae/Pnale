// import { useNavigate } from "react-router-dom";
import { searchInputData, storedToSearchTag } from "@recoil/kdmRecoil";
import { useRecoilState, useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

const SearchInput = () => {
  // const navigate = useNavigate();
  const [name, setName] = useRecoilState(searchInputData);
  const getSearchTag = useRecoilValue(storedToSearchTag);

  return (
    <SearchMain>
      <div className="flex items-end justify-between px-4 text-common-text-color">
        <p className="text-2xl font-bold">최근 검색어</p>
        <button className="text-common-text-gray-color">전체삭제</button>
      </div>
      {getSearchTag.slice(0, 9).map((data, index) => (
        <RecentTag key={index + "-" + data.length}>
          <img
            src="/img/icons/recentTag.png"
            alt="지난 검색"
            className="p-1.5 mr-2 rounded-full w-7 bg-common-text-gray-color"
          />
          <p className="mt-1" onClick={() => setName({ ...name, input: data })}>
            {data}
          </p>
        </RecentTag>
      ))}
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
