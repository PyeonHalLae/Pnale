export const loadImage = (imageUrl: string, id: string) => {
  const image = new Image();
  image.src = imageUrl;

  image.onload = () => {
    // 이미지 로드에 성공한 경우
    document.getElementById(id).appendChild(image);
  };

  image.onerror = () => {
    // 이미지 로드에 실패한 경우
    const fallbackImage = new Image();
    fallbackImage.src = "/img/sticker/noimage.jpg";
    document.getElementById(id)?.appendChild(fallbackImage);
  };
};
