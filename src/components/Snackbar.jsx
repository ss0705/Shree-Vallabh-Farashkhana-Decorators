import { AnimatePresence, motion } from 'framer-motion'

function Snackbar({ message, type = 'success', onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`snackbar ${type}`}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          role="status"
        >
          <span>{message}</span>
          <button type="button" onClick={onClose} aria-label="Close notification">Close</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Snackbar
