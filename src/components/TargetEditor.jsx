import { useState } from 'react'

function TargetEditor({ currentTarget, onSave, onCancel }) {
  const [newTarget, setNewTarget] = useState(currentTarget)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTarget && newTarget > 0) {
      onSave(newTarget)
    }
  }

  const presetAmounts = [50000, 100000, 250000, 500000, 1000000]

  return (
    <div className="target-editor-overlay">
      <div className="target-editor">
        <div className="target-editor-header">
          <h3>Hedef Bağış Miktarını Belirle</h3>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="target-editor-form">
          <div className="preset-targets">
            <p>Hazır Hedefler:</p>
            <div className="preset-grid">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`preset-btn ${newTarget === amount ? 'active' : ''}`}
                  onClick={() => setNewTarget(amount)}
                >
                  ₺{amount.toLocaleString('tr-TR')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="custom-target">
            <label>Özel Miktar:</label>
            <input
              type="number"
              value={newTarget}
              onChange={(e) => setNewTarget(Number(e.target.value))}
              placeholder="Hedef miktarı girin"
              min="1000"
              step="1000"
              className="target-input"
            />
          </div>
          
          <div className="target-editor-buttons">
            <button type="submit" className="save-btn">
              Kaydet
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TargetEditor