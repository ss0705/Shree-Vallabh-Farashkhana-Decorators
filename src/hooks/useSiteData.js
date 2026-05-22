import { useEffect, useState } from 'react'
import baseContent from '../data/content.json'
import baseGallery from '../data/gallery.json'

export const SITE_DATA_EVENT = 'shree-vallabh-site-data-updated'
export const CONTENT_STORAGE_KEY = 'sv_content'
export const GALLERY_STORAGE_KEY = 'sv_gallery'

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const readJson = (key, fallback) => {
  if (!canUseStorage()) return fallback

  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const readSiteData = () => ({
  content: readJson(CONTENT_STORAGE_KEY, baseContent),
  gallery: readJson(GALLERY_STORAGE_KEY, baseGallery),
})

export const saveSiteData = ({ content, gallery }) => {
  if (!canUseStorage()) return

  if (content) localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content))
  if (gallery) localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(gallery))
  window.dispatchEvent(new Event(SITE_DATA_EVENT))
}

function useSiteData() {
  const [data, setData] = useState(readSiteData)

  useEffect(() => {
    const sync = () => setData(readSiteData())
    window.addEventListener(SITE_DATA_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(SITE_DATA_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return data
}

export default useSiteData
