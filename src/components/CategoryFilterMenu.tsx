import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch, useSelector } from "react-redux"
import { getMovies, movieCategoriesSelected } from '../store/moviesReducer'
import { removeOccurencesInList } from '../utilitaryFunctions/removeOccurencesInList'

const useStyles = makeStyles(theme => ({
    main: {
        marginRight: 30,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        cursor: 'pointer',
        marginRight: 10,
    },
    menu: {
        width: 150,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    form: {
        position: 'absolute',
        zIndex: 100,
        top: 50,
        width: 300,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: 'white',
        boxShadow: '0px 1.5px 3.5px 0px rgba(0,0,0,0.6)',
    },
    categoriesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 20
    },
    category: {
        cursor: 'pointer',
        marginRight: 15,
        marginBottom: 15
    },
    selectedCategory: {
        color: '#4caf50',
        fontWeight: 500
    },
    cancelButton: {
        marginRight: 10,
        border: 'none',
        backgroundColor: 'white',
        cursor: 'pointer',
    },
    submitButton: {
        border: '1.5px solid black',
        padding: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        cursor: 'pointer'
    }
}))

export default function ThemeFilter() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const movies = useSelector(getMovies)
    const categoryList = movies.map(movie => movie.category)
    const filteredCategoryList = removeOccurencesInList(categoryList)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])

    const displaySelectedCategories = () => {
        let textToDisplay = ''
        switch (selectedCategories.length) {
            case 0:
                textToDisplay = 'No filter'
                break
            case 1:
                textToDisplay = `${selectedCategories[0]}`
                break
            case 2:
                textToDisplay = `${selectedCategories[0]}, ${selectedCategories[1]}`
                break
            default:
                textToDisplay = `${selectedCategories[0]}, ${selectedCategories[1]} and ${selectedCategories.length - 2} more`
                break
        }
        return textToDisplay
    }

    const selectNewCategory = category => {
        if (selectedCategories.includes(category)) {
            const newSelectedCategories = selectedCategories.filter(selectedCategory => {
                return selectedCategory !== category
            })
            setSelectedCategories(newSelectedCategories)
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }

    const handleClear = () => {
        setSelectedCategories([])
        dispatch(movieCategoriesSelected([]))
    }

    const handleSubmit = () => {
        dispatch(movieCategoriesSelected(selectedCategories))
        setIsFormOpen(false)
    }


    return (
        <div className={classes.main}>
            <ClearIcon
                className={classes.icon}
                onClick={handleClear}
            />
            <div
                onClick={() => setIsFormOpen(true)}
                className={classes.menu}
            >
                {displaySelectedCategories()}
            </div>
            {isFormOpen ? <div className={classes.form}>
                <div className={classes.categoriesContainer}>
                    {filteredCategoryList.map(category => {
                        return (
                            <div
                                onClick={() => selectNewCategory(category)}
                                className={`${classes.category} ${selectedCategories.includes(category) ? classes.selectedCategory : ''}`}>
                                {category}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <button
                        className={classes.cancelButton}
                        onClick={() => setIsFormOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={classes.submitButton}
                        onClick={handleSubmit}
                    >
                        Submit
                        </button>
                </div>
            </div> : ''}
        </div>
    )
}
