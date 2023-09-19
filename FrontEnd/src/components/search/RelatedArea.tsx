import RelatedCard from "@components/common/RelatedCard";
import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const RelatedArea = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-orange">관련</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 상품</span>
        </div>
        <button
          className="absolute right-0 inline-block pr-5 font-bold bottom-4 text-common-orange"
          onClick={() => navigate("/search-related")}
        >
          더보기
        </button>
      </div>
      <Slider>
        <RelatedCard />
        <RelatedCard />
        <RelatedCard />
        <RelatedCard />
        <RelatedCard />
      </Slider>
    </div>
  );
};

export default RelatedArea;

const Slider = tw.div`
 overflow-auto
 whitespace-nowrap

}
`;
