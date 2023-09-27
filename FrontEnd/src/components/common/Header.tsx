import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { searchInputData } from "@recoil/kdmRecoil";
import { useQuery, useQueryClient } from "react-query";

const Header = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useRecoilState(searchInputData);
  const queryClient = useQueryClient();

  const backBtn = () => {
    navigate(-1);
  };

  const reset = () => {
    setName({ ...name, input: "" });
  };
  const toggleSearch = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    navigate("/search");
  };

  const handleInputChange = (e) => {
    setName({ ...name, input: e.target.value });
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const { data, isLoading, isError, error } = useQuery<any, AxiosError>(
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
      // onSuccess: (data) => {
      //   queryClient.setQueryData(["searchTag", setName({ ...name, input: "" })], data);
      // },
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
        <SearchBtn src="/img/btn/search-blue.png" onClick={toggleSearch} />
      </SearchBar>
      {/* <div className="absolute w-full bg-slate-400 max-w-[450px]">
        {data.map((index) => (
          <div>{index}</div>
        ))}
      </div> */}
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
