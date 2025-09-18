import { useState } from 'react'

function DonationInterface({ totalDonation, fillPercentage, targetAmount, onDonate }) {
  const [donationAmount, setDonationAmount] = useState('')
  
  const quickAmounts = [50, 100, 250, 500, 1000, 2500]
  
  const handleDonate = () => {
    const amount = parseFloat(donationAmount)
    if (amount > 0) {
      onDonate(amount)
      setDonationAmount('')
    }
  }
  
  const handleQuickDonate = (amount) => {
    onDonate(amount)
  }
  
  return (
    <div className="donation-interface">
      <div className="stats">
        <div className="stat-item">
          <h3>Toplanan Miktar</h3>
          <div className="amount">
            ₺{Number.isFinite(totalDonation) ? totalDonation.toLocaleString('tr-TR') : '0'}
          </div>
        </div>
        
        <div className="stat-item">
          <h3>Tamamlanma Oranı</h3>
          <div className="percentage">
            {Number.isFinite(fillPercentage) ? fillPercentage.toFixed(1) : '0.0'}%
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Number.isFinite(fillPercentage) ? fillPercentage : 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="stat-item">
          <h3>Kalan Miktar</h3>
          <div className="remaining">
            ₺{Number.isFinite(targetAmount - totalDonation) ? Math.max(0, targetAmount - totalDonation).toLocaleString('tr-TR') : '0'}
          </div>
        </div>
      </div>
      
      <div className="donation-form">
        <h3>Bağış Yap</h3>
        
        <div className="quick-amounts">
          {quickAmounts.map(amount => (
            <button
              key={amount}
              className="quick-amount-btn"
              onClick={() => handleQuickDonate(amount)}
            >
              ₺{amount}
            </button>
          ))}
        </div>
        
        <div className="custom-amount">
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Özel miktar girin"
            value={donationAmount}
            onChange={e => setDonationAmount(e.target.value)}
            className="amount-input"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <button 
            onClick={handleDonate}
            className="donate-btn"
            disabled={!donationAmount || isNaN(parseFloat(donationAmount)) || parseFloat(donationAmount) <= 0}
          >
            Bağış Yap
          </button>
        </div>
      </div>
      
      {fillPercentage >= 100 && (
        <div className="success-message">
          🎉 Hedef tamamlandı! Teşekkürler! 🎉
        </div>
      )}
    </div>
  )
}

export default DonationInterface