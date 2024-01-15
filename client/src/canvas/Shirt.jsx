import React, { useEffect, useState } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF } from '@react-three/drei';
import { TextureLoader } from 'three';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const [logoTexture, setLogoTexture] = useState(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      '/react.png', // Update the path relative to the public folder
      (texture) => {
        setLogoTexture(texture);
        setLogoLoaded(true);
      },
      undefined,
      (error) => {
        setLogoLoadError(true);
        console.error('Error loading logo texture:', error);
      }
    );
  }, []);

  useEffect(() => {
    console.log('Is Logo Texture Loaded:', logoLoaded);
    console.log('Logo Texture Path:', '/assets/download.png'); // Update the path relative to the public folder
    console.log('Error loading logo texture:', logoLoadError);
  }, [logoLoaded, logoLoadError]);

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  console.log('Rendering Shirt Component with State:', stateString);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {logoTexture && logoLoaded && snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            material-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;







// FINE WORKING CODE WITH NO LOGO.


// import React, { useEffect, useState } from 'react';
// import { easing } from 'maath';
// import { useSnapshot } from 'valtio';
// import { useFrame } from '@react-three/fiber';
// import { Decal, useGLTF, useTexture } from '@react-three/drei';

// import state from '../store';

// const Shirt = () => {
//   const snap = useSnapshot(state);
//   const { nodes, materials } = useGLTF('/shirt_baked.glb');

//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);

//   // Use state to track the loaded status
//   const [logoLoaded, setLogoLoaded] = useState(false);

//   useEffect(() => {
//     // Check the loaded status when the logo texture changes
//     setLogoLoaded(logoTexture && logoTexture.isLoaded);
//   }, [logoTexture, snap.logoDecal]);

//   useEffect(() => {
//     // Log the loaded status when it changes
//     console.log('Is Logo Texture Loaded:', logoLoaded);
//     console.log('Logo Texture Path:', snap.logoDecal);

//     console.log('Is Full Texture Loaded:', fullTexture && fullTexture.isLoaded);
//     console.log('Full Texture Path:', snap.fullDecal);
//   }, [logoLoaded, snap.logoDecal, fullTexture, snap.fullDecal]);

//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

//   const stateString = JSON.stringify(snap);

//   console.log('Rendering Shirt Component with State:', stateString);

//   return (
//     <group key={stateString}>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//       >
//         {fullTexture && fullTexture.isLoaded && snap.isFullTexture && (
//           <Decal
//             position={[0, 0, 0]}
//             rotation={[0, 0, 0]}
//             scale={1}
//             map={fullTexture}
//           />
//         )}

//         {logoTexture && logoLoaded && snap.isLogoTexture && (
//         <Decal
//         position={[0, 0.04, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.15}
//         map={logoTexture}
//         material-anisotropy={16}  // Remove the curly braces
//         depthTest={false}
//         depthWrite={true}
//       />
//         )}
//       </mesh>
//     </group>
//   );
// }

// export default Shirt;










// WORKING

// import React from 'react';
// import { easing } from 'maath';
// import { useSnapshot } from 'valtio';
// import { useFrame } from '@react-three/fiber'; 
// import { Decal, useGLTF, useTexture } from '@react-three/drei'; 

// import state from '../store';

// const Shirt = () => {
//   const snap = useSnapshot(state);
//   const { nodes, materials } = useGLTF('./shirt_baked.glb');

//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);

//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
//   const stateString = JSON.stringify(snap); 

//   return (
//     <group key={stateString}>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//       >
//         {fullTexture && fullTexture.isLoaded && snap.isFullTexture && (
//           <Decal 
//             position={[0, 0, 0]}
//             rotation={[0, 0, 0]}
//             scale={1}
//             map={fullTexture}
//           />
//         )}

//         {logoTexture && logoTexture.isLoaded && snap.isLogoTexture && (
//           <Decal 
//             position={[0, 0.04, 0.15]}
//             rotation={[0, 0, 0]}
//             scale={0.15}
//             map={logoTexture}
//             {...(logoTexture.anisotropy && { 'map-anisotropy': logoTexture.anisotropy })}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//       </mesh>
//     </group>
//   );
// };

// export default Shirt;


// OLDER WORKING 

// import React from 'react';
// import { easing } from 'maath';
// import { useSnapshot } from 'valtio';
// import { useFrame } from '@react-three/fiber'; 
// import { Decal, useGLTF, useTexture } from '@react-three/drei'; 

// import state from '../store';

// const Shirt = () => {
//   const snap = useSnapshot(state);
//   const { nodes, materials } = useGLTF('./shirt_baked.glb');

//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);

//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
//   const stateString = JSON.stringify(snap); 


//   return (
//     <group
//       key={stateString}
//     >
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert}
//         material-roughness={1}
//         dispose={null}
//       >

        



//       </mesh>
//     </group>
//   );
// };

// export default Shirt;



