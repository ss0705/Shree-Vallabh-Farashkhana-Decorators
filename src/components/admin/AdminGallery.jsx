import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import Snackbar from '../Snackbar'
import useSnackbar from '../../hooks/useSnackbar'

const categories = ['Mehendi', 'Haldi', 'Mandap', 'Gate Entry', 'Lighting', 'Furniture', 'Full Event']

function AdminGallery({ gallery, setGallery }) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const { closeSnackbar, showSnackbar, snackbar } = useSnackbar()

  const getCloudinaryConfig = () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset || cloudName.includes('your_') || uploadPreset.includes('your_')) {
      throw new Error('Cloudinary .env is missing. Add cloud name and unsigned upload preset, then restart dev server.')
    }

    return { cloudName, uploadPreset }
  }

  const openFilePicker = () => {
    try {
      getCloudinaryConfig()
    } catch (error) {
      setUploadStatus(error.message)
      showSnackbar(error.message, 'error')
      return
    }

    setUploadStatus('Choose an image from your device.')
    fileInputRef.current?.click()
  }

  const uploadFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const folder = import.meta.env.VITE_CLOUDINARY_FOLDER || 'shree-vallabh-gallery'

    try {
      const { cloudName, uploadPreset } = getCloudinaryConfig()
      const payload = new FormData()
      payload.append('file', file)
      payload.append('upload_preset', uploadPreset)
      payload.append('folder', folder)

      setUploading(true)
      setUploadStatus(`Uploading ${file.name} to Cloudinary...`)
      showSnackbar('Uploading image to Cloudinary...', 'info')
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: payload,
      })
      const result = await response.json()

      if (!response.ok || !result.secure_url) {
        throw new Error(result.error?.message || 'Cloudinary upload failed')
      }

      setGallery((items) => [
        ...items,
        {
          id: Date.now(),
          category: 'Mandap',
          title: result.original_filename || file.name.replace(/\.[^.]+$/, ''),
          url: result.secure_url,
          public_id: result.public_id,
          alt_en: 'Uploaded event decoration image',
          alt_gu: 'Uploaded event decoration image',
        },
      ])
      setUploadStatus(`Uploaded ${file.name}. Cloudinary public ID: ${result.public_id}`)
      showSnackbar('Image uploaded to Cloudinary and added to website gallery.', 'success')
    } catch (error) {
      const message = error.message || 'Upload failed. Check Cloudinary unsigned preset.'
      setUploadStatus(message)
      showSnackbar(message, 'error')
    } finally {
      setUploading(false)
    }
  }

  const moveImage = (index, direction) => {
    setGallery((items) => {
      const next = [...items]
      const target = index + direction
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
    showSnackbar('Gallery order updated.', 'success')
  }

  const updateImage = (id, patch) => {
    setGallery((items) => items.map((image) => (image.id === id ? { ...image, ...patch } : image)))
    showSnackbar('Gallery details saved.', 'success')
  }

  return (
    <section className="admin-panel">
      <div className="admin-heading">
        <h2>Gallery Manager</h2>
        <button className="ghost-btn dark" type="button" onClick={openFilePicker} disabled={uploading}>
          {uploading ? <Loader2 className="spin-icon" size={18} /> : <Plus size={18} />}
          Upload Photo
        </button>
        <input ref={fileInputRef} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadFile} />
      </div>
      <p className="admin-note">Upload selects an image from your device and stores it in Cloudinary using your unsigned upload preset.</p>
      {uploadStatus && <p className="admin-note" role="status">{uploadStatus}</p>}
      <div className="admin-gallery">
        {gallery.map((item, index) => (
          <article key={item.id}>
            <img src={item.url} alt={item.alt_en} />
            <input value={item.title} onChange={(event) => updateImage(item.id, { title: event.target.value })} />
            <select value={item.category} onChange={(event) => updateImage(item.id, { category: event.target.value })}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <div className="row-actions">
              <button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0}><ArrowUp /></button>
              <button type="button" onClick={() => moveImage(index, 1)} disabled={index === gallery.length - 1}><ArrowDown /></button>
              <button type="button" onClick={() => {
                setGallery((items) => items.filter((image) => image.id !== item.id))
                showSnackbar('Image removed from website gallery.', 'success')
              }}><Trash2 /></button>
            </div>
          </article>
        ))}
      </div>
      <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
    </section>
  )
}

export default AdminGallery
