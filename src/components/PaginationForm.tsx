import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getMoviePerPage, moviePerPageUpdated } from '../store/moviesReducer'

export default function PaginationForm() {
    const moviePerPage = useSelector(getMoviePerPage)
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        dispatch(moviePerPageUpdated(parseInt(event.target.value)))
    }

    return (
        <div>
            <label style={{ marginRight: 10 }}>Movies per page</label>
            <select onChange={(event) => handleSubmit(event)}>
                <option selected={moviePerPage === 4} value={4}>4</option>
                <option selected={moviePerPage === 8} value={8}>8</option>
                <option selected={moviePerPage === 16} value={16}>16</option>
            </select>
        </div>

    )
}
