import React from 'react'
import { Provider } from "react-redux"
import configureStore from './store/configureStore'
import { makeStyles } from '@material-ui/core'
import MoviesList from './components/MoviesList'
import CategoryFilterMenu from './components/CategoryFilterMenu'
import Pagination from './components/Pagination'
import PaginationForm from './components/PaginationForm'

const store = configureStore()
const useStyles = makeStyles(theme => ({
  main: {
    padding: '30px 0',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  formContainer: {
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

function App() {
  const classes = useStyles()

  return (
    <Provider store={store}>
      <main className={classes.main}>
        <div className={classes.formContainer}>
          <CategoryFilterMenu />
          <PaginationForm />
        </div>
        <MoviesList />
        <Pagination />
      </main>
    </Provider>
  )
}

export default App