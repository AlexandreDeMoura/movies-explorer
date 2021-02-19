import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core'
import { fetchMovies, getMoviesListByCategory } from '../store/moviesReducer'
import MovieCard from './MovieCard'

const useStyles = makeStyles(theme => ({
    main: {
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: 40,
        paddingBottom: 0
    }
}))

export default function MoviesList() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const movies = useSelector(getMoviesListByCategory)

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])
    return (
        <div className={classes.main}>
            {movies.map(movie => <MovieCard key={movie.id} id={movie.id} />)}
        </div>
    )
}
