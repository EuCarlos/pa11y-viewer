import { highlight, languages } from 'prismjs'

import '../../styles/report_card.sass'
import '../../../node_modules/prismjs/themes/prism-coy.min.css'

type Report = {
    code: string;
    type: 'error' | 'warning' | 'notice' | 'none';
    typeCode: 0 | 1 | 2;
    message: string;
    context: string;
    selector: string;
}

export function Report({ code, type, typeCode, message, context, selector }: Report) {
    const shouldGetTypeCodeMessage = [
        "Pa11y ran successfully, and there are no errors",
        "Pa11y failed run due to a technical fault",
        "Pa11y ran successfully but there are errors in the page"
    ]

    const styledContext = highlight(context, languages.html, 'html')

    return (
        <article className={`report report--${type}`}>
            <p className='code'>{code} - <strong>{shouldGetTypeCodeMessage[typeCode]}</strong></p>
            <p>{message}</p>
            <p className='context'><code dangerouslySetInnerHTML={{ __html: styledContext }}></code></p>
            <p><strong>selector:</strong> {selector}</p>
        </article>
    )
}
