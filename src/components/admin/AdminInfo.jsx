// src/components/admin/AdminInfo.jsx
import { useState } from 'react'
import { Upload, Save, X, Image as ImageIcon, Trash2, RefreshCw } from 'lucide-react'

function AdminInfo({ info, setInfo, onSave, showMessage }) {
  const [loading, setLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState(info.logoUrl || '')

  // Handle logo upload to Cloudinary
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showMessage?.('Please upload an image file', 'error')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showMessage?.('Image size should be less than 2MB', 'error')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await response.json()
      
      setInfo({ 
        ...info, 
        logoUrl: data.secure_url,
        logoAlt: file.name 
      })
      setLogoPreview(data.secure_url)
      showMessage?.('Logo uploaded successfully!', 'success')
    } catch (error) {
      console.error('Upload error:', error)
      showMessage?.('Error uploading logo. Check Cloudinary credentials.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Handle logo removal
  const handleRemoveLogo = () => {
    setInfo({ 
      ...info, 
      logoUrl: '',
      logoAlt: '' 
    })
    setLogoPreview('')
    showMessage?.('Logo removed. Text logo will be shown.', 'info')
  }

  // Handle form field changes
  const handleChange = (field, value) => {
    setInfo({ ...info, [field]: value })
  }

  // Handle nested about fields
  const handleAboutChange = (lang, value) => {
    setInfo({
      ...info,
      about: {
        ...info.about,
        [lang]: value
      }
    })
  }

  // Handle stats update
  const handleStatChange = (index, field, value) => {
    const updatedStats = [...info.stats]
    updatedStats[index][field] = value
    setInfo({ ...info, stats: updatedStats })
  }

  const addStat = () => {
    const updatedStats = [...info.stats, { value: '', label: '' }]
    setInfo({ ...info, stats: updatedStats })
  }

  const removeStat = (index) => {
    const updatedStats = info.stats.filter((_, i) => i !== index)
    setInfo({ ...info, stats: updatedStats })
  }

  return (
    <section className="space-y-6">
      {/* Logo Management Section */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
          <ImageIcon size={20} className="text-amber-600" />
          Logo Management
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Logo Preview */}
          <div className="flex-shrink-0">
            {logoPreview ? (
              <div className="relative group">
                <img 
                  src={logoPreview} 
                  alt="Current Logo"
                  className="h-24 w-auto object-contain border-2 border-amber-200 rounded-lg p-2 bg-white shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div className="h-24 w-32 border-2 border-dashed border-amber-300 rounded-lg flex items-center justify-center bg-amber-50">
                <ImageIcon size={32} className="text-amber-400" />
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex-1">
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition cursor-pointer">
              <Upload size={18} />
              {loading ? 'Uploading...' : 'Upload New Logo'}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={loading}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Recommended: PNG with transparent background, max 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name (English)</label>
            <input
              type="text"
              value={info.businessName || ''}
              onChange={(e) => handleChange('businessName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter business name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name (Gujarati)</label>
            <input
              type="text"
              value={info.businessNameGu || ''}
              onChange={(e) => handleChange('businessNameGu', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="ગુજરાતી માં નામ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
            <input
              type="text"
              value={info.ownerName || ''}
              onChange={(e) => handleChange('ownerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter owner name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              value={info.mobile || ''}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={info.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="info@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Link</label>
            <input
              type="url"
              value={info.whatsapp || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="https://wa.me/91xxxxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={info.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Full address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
            <input
              type="text"
              value={info.hours || ''}
              onChange={(e) => handleChange('hours', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="9 AM - 9 PM"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Hero Section</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline (English)</label>
            <input
              type="text"
              value={info.hero?.headlineEn || ''}
              onChange={(e) => setInfo({ 
                ...info, 
                hero: { ...info.hero, headlineEn: e.target.value } 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="Hero headline in English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline (Gujarati)</label>
            <input
              type="text"
              value={info.hero?.headlineGu || ''}
              onChange={(e) => setInfo({ 
                ...info, 
                hero: { ...info.hero, headlineGu: e.target.value } 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="ગુજરાતી માં હેડલાઇન"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={info.hero?.subline || ''}
              onChange={(e) => setInfo({ 
                ...info, 
                hero: { ...info.hero, subline: e.target.value } 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="Short description"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">About Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About (English)</label>
            <textarea
              value={info.about?.en || ''}
              onChange={(e) => handleAboutChange('en', e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="Describe your business in English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About (Gujarati)</label>
            <textarea
              value={info.about?.gu || ''}
              onChange={(e) => handleAboutChange('gu', e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="ગુજરાતી માં વર્ણન"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Statistics</h3>
        <div className="space-y-3">
          {info.stats?.map((stat, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                placeholder="Value (e.g., 500+)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                placeholder="Label (e.g., Events Done)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => removeStat(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addStat}
            className="w-full py-2 border-2 border-dashed border-amber-300 rounded-lg text-amber-600 hover:bg-amber-50 transition"
          >
            + Add Statistic
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => onSave?.(info)}
          className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-sm"
        >
          <Save size={18} />
          Save All Changes
        </button>
      </div>
    </section>
  )
}

export default AdminInfo