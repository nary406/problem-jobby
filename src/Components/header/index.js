import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const nadifn = 'fsvkn'

  const logoutPage = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul className="nav_bar">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            style={{width: '100px'}}
            alt="website logo"
          />
        </li>
      </Link>

      <li className="nav_element">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/jobs">
          <p>jobs</p>
        </Link>
      </li>
      <li>
        <button className="logout_btn" onClick={logoutPage} type="button">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
