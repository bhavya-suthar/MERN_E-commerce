import { useLocation, useNavigate } from 'react-router-dom'

const PrivateRoute = ({element,token}) => {
  
    const navigate = useNavigate()
    const location = useLocation()
    console.log("🚀 ~ PrivateRoute ~ location:", location)

    return token ? element : navigate('/login')

}

export default PrivateRoute