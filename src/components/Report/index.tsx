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
        <article className={`report--${type}`}>
            <p className={'code'}>{code} - <strong>{typesCodeMessage[typeCode]}</strong></p>
            <p className={'message'}>{message}</p>
            <p className={'context'}><code>{context}</code></p>
            <p className={'selector'}><strong>selector:</strong> {selector}</p>
        </article>
    )
}
