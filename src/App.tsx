import json from './reports/report.json'
import { Report } from './components/Report'
import { UID } from './utils/uid'
import './styles/globals.sass'

function App() {
  const numberOfReports = json.length

  const reports = json.map(({ code, type, typeCode, message, context, selector }) => {
    return <div>
      <Report 
        key={UID()}
        code={code}
        type={type}
        typeCode={typeCode}
        message={message}
        context={context}
        selector={selector}
      />
    </div>    
  })

  return (
    <div className="App">
      <h2>📝 {numberOfReports} Reports</h2>
      {numberOfReports <= 0 ? <div className={'report--not-found'}>No reports found</div>: reports}

      <footer>Created by <a href="https://github.com/EuCarlos/pa11y-viewer">Carlos Alves</a></footer>
    </div>
  )
}

export default App
