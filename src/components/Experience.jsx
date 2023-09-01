import { OrbitControls, Float, PerspectiveCamera, useScroll, Text } from "@react-three/drei";
import { Background } from "./Background.jsx";
import { Airplane } from "./Airplane.jsx";
import { Cloud } from "./Cloud.jsx";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from 'three'
import { Group, Vector3, Euler } from 'three'
import { useFrame } from "@react-three/fiber";
import { TextSection } from "./TextSection.jsx";
import gsap from 'gsap'
import { fadeOnBeforeCompile } from "../utils/fadeMaterial.js";
import { usePlay } from "../contexts/Play.jsx";
import { Speed } from './Speed.jsx'

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;

const Experience = () => {

  const curvePoints = useMemo(() => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(5, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(7, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(5, 0, -7 * CURVE_DISTANCE),
  ], [])

  const sceneOpacity = useRef(0)
  const linearMaterialRef = useRef()

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      curvePoints,
      false,
      "catmullrom",
      0.5)
  }, [])

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 3,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        subtitle: `Welceme to Atmos,
Have a seat and enjoy the ride!`
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x + 2,
          curvePoints[2].y,
          curvePoints[2].z
        ),
        title: "Services",
        subtitle: `Do you want a drink?
We have a wide range of beverages!`
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 3,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        title: "Fear of Flying?",
        subtitle: `Our flight attendants will help you have a great journey.`
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x + 3.5,
          curvePoints[4].y,
          curvePoints[4].z - 12
        ),
        title: "Movies",
        subtitle: `We provide a large selection of medias, we highly recommend you AlphaGo.`
      },
    ]
  }, [])

  const clouds = useMemo(() => [
    // STARTING
    {
      position: new Vector3(-4.5, -2.2, -7),
      scale: new Vector3(1.2, 1.2, 1.2),
    },
    {
      position: new Vector3(3.5, -4, -10),
      scale: new Vector3(2, 2, 2),
    },
    {
      position: new Vector3(-18, 0.2, -68),
      scale: new Vector3(4, 4, 4),
      rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
    },
    {
      position: new Vector3(10, -1.2, -52),
      
      scale: new Vector3(2.5, 2.5, 2.5),
    },
    // FIRST POINT
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[1].x + 10,
        curvePoints[1].y - 4,
        curvePoints[1].z + 64,
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[1].x - 20,
        curvePoints[1].y + 4,
        curvePoints[1].z + 28,
      ),
      rotation: new Euler(0, Math.PI / 7, 0),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x - 13,
        curvePoints[1].y + 4,
        curvePoints[1].z - 62,
      ),
      rotation: new Euler(0, Math.PI / 7,  Math.PI / 5),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x + 54,
        curvePoints[1].y + 2,
        curvePoints[1].z - 82,
      ),
      rotation: new Euler(Math.PI / 2, Math.PI / 2,  Math.PI / 3),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x + 8,
        curvePoints[1].y - 14,
        curvePoints[1].z - 22,
      ),
    },
    // SECOND POINT
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[2].x + 6,
        curvePoints[2].y - 7,
        curvePoints[2].z + 50,
      ),
    },
    {
      scale: new Vector3(2, 2, 2),
      position: new Vector3(
        curvePoints[2].x - 2,
        curvePoints[2].y + 4,
        curvePoints[2].z - 26,
      ),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[2].x + 12,
        curvePoints[2].y + 1,
        curvePoints[2].z - 86,
      ),
      rotation: new Euler(Math.PI / 4, 0,  Math.PI / 3),
    },
    // THIRD POINT
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[3].x + 3,
        curvePoints[3].y - 10,
        curvePoints[3].z + 50,
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[3].x - 10,
        curvePoints[3].y ,
        curvePoints[3].z + 30,
      ),
      rotation: new Euler(Math.PI / 4, 0,  Math.PI / 5),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[3].x - 20,
        curvePoints[3].y - 5,
        curvePoints[3].z - 8,
      ),
      rotation: new Euler(Math.PI / 4, 0,  Math.PI / 5),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[3].x - 2,
        curvePoints[3].y - 5,
        curvePoints[3].z - 98,
      ),
      rotation: new Euler(0, Math.PI / 3,  0),
    },
    // FOURTH POINT
    {
      scale: new Vector3(2, 2, 2),
      position: new Vector3(
        curvePoints[4].x + 3,
        curvePoints[4].y - 10,
        curvePoints[4].z + 2,
      ),
    },
    {
      scale: new Vector3(2, 2, 2),
      position: new Vector3(
        curvePoints[4].x + 24,
        curvePoints[4].y - 6,
        curvePoints[4].z - 42,
      ),
      rotation: new Euler(Math.PI / 4, 0,  Math.PI / 5),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[4].x - 4,
        curvePoints[4].y + 9,
        curvePoints[4].z - 62,
      ),
      rotation: new Euler(Math.PI / 3, 0,  Math.PI / 3),
    },
    // FINAL
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[7].x + 12,
        curvePoints[7].y - 5,
        curvePoints[7].z + 60,
      ),
      rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[7].x - 12,
        curvePoints[7].y + 5,
        curvePoints[7].z + 120,
      ),
      rotation: new Euler(-Math.PI / 4, Math.PI / 6, 0),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[7].x + 4,
        curvePoints[7].y + 12,
        curvePoints[7].z + 140,
      ),
      rotation: new Euler(0, 0, 0),
    },
  ], [])
  
  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS)
  }, [curve])
  
  const shape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, -0.08)
    shape.lineTo(0, 0.08)

    return shape;
  }, [curve])

  const cameraGroup = useRef()
  const cameraRail = useRef()
  const camera = useRef()
  const scroll = useScroll()
  const airplane = useRef()
  const lastScroll = useRef(0)

  const { play, setHasScroll, end, setEnd } = usePlay()

  useFrame((_state, delta) => {
    if(window.innerWidth > window.innerHeight) {
      // LANDSCAPE
      camera.current.fov = 40
      camera.current.position.z = 5
    }
    else {
      // PORTRAIT
      camera.current.fov = 90
      camera.current.position.z = 2
    }

    const scrollOffset = Math.max(0, scroll.offset)

    if(lastScroll.current <= 0 && scrollOffset > 0) {
      setHasScroll(true)
    }

    linearMaterialRef.current.opacity = sceneOpacity.current

    if(play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      )
    }

    if(end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      )
    }

    if(end) {
      return;
    }

    let friction = 1

    let resetCameraRail = true
    // LOOK AT TEXT
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      )
      
      if(distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1)
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        )
        cameraRail.current.position.lerp(targetCameraRailPosition, delta)
        resetCameraRail = false;
      }
    })

    if(resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0)
      cameraRail.current.position.lerp(targetCameraRailPosition, delta)
    }

    // CALCULATE LERPED SCROLL OFFSET
    let lerpedScrollOffset = THREE.MathUtils.lerp(lastScroll.current, scrollOffset, delta * friction)

    // PROTECT BELOW 0 AND ABOVE 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1)
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0)

    lastScroll.current = lerpedScrollOffset
    tl.current.seek(lerpedScrollOffset * tl.current.duration())

    const currPoint = curve.getPoint(lerpedScrollOffset)

    // Follow the curve points
    cameraGroup.current.position.lerp(currPoint, delta * 24)

    // Make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1))

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    )
    const targetLookAt = new THREE.Vector3()
    .subVectors(currPoint, lookAtPoint)
    .normalize()

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24)
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    )

    // Airplane rotation
    const tangent = curve.getTangent(scrollOffset + CURVE_AHEAD_AIRPLANE)

    const nonLerpLookAt = new Group()
    nonLerpLookAt.position.copy(currPoint)
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt))

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    )

    let angle = Math.atan2(-tangent.z, tangent.x)
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI
    angleDegrees *= 2.4

    // LIMIT PLANE ANGLE
    if(angleDegrees < 0)
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE)
    if(angleDegrees > 0)
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE)

    // SET BACK ANGLE
    angle = (angleDegrees * Math.PI) / 180

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    )
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2)

    if(cameraGroup.current.position.z < curvePoints[curvePoints.length - 1].z + 100) {
      setEnd(true)
      planeOutTl.current.play()
    }
  })

  const tl = useRef()
  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd"
  })

  const planeInTl = useRef()
  const planeOutTl = useRef()

  useLayoutEffect(() => {
    tl.current = gsap.timeline()

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#4F4CCC",
      colorB: "#EBAE78",
    })
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#6f35cc",
      colorB: "#ffad30",
    })
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#222222",
      colorB: "#3c1a40",
    })

    tl.current.pause()

    planeInTl.current = gsap.timeline()
    planeInTl.current.pause()
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline()
    planeOutTl.current.pause()

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    })
  }, [])

  useEffect(() => {
    if(play) {
      planeInTl.current.play()
    }
  })
  
    return useMemo(() => (
      <>
        <directionalLight position={ [0, 3, 1] } intensity={ 0.1 } />
        {/* <OrbitControls enableZoom = { false } /> */}
        <group ref={ cameraGroup } >
          <Speed />
          <Background backgroundColors = { backgroundColors } />
          <group ref={ cameraRail }>
            <PerspectiveCamera ref={ camera } position = { [0, 0, 5] } fov =  { 40 } makeDefault />
          </group>
          <group ref = { airplane } >
            <Float floatIntensity = { 1 } speed = { 1.6 } rotationIntensity = { 0.5 }>
              <Airplane rotation-y= { Math.PI} scale={[0.003, 0.003, 0.003]} position-y = { 0.04 } position-x = { 0.2 }/>
            </Float>
          </group>
        </group>

        {/* TEXT */}
        {textSections.map((textSection, index) => (
            <TextSection {...textSection} key = { index } />
          ))
        }
        
  
        {/* Line */}
        <group position-y={ -2 } >
          {/* <Line
            points = { linePoints }
            color = { "white" }
            opacity = { 0.7 }
            transparent
            lineWidth = { 16 }
          /> */}
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                }
              ]}
            />
            <meshStandardMaterial
              color={ "white" }
              ref={ linearMaterialRef }
              transparent
              envMapIntensity={ 2 }
              onBeforeCompile={ fadeOnBeforeCompile }
            />
            
          </mesh>
        </group>
  
        {/* CLOUDS */}
        {
          clouds.map((cloud, index) => (
            <Cloud sceneOpacity = { sceneOpacity } {...cloud} key = { index } />
          ))
        }
      </>
    ), []);
}

export default Experience;