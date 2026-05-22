import { useEffect, useMemo, useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminLogin from '../components/admin/AdminLogin'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { readSiteData, saveSiteData } from '../hooks/useSiteData'

function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('sv_admin') === 'true')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [info, setInfo] = useState(() => readSiteData().content)
  const [gallery, setGallery] = useState(() => readSiteData().gallery)
  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  const saved = useMemo(() => ({ info, gallery }), [info, gallery])

  const login = (event) => {
    event.preventDefault()
    if (password.trim() === correctPassword) {
      localStorage.setItem('sv_admin', 'true')
      setLoginError('')
      setLoggedIn(true)
    } else {
      setLoginError('Wrong password. Use admin123 unless you changed VITE_ADMIN_PASSWORD.')
    }
  }

  const persist = () => {
    saveSiteData({ content: saved.info, gallery: saved.gallery })
  }

  useEffect(() => {
    if (!loggedIn) return undefined
    const timer = window.setTimeout(() => {
      saveSiteData({ content: info, gallery })
    }, 250)
    return () => window.clearTimeout(timer)
  }, [gallery, info, loggedIn])

  return (
    <>
      <Navbar />
      {loggedIn ? (
        <>
          <AdminDashboard info={info} setInfo={setInfo} gallery={gallery} setGallery={setGallery} onSave={persist} />
          <Footer />
        </>
      ) : (
        <AdminLogin error={loginError} password={password} setPassword={setPassword} onSubmit={login} />
      )}
    </>
  )
}

export default Admin
