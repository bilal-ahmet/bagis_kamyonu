import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

function TargetEditor({ currentTarget, onSave, onCancel }) {
  const [newTarget, setNewTarget] = useState(currentTarget)
  const [isVisible, setIsVisible] = useState(false)

  // Modal animasyon için
  useEffect(() => {
    setIsVisible(true)
    // Body scroll'u kapat
    document.body.style.overflow = 'hidden'
    
    // ESC tuşu ile kapatma
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    
    return () => {
      // Component unmount olduğunda scroll'u geri aç ve event listener'ı kaldır
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    document.body.style.overflow = 'unset'
    setTimeout(onCancel, 300) // Animasyon bitimini bekle
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTarget && newTarget > 0) {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
      setTimeout(() => onSave(newTarget), 300)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const presetAmounts = [50000, 100000, 250000, 500000, 1000000, 2000000]

  const modalContent = (
    <div 
      className={`target-editor-overlay ${isVisible ? 'visible' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`target-editor-modal ${isVisible ? 'visible' : ''}`}>
        <div className="target-editor-header">
          <div className="header-icon">🎯</div>
          <div className="header-content">
            <h2>Hedef Bağış Miktarını Belirle</h2>
            <p>Bağış kampanyanız için hedef miktarı seçin veya özel bir miktar girin</p>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <span>×</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="target-editor-form">
          <div className="current-target-display">
            <span className="label">Mevcut Hedef:</span>
            <span className="amount">₺{currentTarget.toLocaleString('tr-TR')}</span>
          </div>

          <div className="preset-targets-section">
            <h3>🚀 Hazır Hedefler</h3>
            <div className="preset-grid">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`preset-btn ${newTarget === amount ? 'active' : ''}`}
                  onClick={() => setNewTarget(amount)}
                >
                  <span className="amount">₺{amount.toLocaleString('tr-TR')}</span>
                  {amount === 100000 }
                </button>
              ))}
            </div>
          </div>
          
          <div className="custom-target-section">
            <h3>✏️ Özel Miktar</h3>
            <div className="custom-input-wrapper">
              <span className="currency-symbol">₺</span>
              <input
                type="number"
                value={newTarget}
                onChange={(e) => setNewTarget(Number(e.target.value))}
                placeholder="Özel hedef miktarı"
                min="1000"
                step="1000"
                className="custom-target-input"
              />
            </div>
            <div className="input-help">
              Minimum: ₺1.000 - Önerilen: ₺10.000 üzeri
            </div>
          </div>
          
          <div className="preview-section">
            <div className="new-target-preview">
              <span className="preview-label">Yeni Hedef:</span>
              <span className="preview-amount">₺{newTarget?.toLocaleString('tr-TR') || '0'}</span>
            </div>
          </div>
          
          <div className="target-editor-buttons">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={handleClose}
            >
              <span>İptal</span>
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={!newTarget || newTarget <= 0}
            >
              <span>Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  // Portal kullanarak modal'ı document.body'ye render et
  return createPortal(modalContent, document.body)
}

export default TargetEditor