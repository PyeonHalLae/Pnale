// import { useNavigate } from "react-router-dom";
import { searchInputData, storedToSearchTag } from "@recoil/kdmRecoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

const SearchInput = () => {
  // const navigate = useNavigate();
  const [name, setName] = useRecoilState(searchInputData);
  const getSearchTag = useRecoilValue(storedToSearchTag);
  const [loginState, setLoginState] = useState<boolean>(false);
  const [userSearchTag, setUserSearchTag] = useState<string[]>();
  // const { data } = useQuery(
  //   "getUserSearchTag",
  //   async () => {
  //     const response = await axios.get("/api/mylist/search", { withCredentials: true });
  //     return response;
  //   },
  //   {
  //     onSuccess: (res) => {
  //       console.log("onSuccess");
  //       console.log(res);
  //     },
  //     onError: (error) => {
  //       console.log("onError");
  //       console.log(error?.response?.status);
  //     },
  //     retry: 2,
  //   }
  // );

  // console.log("data", data);

  const searchList = () => {
    axios
      .get("/api/mylist", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.code == 200) {
          // response.data.code가 200일 경우 리스트 반환
          setUserSearchTag(response.data.data);
          console.log(response, "200"); // 데이터
        } else if (response.data.code == 204) {
          // response.data.code가 204일 경우
          // localstorage에서 불러오세요
          setLoginState(true);
          console.log(response, "204"); // 데이터
        }
      })
      .catch((error) => {
        const code = error.response.status;
        if (code === 401) {
          axios
            .get("/api/auth/mylist", {
              withCredentials: true,
            })
            .then((response) => {
              if (response.data.code == 200) {
                // response.data.code가 200일 경우 리스트 반환
                setUserSearchTag(response.data.data);
                console.log(response.data.data, "401-200"); // 데이터
              } else if (response.data.code == 204) {
                // response.data.code가 204일 경우
                // localstorage에서 불러오세요
                console.log(response, "401-204"); // 데이터
                setLoginState(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    searchList();
  }, []);

  return (
    <SearchMain>
      <div className="flex items-end justify-between px-4 text-common-text-color">
        <p className="text-2xl font-bold">최근 검색어</p>
        <button className="text-common-text-gray-color">전체삭제</button>
      </div>
      {loginState &&
        getSearchTag.slice(0, 9).map((data, index) => (
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
      {userSearchTag &&
        userSearchTag.length > 0 &&
        userSearchTag.slice(0, 9).map((data, index) => (
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
