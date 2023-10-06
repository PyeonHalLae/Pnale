import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import { useQuery, useQueryClient } from "react-query";
import { searchInputData, storedToSearchTag } from "@recoil/kdmRecoil";

const SearchInput = () => {
  const [name, setName] = useRecoilState(searchInputData);
  const getSearchTag = useRecoilValue(storedToSearchTag);
  const [loginState, setLoginState] = useState<boolean>(false);
  const [userSearchTag, setUserSearchTag] = useState<string[]>();
  const [deleteBtn, setDeleteBtn] = useState(false);
  const addSearchTag = useSetRecoilState(storedToSearchTag);
  const queryClient = useQueryClient();
  //검색어 삭제
  const { data: deleteData } = useQuery(
    "deleteSearchTag",
    async () => {
      const res = await axios.delete("/api/mylist", {
        withCredentials: true,
      });
      return res.data;
    },
    {
      onError: (error: AxiosError) => {
        switch (error.response?.status) {
          case 401:
            axios
              .delete("/api/auth/mylist", { withCredentials: true })
              .then((res) => {
                switch (res.data.code) {
                  case 200:
                    queryClient.refetchQueries("recentSearch");
                    break;
                  case 204:
                    addSearchTag([]);
                    setDeleteBtn(false);
                    break;
                  default:
                    console.log("auth 예외: ", res.data.code);
                }
              })
              .catch((error) => {
                console.log("401 예외:", error);
              });
            break;
          default:
            // 그 외의 오류 코드인 경우 콘솔에 출력
            console.error("error status:", error.response?.status);
        }
      },
      retry: 2,
      enabled: deleteBtn,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  // 최근 검색어 가져오기
  const { data: recentSearchData, isLoading: recentSearchLoading } = useQuery(
    "recentSearch",
    async () => {
      const response = await axios.get("/api/mylist", {
        withCredentials: true,
      });
      return response.data;
    },
    {
      onError: (error: AxiosError) => {
        // 오류 처리
        console.error(error);
        switch (error.response?.status) {
          case 401:
            // 401 오류 코드인 경우 다시 요청
            axios
              .get("/api/auth/mylist", {
                withCredentials: true,
              })
              .then((response) => {
                switch (response.data.code) {
                  case 200:
                    // 200일 경우 데이터 반환
                    setUserSearchTag(response.data.data);
                    break;
                  case 204:
                    // 204일 경우 로그인 상태로 변경
                    setLoginState(true);
                    break;
                  default:
                    console.error("response code:", response.data.code);
                }
              })
              .catch((error) => {
                console.error(error);
              });
            break;
          case 403:
            console.log("로그인 좀 해");
            break;
          default:
            // 그 외의 오류 코드인 경우 콘솔에 출력
            console.error("error status:", error.response?.status);
        }
      },
      retry: 1,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    // 최근 검색어 데이터를 가져온 후 로그인 상태를 확인하고 유저 검색어 데이터를 가져오기
    if (!recentSearchLoading) {
      if (recentSearchData?.code === 200) {
        setUserSearchTag(recentSearchData.data);
      } else if (recentSearchData?.code === 204) {
        setLoginState(true);
      }
    }
  }, [recentSearchLoading, recentSearchData]);

  useEffect(() => {
    if (deleteData?.code === 200) {
      console.log("유져 검색 기록 삭제");
      queryClient.refetchQueries("recentSearch");
    } else if (deleteData?.code === 204) {
      addSearchTag([]);
      setDeleteBtn(false);
      console.log("로컬 검색 기록 삭제");
    }
    /* eslint-disable-next-line */
  }, [deleteData]);

  return (
    <SearchMain>
      <div className="flex items-end justify-between px-4 text-common-text-color">
        <p className="text-2xl font-bold">최근 검색어</p>
        <button className="text-common-text-gray-color" onClick={() => setDeleteBtn(true)}>
          전체삭제
        </button>
      </div>
      {(loginState ? getSearchTag : userSearchTag)?.slice(0, 9).map((data, index) => (
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
