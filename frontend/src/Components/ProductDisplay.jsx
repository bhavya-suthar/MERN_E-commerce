import { MdStar } from "react-icons/md";
import product_rt_1 from "../assets/product_rt_1.png";
import product_rt_2 from "../assets/product_rt_2.png";
import product_rt_3 from "../assets/product_rt_3.png";
import product_rt_4 from "../assets/product_rt_4.png";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {
  const navigate = useNavigate()
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [selectSize , setSelectSize] = useState(null)
  console.log("🚀 ~ ProductDisplay ~ selectSize:", selectSize)

  const handleSize = (size) =>{
    setSelectSize(size)
  }

  const notify = () => toast.success("Product Added to Cart Successfully!",{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  return (
    <section>
      <div className="flex flex-col gap-14 xl:flex-row">
        {/* left side */}
        <div className="flex gap-x-2 xl:flex-1">
          {/* <div className="flex flex-col gap-[7px] flex-wrap">
            <img src={product_rt_1} alt="prdctImg" className="max-h-[99px]" />
            <img src={product_rt_2} alt="prdctImg" className="max-h-[99px]" />
            <img src={product_rt_3} alt="prdctImg" className="max-h-[99px]" />
            <img src={product_rt_4} alt="prdctImg" className="max-h-[99px]" />
          </div> */}
          <div>
            <img src={product.image} alt="" />
          </div>
        </div>
        {/* right side */}
        <div className="flex-col flex xl:flex-[1.7]">
          <h3 className="h3">{product.name}</h3>
          <div className="flex gap-x-2 text-[#f7c23d] medium-22">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <p>(111)</p>
          </div>
          <div className="flex gap-x-6 medium-20 my-4">
            <div className="line-through">₹{product.old_price}</div>
            <div className="text-secondary">₹{product.new_price}</div>
          </div>
          <div className="mb-4">
            <h4 className="bold-16">Select Size:</h4>
            {/* <div className="flex gap-3 my-3">
              <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer">
                S
              </div>
              <div className="ring-2 ring-slate-900/10 h-10 w-10 flexCenter cursor-pointer">
                M
              </div>
              <div className="ring-2 ring-slate-900/10 h-10 w-10 flexCenter cursor-pointer">
                L
              </div>
              <div className="ring-2 ring-slate-900/10 h-10 w-10 flexCenter cursor-pointer">
                XL
              </div>
            </div> */}

            <div className="flex gap-3 my-3">
              {["S", "M", "L", "XL"].map((size) => (
                <div
                  key={size}
                  onClick={() => handleSize(size)}
                  className={`ring-2 h-10 w-10 flexCenter cursor-pointer ${
                    selectSize === size
                      ? "ring-slate-900 bg-gray-200"
                      : "ring-slate-900/10"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          
            <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
              <button
               onClick={() => {
                  // if (!selectSize) {
                  //   toast.error("Please select a size before adding to cart!", {
                  //     theme: "dark",
                  //   });
                  //   return;
                  // }
                  addToCart(product.id, selectSize); // Pass selected size
                  notify();
                }}
                className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest"
              >
                Add to Cart
              </button>
              <button className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest" onClick={()=>navigate("/paymentform")}>
                Buy it Now
              </button>
            </div>
            <p>
              <span className="medium-16 text-tertiary">Category : </span>Women
              | jacket | winter
            </p>
            <p>
              <span className="medium-16 text-tertiary">Tags : </span>Morden |
              Latest
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
