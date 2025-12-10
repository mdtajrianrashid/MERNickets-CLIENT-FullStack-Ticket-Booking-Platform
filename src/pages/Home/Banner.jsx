import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const Banner = () => {
    return (
        <div className="h-[500px] w-full">
            <Swiper navigation={true} modules={[Navigation, Autoplay]} autoplay={{ delay: 3000 }} className="mySwiper h-full">
                <SwiperSlide>
                    <div className="h-full flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url(https://i.ibb.co/hK8bQ2w/bus-banner.jpg)'}}>
                        <div className="bg-black/60 w-full h-full flex flex-col justify-center items-center text-center px-4">
                            <h1 className="text-5xl font-bold text-brand-primary mb-4 drop-shadow-[0_0_10px_#00f2ff]">Safe Travel, Any Time</h1>
                            <p className="text-xl text-white">Book your Bus, Train, or Flight tickets instantly.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-full flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url(https://i.ibb.co/5GzXkwq/train-banner.jpg)'}}>
                        <div className="bg-black/60 w-full h-full flex flex-col justify-center items-center text-center px-4">
                            <h1 className="text-5xl font-bold text-brand-secondary mb-4 drop-shadow-[0_0_10px_#ff00ff]">Luxury Redefined</h1>
                            <p className="text-xl text-white">Experience premium comfort at affordable rates.</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
export default Banner;