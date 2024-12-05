import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import all_products from "../assets/all_products";
import Item from "../Components/Item";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Category = ({ category, banner }) => {
  // console.log("🚀 ~ Category ~ category:", category)

  const { all_products } = useContext(ShopContext);

  return (
    <section className="max_padd_container py-12 xl:py-28">
      <div>
        <div>
          <img src={banner} alt="" className="block mb-7 mx-auto w-[800px]" />
        </div>
        {/* <div className="flexBetween my-8 mx-2">
          <h5>
            <span className="font-bold">Showing 1-12</span>out of 36 products
          </h5>
          <div className="flexBetween max-sm:p-4 gap-x-4 px-8 py-3 rounded-5xl ring-1 ring-slate-900/15">
            <select name="" id="sort" className="bg-[#f0f2f5] cursor-pointer">
              <option value="">
                {" "}
                Sort by <MdOutlineKeyboardArrowDown />
              </option>
              <option id="sort-button-acd" value="sortAtoZ">
                A-Z
              </option>
              <option id="sort-button-dce" value="sortZtoA">
                Z-A
              </option>
              <option id="sort-buttonpr" value="sortPrice">
                Sort Price
              </option>
            </select>
          </div>
        </div> */}
        {/* container */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {all_products.map((item) => {
            {
              /* console.log("🚀 ~ {all_products.map ~ item:", item) */
            }
            if (category === item.category) {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
          })}
        </div>
        {/* <div className="mt-16 text-center">
          <button className="btn_dark_rounded">Load More</button>
        </div> */}
      </div>
    </section>
  );
};

export default Category;
