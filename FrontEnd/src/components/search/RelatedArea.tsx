import RelatedCard from "@components/common/RelatedCard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const RelatedArea = () => {
  const navigate = useNavigate();

  const [related, setRelated] = useState<Main[]>([]);

  useEffect(() => {
    axios.get("/api/product/main").then((res) => {
      const saleRes = res.data.data.recommands;
      setRelated(saleRes);
    });
  }, []);

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
        {related.map((info, index) => (
          <RelatedCard
            key={index + "-" + info.product.productId + "-related"}
            id={index + "-" + info.product.productId + "-related"}
            product={info}
          />
        ))}
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
