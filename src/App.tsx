import json from './reports/report.json'
import { Report } from './components/Report'
import { UID } from './utils/uid'
import './styles/globals.sass'

function App() {
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
      {reports}
    </div>
  )
}

export default App
