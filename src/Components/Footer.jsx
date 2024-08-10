import { Link } from "react-router-dom"
import FOOTER_LINKS from '../assets/data'
const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <Link to="/" className="mb-10 bold-20">Shoppee</Link>
          <div>
            {FOOTER_LINKS.map((col)=>(
              <FooterColumn></FooterColumn>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
