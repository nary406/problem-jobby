import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const jnfv = 'f'
  return (
    <div>
      <hr />
      <h3>Type of Employment</h3>
      <ul>
        {employmentTypesList.map(item => {
          const {employmentType} = props
          const onChangeCheckBox = event => {
            employmentType(event.target.value, event.target.checked)
          }
          return (
            <li key={item.employmentTypeId}>
              <input
                type="checkBox"
                id={item.employmentTypeId}
                value={item.employmentTypeId}
                onChange={onChangeCheckBox}
              />
              <label htmlFor={item.employmentTypeId}>{item.label}</label>
            </li>
          )
        })}
      </ul>

      <hr />
      <h3>Salary Range</h3>
      <ul>
        {salaryRangesList.map(item => {
          const onChangeRadio = event => {
            const {salaryRangeFunction} = props
            salaryRangeFunction(event.target.value)
          }
          return (
            <li key={item.salaryRangeId}>
              <input
                type="radio"
                id={item.salaryRangeId}
                onChange={onChangeRadio}
                value={item.salaryRangeId}
                name="salaryRangesList"
              />
              <label htmlFor={item.salaryRangeId}>{item.label}</label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default FilterGroup
