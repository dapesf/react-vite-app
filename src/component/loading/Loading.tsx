import './Loading.css';
import gifUrl from "../../assets/loading.gif"

export default function Loading(props: any) {
    return (
        <div className='loading-container'>
            <div className='loading-modal'>
                <div className='loading-icon'>
                    <img src={gifUrl} width="95" height="96" />
                </div>
            </div>
        </div>
    )
}