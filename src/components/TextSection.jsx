import { Text } from "@react-three/drei"
import { fadeOnBeforeCompile, fadeOnBeforeCompileFlat } from "../utils/fadeMaterial"

export const TextSection = ( {title, subtitle, ...props} ) => {
    return (
        <group { ...props }>
            { !!title && (
                <Text
                    color = "white"
                    anchorX = { "left" }
                    anchorY = { "bottom" }
                    fontSize = { 0.52 }
                    maxWidth = { 2.5 }
                    lineHeight={ 1 }
                    font = "./fonts/PlayfairDisplay-Regular.ttf"
                >
                    { title }
                    <meshStandardMaterial
                        color={ "white" }
                        onBeforeCompile={ fadeOnBeforeCompileFlat }
                    />
                </Text>
            )}
          
            <Text
                color = "white"
                anchorX = { "left" }
                anchorY = { "top" }
                fontSize = { 0.18 }
                maxWidth = { 2.5 }
                font = "./fonts/Inter-Regular.ttf"
            >
                { subtitle }
                <meshStandardMaterial
                        color={ "white" }
                        onBeforeCompile={ fadeOnBeforeCompileFlat }
                />
            </Text>
        </group>
    )
}


{/* <group position={ [-3, 0, -100] }>
          <Text
            color = "white"
            anchorX = { "left" }
            anchorY = { "middle" }
            fontSize = { 0.22 }
            maxWidth = { 2.5 }
            font = "./fonts/DMSerifDisplay-Regular.ttf"
          >
            Welcome to ReAtmos!{ "\n" }
            Have a seat and enjoy the ride!
          </Text>
        </group> */}