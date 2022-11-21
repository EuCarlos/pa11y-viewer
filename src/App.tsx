import axios from 'axios'
import { useEffect, useState } from 'react'

// Components
import { Report } from './components/Report'
import { Header } from './components/Header'
import { DragAndDropContainer } from './components/DragAndDropContainer'

// Utils
import { UID } from './utils/uid'
import { trucateString } from './utils/trucate_string'
import { setSearchHistory, getSearchHistory, removeSearchHistory } from './utils/search_history'

// Styles
import './styles/globals.sass'
import './styles/search_reports.sass'

function App() {
  const { protocol, href, host } = location
  const getURL = new URL(href)
  const initialURL = 
        new URLSearchParams(getURL.search).get('url') 
        || `${protocol}//${host}/reports/report.json`

  const [url, setUrl] = useState(initialURL)
  const [jsonReports, setJSONReports] = useState([])
  const [searchHistory, setNewSearchHistory] = useState(getSearchHistory())
  const [isDragged, setIsDragged] = useState(false)
  
  // CSS focus
  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setTimeout(() => setFocused(false), 200)

  const handleSearchHistory = (id: string) => {
    removeSearchHistory(id)
    setNewSearchHistory(getSearchHistory())
  }
  
  const handle = (url:string) => {
    axios
      .get(url)
        .then(res => setJSONReports(res.data))
        .catch(err => setJSONReports([])) 

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
    <div 
      className="App" 
      onDragOver={() => setIsDragged(true)} 
      onDragLeave={() => setIsDragged(false)}
    >
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
              const link = `${protocol}//${host}/?url=${item.value}`
              return <li>
                  <a href={link}>{trucateString(item.value, 45)}</a>
                  <button onClick={() => handleSearchHistory(item.id)}>X</button>
                </li>
            })}
          </ul>
        </div>
      </div>
      <h2>📝 {numberOfReports} Accessibility issues</h2>
      {
        numberOfReports <= 0 
          ? <div className={'report--not-found'}>No reports found</div>
          : reports
      }

      <footer>Created by <a href="http://carlosalves.now.sh/" target={'_blank'}>Carlos Alves</a></footer>
      
      {
        isDragged 
          ? <DragAndDropContainer setJSONReports={setJSONReports} setIsDragged={setIsDragged} /> 
          : null
      }
    </div>
  )
}

export default App
