import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CreditCard from '../components/CreditCard'

function PaymentCheckout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // URL parametrelerinden verileri al
  const amount = Number(searchParams.get('amount')) || 0
  const targetAmount = Number(searchParams.get('target')) || 100000
  
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Geçersiz miktar kontrolü
  useEffect(() => {
    if (amount <= 0) {
      navigate('/')
    }
  }, [amount, navigate])

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

  const validateCard = () => {
    return (
      cardData.number.replace(/\s/g, '').length >= 13 &&
      cardData.expiry.length === 5 &&
      cardData.cvc.length >= 3 &&
      cardData.name.trim().length >= 2
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateCard()) {
      alert('Lütfen tüm kart bilgilerini eksiksiz doldurun.')
      return
    }

    setIsProcessing(true)

    try {
      // Simüle edilmiş ödeme işlemi
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setPaymentSuccess(true)
      
      // Başarılı ödeme sonrası ana sayfaya yönlendir
      setTimeout(() => {
        navigate(`/?success=true&amount=${amount}`)
      }, 3000)
      
    } catch (error) {
      alert('Ödeme işlemi başarısız! Lütfen tekrar deneyin.')
      setIsProcessing(false)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  if (paymentSuccess) {
    return (
      <div className="payment-checkout-page">
        <div className="payment-success-container">
          <div className="success-animation">
            <div className="success-icon">✅</div>
            <h1>Ödeme Başarılı!</h1>
            <p>₺{amount.toLocaleString('tr-TR')} bağışınız başarıyla alınmıştır.</p>
            <p>Katkınız için çok teşekkür ederiz! ❤️</p>
            <div className="redirect-info">
              <p>Ana sayfaya yönlendiriliyorsunuz...</p>
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <button className="back-btn" onClick={handleCancel}>
            ← Geri Dön
          </button>
          <h1>Güvenli Ödeme</h1>
          <div className="security-badge">
            🔒 SSL Güvenli
          </div>
        </div>

        <div className="checkout-content">
          <div className="payment-summary">
            <h3>Bağış Özeti</h3>
            <div className="summary-item">
              <span>Bağış Miktarı:</span>
              <strong>₺{amount.toLocaleString('tr-TR')}</strong>
            </div>
            <div className="summary-item">
              <span>Hedef Miktar:</span>
              <span>₺{targetAmount.toLocaleString('tr-TR')}</span>
            </div>
            <div className="summary-item">
              <span>Katkı Oranı:</span>
              <span>%{((amount / targetAmount) * 100).toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Toplam:</span>
              <strong>₺{amount.toLocaleString('tr-TR')}</strong>
            </div>
          </div>

          <div className="payment-form-section">
            <h3>Kart Bilgileri</h3>
            
            <div className="card-preview-container">
              <CreditCard cardData={cardData} />
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
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
                  className="form-input"
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
                  className="form-input"
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
                    className="form-input"
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
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="checkout-buttons">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={handleCancel}
                  disabled={isProcessing}
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  className="pay-btn"
                  disabled={isProcessing || !validateCard()}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      İşleniyor...
                    </>
                  ) : (
                    `₺${amount.toLocaleString('tr-TR')} Öde`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentCheckout