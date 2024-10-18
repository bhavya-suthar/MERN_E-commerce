import { MdOutlineLocalOffer } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      heading: "Up to 50% Off!",
      description:"Shop our biggest sale of the season! Find unbeatable discounts on your favorite styles. Don’t wait—limited stock available.Explore the ultimate men’s collection. From smart casual to streetwear, find pieces that fit your lifestyle and exude confidence.",
      bgClass: "bg-hero", // Tailwind background class for first image
    },
    {
      heading: "Exclusive Designs Just for You",
      description:
        "Don't miss out on our limited-edition pieces, crafted for those who seek uniqueness. Shop now before they’re gone",
      bgClass: "bg-hero2", // Tailwind background class for second image
    },
    {
      heading: "Elevate Your Style",
      description:
      "Discover the latest trends and timeless pieces for a wardrobe that makes a statement. From bold prints to chic essentials, we've got your fashion needs covered.Find clothes that fit like they were made just for you. From custom sizes to tailored fits, we ensure you look your best, always.",
      bgClass: "bg-hero3", // Tailwind background class for third image
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  // const prevSlide = () => {
  //   setCurrentSlide((prevSlide) =>
  //     prevSlide === 0 ? slides.length - 1 : prevSlide - 1
  //   );
  // };
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on unmount
  }, [currentSlide]);

  return (
    <section className="relative h-96 w-full mt-24 ">
      <div className="overflow-hidden h-full mb-0">
        {/* Sliding Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`min-w-full flex-shrink-0 h-full flex flex-col items-start relative ${slide.bgClass} bg-cover bg-center`}
            >
              {/* Overlay for better text visibility */}
              <div className="bg-black/5 absolute inset-0"></div>

              {/* Slide content */}
              <div className="relative z-10 p-8">
                <h1 className="h2 capitalize m-0 max-w-[37rem] text-white">
                  {slide.heading}
                </h1>
                <p className="text-grey-50 regular-16 mt-6 max-w-[33rem] text-white">
                  {slide.description}
                </p>
                {/* <div className="flexStart !items-center gap-x-4 my-10">
                  <div className="!regular-24 flexCenter gap-x-3 text-white">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <div className="bold-16 sm:bold-20 text-white">
                    176k{" "}
                    <span className="regular-16 sm:regular-20">
                      Excellent Reviews
                    </span>
                  </div>
                </div> */}
                <div className="max-xs:flex-col flex gap-2 my-10">
                  <NavLink
                    to={""}
                    className={"btn_dark_rounded flexCenter text-white"}
                  >
                    Shop Now
                  </NavLink>
                  <NavLink
                    to={""}
                    className={"btn_dark_rounded flexCenter gap-x-2 text-white"}
                  >
                    <MdOutlineLocalOffer className="text-2xl" />
                    Offers
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
