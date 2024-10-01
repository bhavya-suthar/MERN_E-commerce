import { useLocation, useNavigate } from "react-router-dom"

const PublicRoute = ({token,element}) => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log("🚀 ~ PublicRoute ~ location:", location)

    return !token ? element : navigate(-1)

}

export default PublicRoute