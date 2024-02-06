/* eslint-disable react/no-unescaped-entities */

import './index.css'

const NotFound = () => (
  <div className="main-not-found-container">
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="not-found-image"
        alt="notfound"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
