import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { Home } from './pages/home'
import { Provider } from 'react-redux'
import { store } from './features/store'

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
