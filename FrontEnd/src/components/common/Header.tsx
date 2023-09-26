import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recommandTag, setRecommandTag] = useState([]);

  const backBtn = () => {
    navigate(-1);
  };

  const reset = () => {
    setInputValue("");
  };
  const toggleSearch = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    navigate("/search");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setRecommandTag((pre) => {
      const newData = [...pre, inputValue];
      return newData;
    });
    console.log("inputValue", inputValue);
  }, [inputValue]);

  return (
    <>
      <SearchBar className={isActive ? "active" : ""}>
        <BackBtn src="/img/btn/left-btn.png" onClick={backBtn} />
        <Input
          type="text"
          placeholder="코카콜라라고 검색해보세요."
          value={inputValue}
          onChange={handleInputChange}
        />
        <SubtractBtn src="/img/btn/subtract.png" onClick={() => reset()} />
        <SearchBtn src="/img/btn/search-blue.png" onClick={toggleSearch} />
      </SearchBar>
      <div className="absolute w-full bg-slate-400 max-w-[450px]">
        {recommandTag.map((index) => (
          <div>{index}</div>
        ))}
      </div>
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
