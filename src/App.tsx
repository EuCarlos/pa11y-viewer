import axios from 'axios'
import { useEffect, useState } from 'react'

import { Report } from './components/Report'
import { Header } from './components/Header'

import { UID } from './utils/uid'
import { trucateString } from './utils/trucate_string'

import './styles/globals.sass'
import './styles/search_reports.sass'
import { setSearchHistory, getSearchHistory, removeSearchHistory } from './utils/search_history'
import { DropJSON } from './components/DropJSON'

function App() {
  const PROTOCOL = location.protocol

  const getURL = new URL(location.href)
  const initialURL = new URLSearchParams(getURL.search).get('url') || `${PROTOCOL}//${window.location.host}/reports/report.json`

  const [url, setUrl] = useState(initialURL)
  const [jsonReports, setJsonReports] = useState([])
  const [searchHistory, setNewSearchHistory] = useState(getSearchHistory())
  const [toggleDragNDrop, setToggleDragNDrop] = useState(false)
  
  // CSS focus
  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setTimeout(() => setFocused(false), 200)

  
  const handleSearchHistory = (id: string) => {
    removeSearchHistory(id)
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
    <div className="App" onDragOver={() => setToggleDragNDrop(true)} onDragLeave={() => setToggleDragNDrop(false)}>
      <Header />
      <div className={'forms'}>
        <input 
          type="url"
          placeholder={url}
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        <button onClick={() => handle(url)}>Search</button><br/>
        <div className={'search_history'} style={{ display: focused ? 'block' : 'none' }}>
          <ul>
            {searchHistory.map(item => {
              const link = `${PROTOCOL}//${window.location.host}/?url=${item.value}`
              return <li><a href={link}>{trucateString(item.value, 45)}</a> <button onClick={() => handleSearchHistory(item.id)}>X</button></li>
            })}
          </ul>
        </div>
      </div>
      <h2>📝 {numberOfReports} Reports</h2>
      {numberOfReports <= 0 ? <div className={'report--not-found'}>No reports found</div>: reports}

      <footer>Created by <a href="http://carlosalves.now.sh/" target={'_blank'}>Carlos Alves</a></footer>
      {toggleDragNDrop ? <DropJSON setJsonReports={setJsonReports} setToggleDragNDrop={setToggleDragNDrop} /> : ''}
    </div>
  )
}

export default App
