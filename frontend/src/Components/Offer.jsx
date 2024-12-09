import { useNavigate } from "react-router-dom"

const Offer = () => {
  const navigate = useNavigate()
  const handleGotoStore =()=>{
    navigate('/mens')
  }
  return (
    <section className="bg-bgBanner bg-cover bg-center w-full px-4 py-24 mt-16">
    <div className="max_padd_container">
      <h2 className="h2 text-white"> Up to 50% Off on Men's Wear </h2>
      <h3 className="h3 capitalize text-white"> Shop Your Style Today!</h3>
      <button className="btn_dark_rounded" onClick={handleGotoStore}>Go to Store</button>
    </div>

    </section>
  )
}

export default Offer