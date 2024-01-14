import { MdDeleteForever } from "react-icons/md";

export default function AddCode({ element }) {
    return (
        <li class="list-group-item" >
            <div className='input-group'>
                <span style={{ width: '85%', fontSize: '135%' }}>{element}</span>
                <button className='btn btn-danger small' style={{ float: 'right', borderRadius: '12%' }}><MdDeleteForever /></button>
            </div>
        </li>
    )
}