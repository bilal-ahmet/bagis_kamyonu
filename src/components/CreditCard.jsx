import { useState } from 'react'
import './CreditCard.css'

function CreditCard({ cardData }) {
  const formatCardNumber = (number) => {
    return number.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const getCardType = (number) => {
    const num = number.replace(/\s/g, '')
    if (num.startsWith('4')) return 'visa'
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard'
    if (num.startsWith('3')) return 'amex'
    return 'unknown'
  }

  return (
    <div className="credit-card">
      <div className="card-front">
        <div className="card-logo">
          <span className={`card-type ${getCardType(cardData.number)}`}>
            {getCardType(cardData.number).toUpperCase()}
          </span>
        </div>
        <div className="card-chip"></div>
        <div className="card-number">
          {formatCardNumber(cardData.number) || '•••• •••• •••• ••••'}
        </div>
        <div className="card-details">
          <div className="card-holder">
            <div className="label">KART SAHİBİ</div>
            <div className="value">{cardData.name.toUpperCase() || 'AD SOYAD'}</div>
          </div>
          <div className="card-expiry">
            <div className="label">SON KULLANMA</div>
            <div className="value">{cardData.expiry || 'AA/YY'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditCard