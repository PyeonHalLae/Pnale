import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
const Header = () => {
  const navigate = useNavigate();

  const backBtn = () => {
    navigate(-1);
  };

  return (
    <SearchBar>
      <BackBtn src="/img/btn/left-btn.png" onClick={backBtn} />
      <Input type="text" placeholder="코카콜라라고 검색해보세요." />
      <SubtractBtn src="/img/btn/subtract.png" onClick={backBtn} />
      <SearchBtn src="/img/btn/search-blue.png" />
    </SearchBar>
  );
};

export default Header;

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
