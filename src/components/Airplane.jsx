/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/airplane/model.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Airplane(props) {
  const { nodes, materials } = useGLTF('./models/airplane/model.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Boeing_787_8obj2-Mesh'].geometry} material={materials.Mat} />
      <meshNormalMaterial />
      <mesh geometry={nodes['Boeing_787_8obj2-Mesh_1'].geometry} material={materials['Mat.1']} />
      <meshNormalMaterial />
    </group>
  )
}

useGLTF.preload('./models/airplane/model.glb')