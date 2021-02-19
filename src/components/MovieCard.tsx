import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core'
import { Delete, ThumbUpAlt, ThumbDownAlt } from '@material-ui/icons'
import { getMovieById, movieDisliked, movieLiked, movieDeleted } from '../store/moviesReducer'
import { MovieData } from '../interfaces/MovieData'

const useStyles = makeStyles(theme => ({
    main: {
        position: 'relative',
        marginBottom: 40,
        width: 300,
        height: 165,
        padding: 20,
        borderRadius: 5,
        boxShadow: '0px 1.5px 3.5px 0px rgba(0,0,0,0.6)',
        backgroundColor: 'white',
        transition: 'transform .35s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    title: {
        margin: 0,
        marginBottom: 5,
        fontSize: 25,
    },
    category: {
        marginBottom: 40
    },
    gaugeContainer: {
        width: '100%',
        display: 'flex',
        marginBottom: 20
    },
    gauge: {
        height: 20
    },
    icon: {
        fontSize: 30,
        cursor: 'pointer'
    },
    deleteIcon: {
        position: 'absolute',
        left: '87.5%',
        top: 20,
    }
}))

export default function MovieCard(props: {
    id: string
}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const movie: MovieData = useSelector(getMovieById(props.id))
    const likesPourcentage = (movie.likes / (movie.likes + movie.dislikes)) * 100
    const dislikesPourcentage = 100 - likesPourcentage
    const thumbUpBackgroundColor = movie.userLike === 'like' ? '#4caf50' : 'black'
    const thumbDownBackgroundColor = movie.userLike === 'dislike' ? '#d50000' : 'black'

    return (
        <div className={classes.main}>
            <Delete
                className={`${classes.icon} ${classes.deleteIcon}`}
                onClick={() => dispatch(movieDeleted({ id: movie.id }))}
            />
            <h2 className={classes.title}>{movie.title}</h2>
            <div className={classes.category}>{movie.category}</div>
            <div className={classes.gaugeContainer}>
                <div
                    className={classes.gauge}
                    style={{ backgroundColor: '#4caf50', width: `${likesPourcentage}%` }}
                ></div>
                <div
                    className={classes.gauge}
                    style={{ backgroundColor: '#d50000', width: `${dislikesPourcentage}%` }}
                ></div>
            </div>
            <ThumbUpAlt
                onClick={() => dispatch(movieLiked({ id: movie.id }))}
                className={classes.icon}
                style={{ marginRight: 20, color: thumbUpBackgroundColor }}
            />
            <ThumbDownAlt
                onClick={() => dispatch(movieDisliked({ id: movie.id }))}
                className={classes.icon}
                style={{ color: thumbDownBackgroundColor }}
            />
        </div>
    )
}
