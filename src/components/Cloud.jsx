/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/cloud/model.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { fadeOnBeforeCompile } from '../utils/fadeMaterial'
import { useFrame } from '@react-three/fiber'

export function Cloud({ sceneOpacity, ...props }) {
  const { nodes, materials } = useGLTF('./models/cloud/model.gltf')
  const materialRef = useRef()

  useFrame(() => {
    materialRef.current.opacity = sceneOpacity.current
  })

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry} >
            <meshStandardMaterial
                ref = { materialRef }
                onBeforeCompile = { fadeOnBeforeCompile }
                envMapIntensity={ 2 }
                transparent
            />
        </mesh>
    </group>
  )
}

useGLTF.preload('./models/cloud/model.gltf')
