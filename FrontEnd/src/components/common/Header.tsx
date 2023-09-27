import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { searchInputData } from "@recoil/kdmRecoil";
import { useQuery } from "react-query";
import { SearchResponseToRecommand } from "@/model/commonType";

const Header = () => {
  const navigate = useNavigate();
  const [name, setName] = useRecoilState<{ input: string }>(searchInputData);

  const backBtn = () => {
    navigate(-1);
  };

  const reset = () => {
    setName({ ...name, input: "" });
  };
  const toggleSearch = async (name: string) => {
    const response = await axios.post("/api/search/result", {
      ids: [14770],
    });
    console.log(response.data.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName((prev) => ({
      ...prev,
      input: inputValue, // Recoil 상태 업데이트
    }));
  };

  const handleDivClick = (name: string) => {
    console.log(name);
    const fakeEvent = { target: { value: name } } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(fakeEvent);
  };
  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const { data, isLoading, isError, error } = useQuery<SearchResponseToRecommand[], AxiosError>(
    ["searchTag", name.input],
    async () => {
      if (name.input !== "") {
        const response = await axios.post("/api/search", {
          name: name.input,
        });
        console.log(response.data.data);
        return response.data.data;
      } else return [];
    },
    {
      retry: 2,
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
        />
        <SubtractBtn src="/img/btn/subtract.png" onClick={() => reset()} />
        <SearchBtn src="/img/btn/search-blue.png" onClick={() => toggleSearch(name.input)} />
      </SearchBar>
      <TagBox className="">
        {data &&
          data.map((index, key) => (
            <RecommandTag key={index.id + "-" + key} onClick={() => handleDivClick(index.name)}>
              {index.name}
            </RecommandTag>
          ))}
      </TagBox>
    </>
  );
};

export default Header;

const SearchBar = tw.div`
mx-auto
w-full
h-[55px]
flex
bg-white
animate-moveToRight
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
pb-3
pl-4
z-10
absolute
 w-full 
bg-white
max-w-[450px]
`;
const RecommandTag = tw.div`
mt-2
`;
