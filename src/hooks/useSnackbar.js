import { useEffect, useState } from 'react'

function useSnackbar(timeout = 3600) {
  const [snackbar, setSnackbar] = useState({ message: '', type: 'success' })

  useEffect(() => {
    if (!snackbar.message) return undefined
    const timer = window.setTimeout(() => setSnackbar({ message: '', type: snackbar.type }), timeout)
    return () => window.clearTimeout(timer)
  }, [snackbar, timeout])

  const showSnackbar = (message, type = 'success') => setSnackbar({ message, type })
  const closeSnackbar = () => setSnackbar((current) => ({ ...current, message: '' }))

  return { closeSnackbar, showSnackbar, snackbar }
}

export default useSnackbar
