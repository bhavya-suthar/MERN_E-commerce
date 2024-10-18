import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartItems = () => {


  const notifyError = () => toast.success("Delete Product from Cart!",{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const { all_products, cartItems,removeFromCart,addToCart ,getTotalAmount,deleteFromCart} = useContext(ShopContext);

  
  return (
    <section className="max_padd_container pt-28">
      <table className="w-full mx-auto">
        <thead>
          <tr className="bg-slate-900/10 regular-18 sm:regular-22 text-start py-12">
            <th className="p-1 py-2">Product</th>
            <th className="p-1 py-2">Title</th>
            <th className="p-1 py-2">Price</th>
            <th className="p-1 py-2">Quantity</th>
            <th className="p-1 py-2">Total</th>
            <th className="p-1 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {all_products.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <tr
                  key={e.id}
                  className="border-b text-gray-30 border-slate-900/20 p-6 meium-14 text-center"
                >
                  <td className="flexCenter">
                    <img
                      src={e.image}
                      alt="prdImg"
                      height={43}
                      width={43}
                      className="rounded-lg ring-1 ring-slate-900/5 my-1"
                    />
                  </td>
                  <td >
                    <div className="line-clamp-3">{e.name}</div>
                  </td>
                  <td>₹{e.new_price}</td>
                  {/* <td className="w-16 h-16 bg-white">{cartItems[e.id]}</td> */}
                  <td>
                    {/* Decrease quantity button */}
                    <div  className="flex items-center justify-center align-middle gap-2">

                    <button
                      className="px-2 py-1 bg-black text-white rounded"
                      onClick={() => removeFromCart(e.id,false)}
                    >
                      -
                    </button>
                    <div>{cartItems[e.id]}</div>
                    {/* Increase quantity button */}
                    <button
                      className="px-2 py-1 bg-black text-white rounded"
                      onClick={() =>{ addToCart(e.id);}}
                    >
                      +
                    </button>
                    </div>
                  </td>

                  <td>
                    ₹{e.new_price * cartItems[e.id]}
                  </td>
                  <td>
                    <div className="bold-22 pl-14">
                      <TbTrash onClick={() => {deleteFromCart(e.id),notifyError()}} />
                    </div>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      {/* cart details */}
      <div className="flex flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white w-full max-w-[666px]">
        <div className="flex flex-col gap-10">
            <h4 className="bold-20">Summary</h4>
            <div>
                <div className="flexBetween py-4">
                    <h4 className="medium-16">Subtotal:</h4>
                    <h4 className="text-gray-30 font-semibold">₹{getTotalAmount()}</h4>
                </div>
                <hr />
                <div className="flexBetween py-4">
                    <h4 className="medium-16">Shipping Free:</h4>
                    <h4 className="text-gray-30 font-semibold">Free</h4>
                </div>
                <hr />
                <div className="flexBetween py-4">
                    <h4 className="bold-18">Total:</h4>
                    <h4 className="bold-18">₹{getTotalAmount()}</h4>
                </div>
            </div>
            <Link to={'/paymentform'} className="btn_dark_rounded w-32">Checkout</Link>
            <div className="flex flex-col gap-10">
                <h4 className="bold-20 capitalize">Your coupon code enter here:</h4>
                <div className="flexBetween pl-5 h-12 bg-primarygray rounded-full ring-1 ring-slate-900/10">
                    <input type="text" placeholder="Coupon code"  className="bg-transparent border-none outline-none"/>
                    <button className="btn_dark_rounded">Submit</button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CartItems;
