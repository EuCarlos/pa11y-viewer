import axios from 'axios'
import { useEffect, useState } from 'react'

import { Report } from './components/Report'
import { UID } from './utils/uid'

import './styles/globals.sass'
import './styles/search_reports.sass'

function App() {

  const [url, setUrl] = useState(`http://${window.location.host}/reports/report.json`)
  const [jsonReports, setJsonReports] = useState([])

  const handle = (url:string) => {
    axios.get(url)
        .then(res => setJsonReports(res.data))
        .catch(err => setJsonReports([]))
  }

  useEffect(() => {
    handle(url)
  }, [])
  
  const numberOfReports = jsonReports.length

  const reports = jsonReports.map(({ code, type, typeCode, message, context, selector }) => {
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
      <div className={'forms'}>
        <input 
          type="url"
          placeholder={url}
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />

        <button onClick={() => handle(url)}>Pesquisar</button>
      </div>
      <h2>📝 {numberOfReports} Reports</h2>
      {numberOfReports <= 0 ? <div className={'report--not-found'}>No reports found</div>: reports}

      <footer>Created by <a href="https://github.com/EuCarlos/pa11y-viewer">Carlos Alves</a></footer>
    </div>
  )
}

export default App
