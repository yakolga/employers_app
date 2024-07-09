import './app-info.css';

const AppInfo = ({employers, increase}) => {
  return (
    <div className="app-info">
      <h1>Employee accounting in the company</h1>
      <h2>Total number of employees: {employers}</h2>
      <h2>The prize will be received: {increase}</h2>
    </div>
  )
}

export default AppInfo;