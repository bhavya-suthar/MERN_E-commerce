import { useContext } from "react"
import {ShopContext} from '../Context/ShopContext'
import { useParams } from "react-router-dom"
import ProductHd from "../Components/ProductHd"
import ProductDisplay from "../Components/ProductDisplay"
import ProductDescription from "../Components/ProductDescription"
import RelatedProducts from "../Components/RelatedProducts"

const Product = () => {
  const {all_products} = useContext(ShopContext)
  console.log("🚀 ~ Product ~ all_products:", all_products)
  
  const {productId} = useParams();
  console.log("🚀 ~ Product ~ productId:", productId)

  const product = all_products.find((e)=> e.id === Number(productId));
  console.log("🚀 ~ Product ~ product:", product)
  
  if(!product){
    return <div>Product not Found!</div>
  }
  return (
    <section className="max_padd_container py-28">

    <div>
      <ProductHd product={product}/>
      <ProductDisplay product={product}/>
      <ProductDescription/>
      <RelatedProducts/>
    </div>
    </section>
  )
}

export default Product
