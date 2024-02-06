import './index.css'
import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsStarFill, BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../header'

import Profile from '../profile'
import FilterGroup from '../filterGroup'

import TotalJobsList from '../totalJobList'

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    jobList: [],
    searchInput: '',
    pageScenes: 'initial',
  }

  componentDidMount() {
    this.getTotalJobs()
  }

  getTotalJobs = async () => {
    const jwtToken = Cookies.get('jwtToken')
    this.setState({pageScenes: 'loading'})
    const {employmentType, salaryRange, searchInput} = this.state
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = ` https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        description: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({jobList: updatedData, pageScenes: 'success'})
    } else {
      this.setState({pageScenes: 'failure'})
    }
  }

  employmentType = (value, bool) => {
    const {employmentType} = this.state
    if (bool === true) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, value],
        }),
        this.getTotalJobs,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: [
            ...prevState.employmentType.filter(item => item !== value),
          ],
        }),
        this.getTotalJobs,
      )
    }
  }

  salaryRangeFunction = value => {
    this.setState({salaryRange: value}, this.getTotalJobs)
  }

  SearchInputFunction = value => {
    this.setState({searchInput: value})
  }

  successView = () => {
    const {employmentType, jobList} = this.state
    return (
      <div className="right_div">
        <TotalJobsList
          jobList={jobList}
          getTotalJobs={this.getTotalJobs}
          SearchInputFunction={this.SearchInputFunction}
        />
      </div>
    )
  }

  renderLoadingView = () => {
    const {jobItemDetails, status} = this.state
    return (
      <div className="loaderSpin" data-testid="loader">
        <Loader type="ThreeDots" color="white" height="50" width="50" />
      </div>
    )
  }

  returnPage = () => {
    this.setState({status: 'initial'}, this.getTotalJobs)
  }

  renderFailureView = () => {
    const {jobItemDetails, status} = this.state
    return (
      <div className="failure-container_2" data-testid="loader">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          onClick={this.returnPage}
          alt="Retry"
          type="button"
          style={{
            backgroundColor: 'blue',
            padding: '15px',
            borderRadius: '20px',
            border: 'none',
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  switchCase = () => {
    const {jobItemDetails, pageScenes} = this.state
    switch (pageScenes) {
      case 'success':
        return this.successView()
      case 'loading':
        return this.renderLoadingView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  keyDownSearchInput = event => {
    const {searchInput} = this.state
    if (event.key === 'Enter') {
      this.getTotalJobs()
    }
  }

  searchButton = () => {
    this.getTotalJobs()
  }

  render() {
    const {employmentType, searchInput, jobList} = this.state

    return (
      <div>
        <Header />
        <div className="main_div">
          <div className="left_div">
            <Profile />
            <FilterGroup
              employmentType={this.employmentType}
              salaryRangeFunction={this.salaryRangeFunction}
            />
          </div>
          <div style={{width: '100%'}}>
            <div className="search_div">
              <input
                type="search"
                placeholder="search"
                className="search_bar"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.keyDownSearchInput}
              />
              <button
                onClick={this.searchButton}
                className="search_icon"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch alt="search icon" />
              </button>
            </div>

            {this.switchCase()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
