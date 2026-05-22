import AdminGallery from './AdminGallery'
import AdminInfo from './AdminInfo'
import Snackbar from '../Snackbar'
import useSnackbar from '../../hooks/useSnackbar'

function AdminDashboard({ info, setInfo, gallery, setGallery, onSave }) {
  const { closeSnackbar, showSnackbar, snackbar } = useSnackbar()
  const save = () => {
    onSave()
    showSnackbar('Admin changes saved and website updated.', 'success')
  }

  return (
    <main className="admin-shell">
      <section className="admin-panel">
        <div className="admin-heading">
          <h1>Admin Dashboard</h1>
          <button className="primary-btn" type="button" onClick={save}>Save Now</button>
        </div>
        <p className="admin-note">Changes auto-save and update the public website in this browser.</p>
      </section>
      <AdminInfo info={info} setInfo={setInfo} />
      <AdminGallery gallery={gallery} setGallery={setGallery} />
      <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
    </main>
  )
}

export default AdminDashboard
