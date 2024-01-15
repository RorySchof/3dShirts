import React, { useRef, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';

const LogoPicker = ({ onUpdateLogo }) => {
  const [logo, setLogo] = useState(null);
  const logoInputRef = useRef();

  const { nodes } = useGLTF('/logo-placeholder.glb'); // Replace with the path to your placeholder GLB model

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const logoURL = URL.createObjectURL(file);
      setLogo(logoURL);
      onUpdateLogo(logoURL); // Notify the parent component about the logo update
    }
  };

  return (
    <group>
      <mesh
        geometry={nodes.Logo.geometry}
        position={[0, 0.5, 0]} // Adjust the position as needed
        rotation={[0, Math.PI, 0]} // Adjust the rotation as needed
      >
        {logo && (
          <meshStandardMaterial map={useTexture(logo)} />
        )}
      </mesh>

      {/* Input for selecting a new logo */}
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        ref={logoInputRef}
        style={{ display: 'none' }}
        onChange={handleLogoChange}
      />

      {/* Button to trigger the file input */}
      <button onClick={() => logoInputRef.current.click()}>Select Logo</button>
    </group>
  );
};

export default LogoPicker;
