import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchInputData, searchIdsArray, storedToSearchTag } from "@recoil/kdmRecoil";
import { useQuery } from "react-query";
import { SearchResponseToRecommand } from "@/model/commonType";
import { toast } from "react-toastify";

const RecipeListHeaderBar = () => {
  const navigate = useNavigate();
  const [name, setName] = useRecoilState<{ input: string }>(searchInputData);
  const addSearchTag = useSetRecoilState(storedToSearchTag);
  // const [isFocused, setIsFocused] = useState(false);  포커스 상태를 관리할 상태 변수
  const setIdsArray = useSetRecoilState(searchIdsArray);
  const backBtn = () => {
    navigate(-1);
  };

  const reset = () => {
    setName({ ...name, input: "" });
  };

  const toggleSearch = async (data: SearchResponseToRecommand[]) => {
    const idsArray = data.map((item) => item.id);
    // console.log("전송할 id 값:", idsArray);
    setIdsArray(idsArray);

    const response = await axios.post("/api/search/result", {
      ids: idsArray,
      keyword: name.input,
    });
    console.log(response);

    if (response.data.code !== 1004) {
      addSearchTag((prev) => [name.input, ...prev]);
      // addSearchTag([]);
      navigate("/search", { state: { responseData: response.data.data } });
    } else if (response.data.code === 1004 || name.input.trim.length === 0) {
      toast.error("검색어를 입력하세요", {
        position: "top-center", // 원하는 포지션 설정
        autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
        hideProgressBar: true,
      });
    }
    reset();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName((prev) => ({
      ...prev,
      input: inputValue, // Recoil 상태 업데이트
    }));
  };

  const handleDivClick = (name: string) => {
    const fakeEvent = { target: { value: name } } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(fakeEvent);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, []);

  // const isFocus = () => {
  //   setIsFocused(true);
  //   if (!location.pathname.startsWith("/search/what") && isFocused) {
  //     navigate("/search/what");
  //     setIsFocused(false);
  //   }
  // };

  // eslint-disable-next-line
  const { data, isLoading, isError } = useQuery<SearchResponseToRecommand[], AxiosError>(
    ["searchTag", name.input],
    async () => {
      if (name.input !== "") {
        const response = await axios.post("/api/search", {
          name: name.input,
        });

        return response.data.data;
      } else return [];
    },
    {
      onError: (error) => {
        console.log("onError");
        console.log(error?.response?.status);
      },
      retry: 2,
      cacheTime: 0,
    }
  );

  // useEffect(() => {
  //   const searchTag = async () => {
  //     console.log("요청 보낸다: ", name.input);
  //     try {
  //       const response = await axios.post("/api/search", {
  //         name: name.input,
  //       });
  //       console.log("요청 성공:", ...response.data.data);
  //     } catch (error) {
  //       console.error("요청 실패:", error);
  //     }
  //   };
  //   if (name.input !== "") {
  //     searchTag();
  //   }
  // }, [name]);

  return (
    <>
      <SearchBar>
        <BackBtn src="/img/btn/left-btn.png" onClick={backBtn} />
        <Input
          type="text"
          placeholder="코카콜라라고 검색해보세요."
          value={name.input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleSearch(data);
            }
          }}
        />
        <SubtractBtn src="/img/btn/subtract.png" onClick={() => reset()} />
        <SearchBtn src="/img/btn/search-blue.png" onClick={() => toggleSearch(data)} />
      </SearchBar>
      {data && data.length >= 1 && (
        <TagBox>
          {data.slice(0, 9).map((index, key) => (
            <RecommandTag key={index.id + "-" + key} onClick={() => handleDivClick(index.name)}>
              {index.name}
            </RecommandTag>
          ))}
        </TagBox>
      )}
    </>
  );
};

export default RecipeListHeaderBar;

const SearchBar = tw.div`
mx-auto
w-full
h-[55px]
flex
`;

const BackBtn = tw.img`
ml-5
mr-3 
my-auto
w-3
h-5 
`;

const Input = tw.input`
w-3/4
h-2/3
rounded-md
my-auto
pl-2
`;

const SubtractBtn = tw.img`
my-auto
w-4
h-4
relative
left-[-2rem]
`;
const SearchBtn = tw.img`
ml-6
my-auto
w-6
h-6 
relative
left-[-1.5rem]
`;

const TagBox = tw.div`
pl-4
z-20
absolute
 w-full 
bg-common-back-color
max-w-[450px]
rounded-lg
border-2
border-common-orange
`;

const RecommandTag = tw.div`
flex
text-sm
my-2
px-1
items-center
`;
