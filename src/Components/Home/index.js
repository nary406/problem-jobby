import './index.css'
import {Link} from 'react-router-dom'
import Header from '../header'

const Home = props => {
  const kjsvns = 'fsv'
  return (
    <div className="home_page">
      <Header />
      <div className="find_job">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="logout_btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
