import { searchDateRelate } from "@/model/searchType";
import RelatedCard from "@components/common/RelatedCard";
import tw from "tailwind-styled-components";

type SearchAreaPros = {
  relate: searchDateRelate;
};

const RelatedArea = ({ relate }: SearchAreaPros) => {
  // console.log("relate", relate);

  return (
    <div className="bg-white">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-orange">관련</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 상품</span>
        </div>
      </div>
      <Slider>
        {relate.content.map((info, index) => (
          <RelatedCard
            key={index + "-" + info.productId + "-related"}
            id={index + "-" + info.productId + "-related"}
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
