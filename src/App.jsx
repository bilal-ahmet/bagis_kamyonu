import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import TruckScene from './components/TruckScene'
import DonationInterface from './components/DonationInterface'
import './App.css'

function App() {
  const [totalDonation, setTotalDonation] = useState(0)
  const [fillPercentage, setFillPercentage] = useState(0)
  const targetAmount = 100000 // Hedef miktar (TL)

  const addDonation = (amount) => {
    const newTotal = totalDonation + amount
    setTotalDonation(newTotal)
    
    // Doluluk yüzdesini hesapla (maksimum %100)
    const newPercentage = Math.min((newTotal / targetAmount) * 100, 100)
    setFillPercentage(newPercentage)
    
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Bağış Kamyonu</h1>
        <p>Hedef: ₺{targetAmount.toLocaleString('tr-TR')}</p>
      </div>
      
      <div className="main-content">
        <div className="canvas-container">
          <Canvas 
            camera={{ position: [90, 15, 20], fov: 10 }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            
            <Suspense fallback={null}>
              <TruckScene fillPercentage={fillPercentage} />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
        
        <DonationInterface 
          totalDonation={totalDonation}
          fillPercentage={fillPercentage}
          targetAmount={targetAmount}
          onDonate={addDonation}
        />
      </div>
    </div>
  )
}

export default App
