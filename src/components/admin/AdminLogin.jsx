// src/components/admin/AdminLogin.jsx
import { Lock, Eye, EyeOff, Shield } from 'lucide-react'
import { useState } from 'react'

function AdminLogin({ error, password, setPassword, onSubmit, isLoading = false }) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password.trim()) {
      return
    }
    onSubmit(e)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 px-4">
      <div className="w-full max-w-md">
        {/* Animated Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
          {/* Icon Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Shield size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-amber-900 mt-4">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2 text-sm">Enter credentials to access control panel</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <input
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none bg-gray-50 group-hover:bg-white"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-red-500" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Login to Dashboard
                </>
              )}
            </button>

            {/* Demo Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <p className="text-xs text-amber-800 font-medium mb-1">🔐 Demo Access</p>
                <p className="text-xs text-gray-600">
                  Default Password: <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-amber-700">admin123</code>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Set <code className="bg-gray-100 px-1 rounded">VITE_ADMIN_PASSWORD</code> in .env for production
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2024 Farashkhana & Decoration. All rights reserved.
          </p>
        </div>
      </div>

      {/* Add animation keyframes to your global CSS */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default AdminLogin