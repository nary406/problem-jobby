import {Component} from 'react'
import './index.css'

import {BsStarFill, BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Cookies from 'js-cookie'
import Header from '../header'

class JobsDetails extends Component {
  state = {jobItemDetails: '', status: 'initial'}

  componentDidMount() {
    this.getSingleJob()
  }

  getSingleJob = async () => {
    this.setState({status: 'Loading'})
    const jwtToken = Cookies.get('jwtToken')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = ` https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        companyWebsiteUrl: data.job_details.company_website_url,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(eachValue => ({
          imageUrl: eachValue.image_url,
          name: eachValue.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }

      const similarJobs = data.similar_jobs.map(eachValue => ({
        companyLogoUrl: eachValue.company_logo_url,
        employmentType: eachValue.employment_type,
        id: eachValue.id,
        jobDescription: eachValue.job_description,
        location: eachValue.location,
        rating: eachValue.rating,
        title: eachValue.title,
      }))
      const jobItem = {jobDetails, similarJobs}
      this.setState({jobItemDetails: jobItem, status: 'success'})
    } else {
      console.log('failure')
      this.setState({status: 'failure'})
    }
  }

  rendersuccessView = jobItemDetails => {
    const {jobDetails, similarJobs} = jobItemDetails
    console.log(jobDetails)

    return (
      <>
        <Header />
        <div className="main_container">
          <div className="main_card">
            <div className="job_item">
              <div className="logo_div">
                <img
                  src={jobDetails?.companyLogoUrl}
                  alt="job details company logo"
                  style={{width: '50px'}}
                />

                <div className="title_div">
                  <h4>{jobDetails?.title}</h4>
                  <div className="rating_div">
                    <BsStarFill />
                    <p>{jobDetails?.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location_div">
                <div className="word_details">
                  <div className="location_text">
                    <MdLocationOn style={{width: '80px'}} />
                    <p style={{color: 'white'}}>{jobDetails?.location}</p>
                  </div>
                  <div className="work_text">
                    <MdWork />
                    <p style={{color: 'white'}}>{jobDetails?.employmentType}</p>
                  </div>
                </div>
                <p>{jobDetails?.packagePerAnnum}</p>
              </div>

              <hr />
              <div className="visit_div">
                <h1>Description</h1>
                <a href={jobDetails?.companyWebsiteUrl}>Visit</a>
              </div>

              <p style={{margin: '0px', fontSize: '15px'}}>
                {jobDetails?.jobDescription}
              </p>
            </div>

            <h1 style={{marginTop: '80px', marginLeft: '30px'}}>Skills</h1>
            <ul className="skills">
              {jobDetails?.skills.map(item => (
                <li className="listItem" key={item?.name}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{width: '50px'}}
                  />
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
            <div>
              <h1 style={{marginLeft: '30px'}}>Life at Company</h1>
              <div className="company_div">
                <p style={{width: '50%'}}>
                  {jobDetails?.lifeAtCompany.description}
                </p>
                <img
                  src={jobDetails?.lifeAtCompany.imageUrl}
                  alt="life at company"
                  style={{width: '300px'}}
                />
              </div>
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul className="similar_jobs_div">
            {similarJobs?.map(similar => (
              <li className="job_item" key={similar.id}>
                <div className="logo_div">
                  <img
                    src={similar.companyLogoUrl}
                    alt="similar job company logo"
                    style={{width: '50px'}}
                  />

                  <div className="title_div">
                    <h4>{similar.title}</h4>
                    <div className="rating_div">
                      <BsStarFill />
                      <p>{similar.rating}</p>
                    </div>
                  </div>
                </div>

                <hr />

                <h1>Description</h1>

                <p style={{margin: '0px', fontSize: '15px'}}>
                  {similar?.jobDescription}
                </p>
                <hr />
                <div className="location_div">
                  <div className="word_details">
                    <div className="location_text">
                      <MdLocationOn style={{width: '80px'}} />
                      <p style={{color: 'white'}}>{similar.location}</p>
                    </div>
                    <div className="work_text">
                      <MdWork />
                      <p style={{color: 'white'}}>{similar.employmentType}</p>
                    </div>
                  </div>
                  <p>{similar.packagePerAnnum}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => {
    const {jobItemDetails, status} = this.state
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="white" height="50" width="50" />
      </div>
    )
  }

  returnPage = () => {
    this.setState({status: 'initial'}, this.getSingleJob)
  }

  renderFailureView = () => {
    const {jobItemDetails, status} = this.state
    return (
      <div className="failure-container" data-testid="loader">
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

  renderView = () => {
    const {jobItemDetails, status} = this.state
    switch (status) {
      case 'success':
        return this.rendersuccessView(jobItemDetails)
      case 'Loading':
        return this.renderLoadingView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {jobItemDetails} = this.state
    console.log(jobItemDetails.jobDetails?.description)

    return this.renderView()
  }
}
export default JobsDetails
