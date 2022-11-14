import { Report } from './components/Report'
import json from './reports/report.json'

function App() {
  const reports = json.map(({ code, type, typeCode, message, context, selector }) => {
    return <div>
      {/* {report.message} */}
      <Report 
        code={code}
        type={type}
        typeCode={typeCode}
        message={message}
        context={context}
        selector={selector}
      />
      <hr/>
    </div>
  })

  return (
    <div className="App">
      {reports}
    </div>
  )
}

export default App
