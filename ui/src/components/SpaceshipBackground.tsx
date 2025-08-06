// import { useEffect, useState } from 'react';
// import './SpaceshipBackground.css'; 

// const SpaceshipBackground = () => {
//   const [spaceships, setSpaceships] = useState<Array<{
//     id: number;
//     speed: 'slow' | 'medium' | 'fast';
//     type: 'fighter' | 'cruiser' | 'scout';
//     top: number;
//     delay: number;
//   }>>([]);

//   useEffect(() => {
//     const shipTypes = ['slow', 'medium', 'fast'] as const;
//     const spaceshipTypes = ['fighter', 'cruiser', 'scout'] as const;
//     const newSpaceships = Array.from({ length: 12 }, (_, i) => ({
//       id: i,
//       speed: shipTypes[Math.floor(Math.random() * shipTypes.length)],
//       type: spaceshipTypes[Math.floor(Math.random() * spaceshipTypes.length)],
//       top: Math.random() * 80 + 10, // 10% to 90% from top
//       delay: Math.random() * 15, // 0 to 15 seconds delay
//     }));
    
//     setSpaceships(newSpaceships);
//   }, []);

//   const getSpaceshipIcon = (type: 'fighter' | 'cruiser' | 'scout') => {
//     switch (type) {
//       case 'fighter':
//         return '🚀';
//       case 'cruiser':
//         return '🛸';
//       case 'scout':
//         return '✈️';
//       default:
//         return '🚀';
//     }
//   };

//   return (
//     <div className="spaceship-container">
//       {spaceships.map((ship) => (
//         <div
//           key={ship.id}
//           className={`spaceship spaceship-${ship.speed} spaceship-${ship.type}`}
//           style={{
//             top: `${ship.top}%`,
//             animationDelay: `${ship.delay}s`,
//           }}
//         >
//           {getSpaceshipIcon(ship.type)}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SpaceshipBackground;