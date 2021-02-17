// Library
import '../../pages/non-global.css'

export default function ContentHeader(props) {
    return (
        <div className="border-left border-right border-bottom w-100 p-2">
            <h1 className="cs-home-title">{props.title}</h1>
        </div>
    )
}