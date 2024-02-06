import './index.css'
import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsStarFill, BsSearch} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'

import Cookies from 'js-cookie'

class TotalJobsList extends Component {
  state = {searchInput: ''}

  onChangeSearchInput = event => {
    const {SearchInputFunction, getTotalJobs} = this.props

    this.setState({searchInput: event.target.value})
  }

  jobListFunction = () => {
    const {jobList} = this.props
    console.log(jobList.length)

    if (jobList.length !== 0) {
      return (
        <ul>
          {jobList.map(item => (
            <Link to={`/jobs/${item.id}`}>
              <li key={item.id} className="job_item">
                <div className="logo_div">
                  <img
                    src={item.companyLogoUrl}
                    alt="company logo"
                    style={{width: '50px'}}
                  />

                  <div className="title_div">
                    <h4>{item.title}</h4>
                    <div className="rating_div">
                      <BsStarFill />
                      <p>{item.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="location_div">
                  <div className="word_details">
                    <div className="location_text">
                      <MdLocationOn style={{width: '80px'}} />
                      <p style={{color: 'white'}}>{item.location}</p>
                    </div>
                    <div className="work_text">
                      <MdWork />
                      <p style={{color: 'white'}}>{item.employmentType}</p>
                    </div>
                  </div>
                  <p>{item.packagePerAnnum}</p>
                </div>

                <hr />
                <h1>Description</h1>
                <p style={{margin: '0px'}}>{item.description}</p>
              </li>
            </Link>
          ))}
        </ul>
      )
    }

    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="No Jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  render() {
    const {searchInput} = this.state

    return (
      <div>
        <div>{this.jobListFunction()}</div>
      </div>
    )
  }
}

export default TotalJobsList
