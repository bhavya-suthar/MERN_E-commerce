import { MdOutlineLocalOffer, MdStar } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";


const Hero = () => {
  return (
    <section  className="relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full mt-20 pb-12">
      <div className="max_padd_container relative top-30 xs:top-12">
        <h1 className="h1 capitalize m-0 max-w-[37rem]">Digital Shopping Hub Junction</h1>
        <p className="text-grey-50 regular-16 mt-6 max-w-[33rem]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          atque voluptatem id inventore, dicta hic accusantium, asperiores
          aspernatur sint exercitationem nesciunt quia ipsa eveniet perferendis
          in quasi excepturi ut iusto laudantium perspiciatis placeat vel?
        </p>
        <div className="flexStart !items-center gap-x-4 my-10">
          <div className="!regular-24 flexCenter gap-x-3">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className="bold-16 sm:bold-20">
            176k{" "}
            <span className="regular-16 sm:regular-20">Excellent Reviews</span>
          </div>
        </div>
        <div className="max-xs:flex-col flex gap-2">
             <NavLink to={''} className={"btn_dark_rounded flexCenter"}>Shop Now</NavLink>
             <NavLink to={''} className={"btn_dark_rounded flexCenter gap-x-2"}><MdOutlineLocalOffer className="text-2xl"/>
             Offers</NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
