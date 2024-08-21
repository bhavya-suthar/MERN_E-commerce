import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import all_products from "../assets/all_products"
import Item from "../Components/Item"

const Category = ({category,banner}) => {
  return (
    <section className="max_padd_container py-12 xl:py-28">
    <div>
      <div>
        <img src={banner} alt="" className="block my-7 mx-auto"/>
      </div>
    </div>
    <div>
      <h5><span>Showing 1-12</span>out of 36 products</h5>
      <div>Sort by <MdOutlineKeyboardArrowDown/></div>
    </div>
    {/* container */}
    <div>
      {all_products.map((item)=>{
        if(category === item.category){
          return <Item key={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />

        }
      })}
    </div>
    </section>
  )
}

export default Category
