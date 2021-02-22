import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { getMoviePerPage, getActualPage, actualPageDecremented, actualPageUpdated, actualPageIncremented, getMovieListLength } from '../store/moviesReducer'
import { makeStyles } from '@material-ui/core'
import { createArrayOfN } from '../utilitaryFunctions/createArrayOfN'

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        justifyContent: 'center'
    },
    icon: {
        cursor: 'pointer'
    },
    paginationNumbersContainer: {
        margin: '0 15px',
        display: 'flex',
        alignItems: 'center'
    },
    paginationNumber: {
        marginRight: 10,
        cursor: 'pointer'
    },
    selectedPaginationNumber: {
        fontWeight: 500,
        textDecoration: 'underline'
    }
}))

export default function Pagination() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const movieListLength = useSelector(getMovieListLength)
    const moviePerPage = useSelector(getMoviePerPage)
    const actualPage = useSelector(getActualPage)
    const numberOfPages = Math.ceil(movieListLength / moviePerPage)
    const listOfPages = createArrayOfN(numberOfPages)

    const handlePageDecrement = () => {
        if (actualPage !== 1) {
            dispatch(actualPageDecremented())
        }
    }

    const handlePageIncrement = () => {
        if (actualPage * moviePerPage <= movieListLength) {
            dispatch(actualPageIncremented())
        }
    }

    return (
        <div className={classes.main}>
            <ArrowBackIos onClick={handlePageDecrement} className={classes.icon} />
            <div className={classes.paginationNumbersContainer}>
                {listOfPages.map((elem, index) => {
                    return (
                        <div
                            onClick={() => dispatch(actualPageUpdated(index + 1))}
                            key={index}
                            className={`${classes.paginationNumber} ${actualPage === index + 1 ? classes.selectedPaginationNumber : ''}`}
                        >
                            {index + 1}
                        </div>
                    )
                })}

            </div>
            <ArrowForwardIos onClick={handlePageIncrement} className={classes.icon} />
        </div>
    )
}
