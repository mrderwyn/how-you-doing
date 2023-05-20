import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './components/Menu/Menu'
import FeedPage from './pages/FeedPage'
import ProfilePage from './pages/ProfilePage'
import PeoplesPage from './pages/PeoplesPage'
import PostPage from './pages/PostPage'

import './App.css'

import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import { selfSelector } from './redux/selectors'
import EditProfile from './components/EditProfile/EditProfile'
import NotificationsPage from './pages/NotificationsPage'
import { logOut } from './redux/slices/selfSlice/slice'
import { logIn } from './redux/actions/selfActions'
import { loadFollows } from './redux/actions/followActions'

import cn from 'classnames'
import Button from './components/Button/Button'
import NotFound from './components/NotFound/NotFound'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth()
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user == null) {
        dispatch(logOut({}))
        return
      }

      dispatch(logIn(user.email, user.uid) as any)
    })

    return subscribe
  }, [])

  const user = useSelector(selfSelector)
  dispatch(loadFollows() as any)

  const [menuShown, setMenuShown] = useState(false)
  const menuShownRef = useRef(menuShown)
  menuShownRef.current = menuShown
  const toggleMenuShown = useCallback(() => {
    setMenuShown(!menuShownRef.current)
  }, [])

  const authRoutes = <>
    <Route path='/' element={<FeedPage />} />
    <Route path='edit' element={<EditProfile />} />
    <Route path='profile/:id' element={<ProfilePage />} />
    <Route path='peoples/:id' element={<PeoplesPage />} />
    <Route path='post/:id' element={<PostPage />} />
    <Route path='/notifications' element={<NotificationsPage />} />
    <Route path='*' element={<NotFound text="We can't find that page" />} />
  </>

  const unauthRoutes = <>
    <Route path='/' element={<Login />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
  </>

  if (user === null) {
    return (
      <Router>
        <div className='App'>
          <div className='Container'>
                <Routes>
                  {unauthRoutes}
                </Routes>
          </div>
        </div>
      </Router>
    )
  }

  return (
    <Router>
      <div className='App'>

      <div className={cn({ Container: true, 'Container-toggled': menuShown })}>
        <Button className='MenuToggleButton' icon='hamburger' action={toggleMenuShown} />
          <div className='MenuContainer'>
            <Menu />
          </div>
          <div className='MainContainer'>
            <Routes>
              {authRoutes}
            </Routes>
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
