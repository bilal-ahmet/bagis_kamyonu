import { useState, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import TruckScene from './components/TruckScene'
import DonationInterface from './components/DonationInterface'
import TargetEditor from './components/TargetEditor'
import './App.css'

function App() {
  const [totalDonation, setTotalDonation] = useState(0)
  const [fillPercentage, setFillPercentage] = useState(0)
  const [cameraView, setCameraView] = useState(1)
  const [targetAmount, setTargetAmount] = useState(100000) // Hedef miktar (TL) - artık state
  const [showTargetEditor, setShowTargetEditor] = useState(false)
  const controlsRef = useRef()

  // Kamera pozisyonları
  const cameraPositions = {
    1: { position: [45, 20, 35], target: [0, 0, 0] }, // Sağ üst çapraz
    2: { position: [80, 10, 0], target: [0, 0, 0] }   // Tam yan görünüm
  }

  const addDonation = (amount) => {
    const newTotal = totalDonation + amount
    setTotalDonation(newTotal)
    
    // Doluluk yüzdesini hesapla (maksimum %100)
    const newPercentage = Math.min((newTotal / targetAmount) * 100, 100)
    setFillPercentage(newPercentage)
  }

  const switchCamera = (viewNumber) => {
    setCameraView(viewNumber)
    if (controlsRef.current) {
      const targetPos = cameraPositions[viewNumber]
      controlsRef.current.object.position.set(...targetPos.position)
      controlsRef.current.target.set(...targetPos.target)
      controlsRef.current.update()
    }
  }

  const updateTargetAmount = (newTarget) => {
    setTargetAmount(newTarget)
    // Yeni hedef ile doluluk yüzdesini yeniden hesapla
    const newPercentage = Math.min((totalDonation / newTarget) * 100, 100)
    setFillPercentage(newPercentage)
    setShowTargetEditor(false)
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Bağış Kamyonu</h1>
        <div className="target-display">
          <p>Hedef: ₺{targetAmount.toLocaleString('tr-TR')}</p>
          <button 
            className="edit-target-btn"
            onClick={() => setShowTargetEditor(true)}
            title="Hedef miktarını düzenle"
          >
            ⚙️
          </button>
        </div>
        
        {showTargetEditor && (
          <TargetEditor 
            currentTarget={targetAmount}
            onSave={updateTargetAmount}
            onCancel={() => setShowTargetEditor(false)}
          />
        )}
      </div>
      
      <div className="main-content">
        <div className="canvas-container">
          <Canvas 
            camera={{ position: [45, 20, 35], fov: 20 }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            
            <Suspense fallback={null}>
              <TruckScene fillPercentage={fillPercentage} />
              <OrbitControls 
                ref={controlsRef}
                enablePan={false}
                enableZoom={false}
                enableRotate={false}
                target={[0, 0, 0]}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
          
          {/* Kamera Geçiş Butonları */}
          <div className="camera-controls">
            <button 
              className={`camera-btn ${cameraView === 1 ? 'active' : ''}`}
              onClick={() => switchCamera(1)}
            >
              1
            </button>
            <button 
              className={`camera-btn ${cameraView === 2 ? 'active' : ''}`}
              onClick={() => switchCamera(2)}
            >
              2
            </button>
          </div>
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
