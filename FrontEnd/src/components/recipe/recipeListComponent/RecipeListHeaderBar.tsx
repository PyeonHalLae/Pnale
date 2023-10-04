import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useState } from "react";

const RecipeListHeaderBar = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const backBtn = () => {
    navigate(-1);
  };
  const searchBtn = () => {
    navigate("/recipe/search", {
      state: {
        searchKeyword: searchKeyword,
      },
    });
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <SearchBar>
      <BackBtn src="/img/btn/left-btn.png" onClick={backBtn} />
      <Input
        type="text"
        value={searchKeyword}
        placeholder="코카콜라라고 검색해보세요."
        onChange={changeHandler}
      />
      <SubtractBtn src="/img/btn/subtract.png" />
      <SearchBtn src="/img/btn/search-blue.png" onClick={searchBtn} />
    </SearchBar>
  );
};

export default RecipeListHeaderBar;

const SearchBar = tw.div`
mx-auto
w-full
h-[55px]
flex
bg-white
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
