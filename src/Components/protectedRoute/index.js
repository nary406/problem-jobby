import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwtToken')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}
export default ProtectedRoute
