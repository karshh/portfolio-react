import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Home, News } from './pages'
import { NavBar } from './components/NavBar'

const Dashboard = (): JSX.Element => (
  <>
    <NavBar />
    <Outlet />
  </>
)

const App = (): JSX.Element => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/sait" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)

export default App
