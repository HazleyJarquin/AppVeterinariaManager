import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper/modules";

interface Props {
  data: React.ReactNode[];
  height: string;
}

export const Carousel = ({ data, height = "500px" }: Props) => {
  return (
    <>
      <Swiper
        style={{
          height: height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        modules={[Navigation, Autoplay, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {data?.map((children: React.ReactNode, index: number) => (
          <SwiperSlide key={index}>{children}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
