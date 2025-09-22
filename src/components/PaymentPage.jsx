import { useState } from 'react'
import CreditCard from './CreditCard'

function PaymentPage({ amount, onPaymentComplete, onCancel }) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Kart numarası için sadece rakam ve boşluk
    if (name === 'number') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim()
      if (formattedValue.length <= 19) {
        setCardData(prev => ({ ...prev, [name]: formattedValue }))
      }
      return
    }
    
    // Son kullanma tarihi formatı
    if (name === 'expiry') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/')
      if (formattedValue.length <= 5) {
        setCardData(prev => ({ ...prev, [name]: formattedValue }))
      }
      return
    }
    
    // CVC için sadece rakam
    if (name === 'cvc') {
      const formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length <= 4) {
        setCardData(prev => ({ ...prev, [name]: formattedValue }))
      }
      return
    }
    
    setCardData(prev => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (e) => {
    setCardData(prev => ({ ...prev, focus: e.target.name }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basit validasyon
    if (!cardData.number || !cardData.expiry || !cardData.cvc || !cardData.name) {
      alert('Lütfen tüm alanları doldurun')
      return
    }
    
    if (cardData.number.replace(/\s/g, '').length < 16) {
      alert('Geçerli bir kart numarası girin')
      return
    }
    
    if (cardData.cvc.length < 3) {
      alert('Geçerli bir CVC kodu girin')
      return
    }
    
    setIsProcessing(true)
    
    // Simüle edilmiş ödeme işlemi (2 saniye sonra başarılı)
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentComplete(amount)
    }, 2000)
  }

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        <div className="payment-header">
          <h2>Ödeme Sayfası</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <div className="payment-amount">
          <span>Ödenecek Tutar: </span>
          <strong>₺{amount.toLocaleString('tr-TR')}</strong>
        </div>
        
        <div className="payment-content">
          <div className="card-preview">
            <CreditCard cardData={cardData} />
          </div>
          
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label>Kart Üzerindeki İsim</label>
              <input
                type="text"
                name="name"
                placeholder="İsim Soyisim"
                value={cardData.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                disabled={isProcessing}
              />
            </div>
            
            <div className="form-group">
              <label>Kart Numarası</label>
              <input
                type="text"
                name="number"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                disabled={isProcessing}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Son Kullanma Tarihi</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  disabled={isProcessing}
                />
              </div>
              
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  placeholder="123"
                  value={cardData.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  disabled={isProcessing}
                />
              </div>
            </div>
            
            <div className="payment-buttons">
              <button 
                type="button" 
                onClick={onCancel}
                className="cancel-btn"
                disabled={isProcessing}
              >
                İptal
              </button>
              <button 
                type="submit" 
                className="pay-btn"
                disabled={isProcessing}
              >
                {isProcessing ? 'İşleniyor...' : `₺${amount.toLocaleString('tr-TR')} Öde`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage