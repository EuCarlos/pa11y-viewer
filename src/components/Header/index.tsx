import { useState } from 'react'
import '../../styles/menu.sass'

export function Header() {
    const [toggle, setToggle] = useState(false)
    
    const handleToggle = () => setToggle(!toggle)

    return (
        <header>
            <nav className="navbar">
                <a href="/" className="nav-logo">
                    <img 
                        src={`http://${location.host}/assets/Pa11y-Viewer-Logo.svg`} 
                        alt="Logo Pa11y Viewer"
                        width={50}
                    />
                </a>
                <ul className={`nav-menu ${toggle ? 'active' : ''}`}>
                    <li className="nav-item">
                        <a
                            href="https://github.com/EuCarlos/pa11y-viewer"
                            target={'_blank'} 
                            className="nav-link">💻 Contribute
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="https://github.com/EuCarlos/pa11y-viewer/wiki/Pa11y-Viewer:-How-to-Use"
                            target={'_blank'} 
                            className="nav-link">📚 How to use
                        </a>
                    </li>
                </ul>
                <div className={`hamburger ${toggle ? 'active' : ''}`} onClick={() => handleToggle()}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    )
}
