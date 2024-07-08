"use client"

import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HowToCard from "./HowToCard";
import howToList from "./HowToList";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiperCustom.scss';
import styles from "./HowTo.module.scss";

export default function HowToModal() {
  const { setIsHowToModal } = useIsHowToModal();

  return (
    <div className={styles.container}>
      <span
        className={styles.backround}
        onClick={() => { setIsHowToModal(prev => !prev) }}
        onKeyDown={() => { setIsHowToModal(prev => !prev) }}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />
      <Swiper
        className={styles.swiper_container}
        spaceBetween={50}
        slidesPerView={1.2}
        centeredSlides
        loop
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ type: 'fraction' }}
        onClick={() => setIsHowToModal(prev => !prev)}
      >
        {
          howToList.map((item) =>
            <SwiperSlide key={item.number} className={styles.swiper_slide}>
              <HowToCard {...item}/>
            </SwiperSlide>
          )
        }
      </Swiper>

    </div>
  );
}