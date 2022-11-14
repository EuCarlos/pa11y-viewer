import '../../styles/report_card.sass'
import { typesCodeMessage } from '../../utils/messages'

type ReportProps = {
    code: string;
    type: string;
    typeCode: number;
    message: string;
    context: string;
    selector: string;
}

export function Report({ code, type, typeCode, message, context, selector }: ReportProps) {
    return (
        <article className={`report report--${type}`}>
            <p className={'code'}>{code} - <strong>{typesCodeMessage[typeCode]}</strong></p>
            <p>{message}</p>
            <p className={'context'}><code>{context}</code></p>
            <p><strong>selector:</strong> {selector}</p>
        </article>
    )
}
