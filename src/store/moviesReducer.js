import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"
import { movies$ } from '../data/movies'


const slice = createSlice({
    name: "movies",
    initialState: {
        list: [],
        selectedMovieCategories: [],
        loading: 'idle',
        moviePerPage: 16,
        actualPage: 1
    },
    reducers: {
        movieAdded: (movies, action) => {
            movies.list.push(action.payload)
        },
        movieDeleted: (movies, action) => {
            const { id: movieId } = action.payload
            const wordIndex = movies.list.findIndex(movies => movies.id === movieId)
            movies.list.splice(wordIndex, 1)
        },
        moviesLoading(movies, action) {
            if (movies.loading === 'idle') {
                movies.loading = 'pending'
            }
        },
        moviesReceived(movies, action) {
            if (movies.loading === 'pending') {
                movies.loading = 'idle'
                const moviesList = action.payload.map(movie => {
                    const newMovie = { ...movie, userLike: 'none' }
                    return newMovie
                })
                movies.list = moviesList
            }
        },
        movieLiked(movies, action) {
            const { id: movieId } = action.payload
            const movieIndex = movies.list.findIndex(movie => movie.id === movieId)
            console.log(movies.list)

            if (movies.list[movieIndex].userLike === 'like') {
                movies.list[movieIndex].likes -= 1
                movies.list[movieIndex].userLike = 'none'
            } else {
                movies.list[movieIndex].likes += 1
                movies.list[movieIndex].userLike = 'like'
            }
        },
        movieDisliked(movies, action) {
            const { id: movieId } = action.payload
            const movieIndex = movies.list.findIndex(movie => movie.id === movieId)
            console.log(movies.list)

            if (movies.list[movieIndex].userLike === 'dislike') {
                movies.list[movieIndex].dislikes -= 1
                movies.list[movieIndex].userLike = 'none'
            } else {
                movies.list[movieIndex].dislikes += 1
                movies.list[movieIndex].userLike = 'dislike'
            }
        },
        movieCategoriesSelected(movies, action) {
            movies.selectedMovieCategories = action.payload
        },
        moviePerPageUpdated(movies, action) {
            movies.moviePerPage = action.payload
        },
        actualPageUpdated(movies, action) {
            movies.actualPage = action.payload
        },
        actualPageIncremented(movies) {
            movies.actualPage += 1
        },
        actualPageDecremented(movies) {
            movies.actualPage -= 1
        },
    }
})

export const {
    movieAdded,
    movieDeleted,
    moviesLoading,
    moviesReceived,
    movieLiked,
    movieDisliked,
    movieCategoriesSelected,
    moviePerPageUpdated,
    actualPageUpdated,
    actualPageIncremented,
    actualPageDecremented
} = slice.actions
export default slice.reducer

export const fetchMovies = () => async dispatch => {
    dispatch(moviesLoading())
    const response = await movies$
    dispatch(moviesReceived(response))
}

export const getMovies = createSelector(
    state => state.movies,
    movies => movies.list
)
export const getMoviesListByCategory = createSelector(
    state => state.movies,
    movies => {
        const listWithoutPagination = movies.list.filter(movie => movies.selectedMovieCategories.includes(movie.category) || movies.selectedMovieCategories.length === 0)
        const indexToStart = movies.actualPage === 1 ? 0 : ((movies.actualPage - 1) * movies.moviePerPage) - 1
        const indexToEnd = indexToStart + movies.moviePerPage
        const listWithPagination = listWithoutPagination.slice(indexToStart, indexToEnd)

        return listWithPagination
    }
)
export const getMovieById = id =>
    createSelector(
        state => state.movies,
        movies => movies.list.find(movie => movie.id === id)
    )
export const getMovieListLength = createSelector(
    state => state.movies,
    movies => movies.list.length
)
export const getMoviePerPage = createSelector(
    state => state.movies,
    movies => movies.moviePerPage
)
export const getActualPage = createSelector(
    state => state.movies,
    movies => movies.actualPage
)