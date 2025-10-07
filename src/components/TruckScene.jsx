import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, Suspense, useState } from 'react'
import * as THREE from 'three'

// GLTF model bileşenleri - Suspense içinde kullanılmalı
function TruckModel() {
  const gltf = useGLTF('/models/tir/tır.gltf')
  
  if (!gltf || !gltf.scene) {
    return (
      <group position={[-2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    )
  }
  
  
  // Scene'in bounding box'ını hesapla
  const box = new THREE.Box3().setFromObject(gltf.scene)
  
  return (
    <group position={[0, -0.3, 5]}>
      <primitive 
        object={gltf.scene} 
        scale={[1400, 1400, 1400]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

function TrailerModel({ fillPercentage }) {
  const gltf = useGLTF('/models/dorse/dorse.gltf')
  
  if (!gltf || !gltf.scene) {
    return (
      <group position={[5, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </group>
    )
  }
  
  useEffect(() => {
    if (gltf.scene) {
      
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          
          // Tekerlekleri ve siyah parçaları renk değişikliğinden hariç tut
          const isTire = child.material.name && (
            child.material.name.includes('TIRE') ||
            child.material.name.includes('Wheel') ||
            child.material.name.includes('BLACK') ||
            child.material.name.includes('Black_material')
          )
          
          // Sadece beyaz trailer parçalarını (ana dorse gövdesi) boyayalım
          const isTrailerBody = child.material.name && (
            child.material.name.includes('Trailer_White')
          )
          
          if (isTrailerBody && !isTire) {
            
            const fillRatio = fillPercentage / 100
            const emptyColor = new THREE.Color(0x888888)
            const fullColor = new THREE.Color(0x4CAF50)
            const interpolatedColor = emptyColor.clone().lerp(fullColor, fillRatio)
            
            if (child.material.color) {
              child.material = child.material.clone()
              child.material.color = interpolatedColor
              child.material.needsUpdate = true
            }
          } else if (isTire) {
          }
        }
      })
    }
  }, [gltf.scene, fillPercentage])
  
  return (
    <group position={[0, -0.4, 6]}>
      <primitive
        object={gltf.scene} 
        scale={[0.40, 0.37, 0.40]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

// Fallback bileşenleri
function FallbackTruck() {
  return (
    <group position={[-4, 0, 0]}>
      <mesh position={[0, 1, 1]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.2, 0.3, 6]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      {/* Tekerlekler */}
      {[-1.5, 1.5].map((z, i) => (
        <group key={i}>
          <mesh position={[-1.2, 0.4, z]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[1.2, 0.4, z]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FallbackTrailer({ fillPercentage }) {
  const fillRatio = fillPercentage / 100
  const emptyColor = new THREE.Color(0x888888)
  const fullColor = new THREE.Color(0x4CAF50)
  const interpolatedColor = emptyColor.clone().lerp(fullColor, fillRatio)
  
  return (
    <group position={[3, 0, 0]}>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[6, 3, 2.5]} />
        <meshStandardMaterial color={interpolatedColor} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[6.2, 0.3, 3]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      {/* Tekerlekler - renk değişmez */}
      {[-1.2, 1.2].map((z, i) => (
        <group key={i}>
          <mesh position={[-2.5, 0.4, z]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[2.5, 0.4, z]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function TruckScene({ fillPercentage }) {
  
  return (
    <group>
      {/* Gerçek GLTF Modeller */}
      <TruckModel />
      <TrailerModel fillPercentage={fillPercentage} />
      {/* Ek ışıklandırma */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[15, 15, 15]} 
        intensity={1.0}
      />
      <pointLight position={[-10, 10, 10]} intensity={0.4} />
    </group>
  )
}

// GLTF dosyalarını preload et
try {
  useGLTF.preload('/models/tir/tır.gltf')
  useGLTF.preload('/models/dorse/dorse.gltf')
} catch (error) {
}

export default TruckScene