import axios from 'axios'
import { useEffect, useState } from 'react'

import { Report } from './components/Report'
import { UID } from './utils/uid'

import './styles/globals.sass'
import './styles/search_reports.sass'
import { setSearchHistory, getSearchHistory, removeSearchHistory } from './utils/search_history'

function App() {
  const getURL = new URL(location.href)
  const initialURL = new URLSearchParams(getURL.search).get('url') || `http://${window.location.host}/reports/report.json`

  const [url, setUrl] = useState(initialURL)
  const [jsonReports, setJsonReports] = useState([])
  const [searchHistory, setNewSearchHistory] = useState(getSearchHistory())

  const handleSearchHistory = (id: string) => {
    removeSearchHistory(id)

    //const result = searchHistory.filter(item => item.id !== id)
    setNewSearchHistory(getSearchHistory())
  }
  
  const handle = (url:string) => {
    axios.get(url)
        .then(res => setJsonReports(res.data))
        .catch(err => setJsonReports([])) 

    setSearchHistory(url)
    setNewSearchHistory(getSearchHistory())
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

        <button onClick={() => handle(url)}>Search</button><br/>
        <div className={'search_history'}>
          <ul>
            {searchHistory.map(item => {
              const link = `http://${window.location.host}/${item.value}`
              return <li><a href={link}>{item.value}</a> <button onClick={() => handleSearchHistory(item.id)}>X</button></li>
            })}
          </ul>
        </div>
      </div>
      <h2>📝 {numberOfReports} Reports</h2>
      {numberOfReports <= 0 ? <div className={'report--not-found'}>No reports found</div>: reports}

      <footer>Created by <a href="https://github.com/EuCarlos/pa11y-viewer">Carlos Alves</a></footer>
    </div>
  )
}

export default App
