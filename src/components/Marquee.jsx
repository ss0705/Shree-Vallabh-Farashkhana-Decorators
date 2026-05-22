const ticker =
  'Mehendi Setup ✦ Haldi Setup ✦ Wedding Mandap ✦ Gate Entry ✦ Steel Sofa ✦ Leather Sofa ✦ VIP Chairs ✦ Halogen Lights ✦ Par Lights ✦ Fans ✦ Jumbo Cooler ✦ Original & Artificial Flowers'

function Marquee() {
  return (
    <div className="marquee" aria-label="Available decoration and rental services">
      <div className="marquee-track">
        <span>{ticker}</span>
        <span>{ticker}</span>
      </div>
    </div>
  )
}

export default Marquee
