import React from 'react';
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width = 50, height = 50 }) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser) || []; // Assurez-vous que c'est un tableau
    
    let avatarName = "";

    // Vérification que 'name' est une chaîne avant d'appeler 'split'
    if (name && typeof name === 'string') {
        const splitName = name.split(" ");
        
        // Création des initiales à partir du nom
        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    const bgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-gray-200',
        'bg-cyan-200',
        'bg-sky-200',
        'bg-blue-200',
    ];

    // Génération d'un nombre aléatoire pour choisir une couleur de fond
    const randomNumber = Math.floor(Math.random() * bgColor.length);
    const isOnline = onlineUser.includes(userId); // Vérification de la présence de userId

    return (
        <div className={`text-slate-800 rounded-full font-bold relative`} style={{ width: `${width}px`, height: `${height}px` }}>
            {
                imageUrl ? (
                    <img src={imageUrl}
                        width={width}
                        height={height}
                        alt={name}
                        className='overflow-hidden rounded-full'
                    />
                ) : (
                    name ? (
                        // Affichage des initiales si le nom est disponible
                        <div style={{ width: `${width}px`, height: `${height}px` }} className={`overflow-hidden rounded-full flex justify-center text-lg items-center ${bgColor[randomNumber]}`}>
                            {avatarName}
                        </div>
                    ) : (
                        // Affichage de l'icône par défaut si aucun nom ou image n'est fourni
                        <PiUserCircle size={width} />
                    )
                )
            }
            {
                // Indicateur de statut en ligne
                isOnline && (
                    <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'>PROFIL</div>
                )
            }
        </div>
    );
};

export default Avatar;

// const Avatar = (userId,name,imageUrl,width,height) => {
//   const onlineUser = useSelector(state => state?.user?.onlineUser)

//     // Parfait prajapati
//     let avatarName = ""

//     if (name) {
//         const splitName = name?.split(" ")
//         // const splitName = name

//         if (splitName.length > 1) {
//             avatarName = splitName[0][0]+splitName[1][0]
//         }else{
//             avatarName = splitName[0][0]
//         }
//     }

//     const bgColor = [
//         'bg-slate-200',
//         'bg-teal-200',
//         'bg-red-200',
//         'bg-green-200',
//         'bg-yellow-200',
//         'bg-gray-200',
//         'bg-cyan-200',
//         'bg-sky-200',
//         'bg-blue-200',
//     ]

//     const randomNumber = Math.floor(Math.random() * 9)
//     // console.log(randomNumber);

//     const isOnline = onlineUser.includes(userId)

//   return (
//     <div className={`text-slate-800 rounded-full font-bold relative`} style={{width : width+'px', height : height+'px'}} >
//       {
//         imageUrl ? (
//             <img src={imageUrl}
//                 width={width}
//                 height={height}
//                 alt={name}
//                 className='overflow-hidden rounded-full'
//             />
//         ) : (
//             name ? (
//                 <div style={{width : width+'px', height : height+'px'}} className={`overflow-hidden rounded-full flex justify-center text-lg items-center ${bgColor[randomNumber]}`}>
//                     {avatarName}
//                 </div>
//             ) : (
//                 // <div>PROFIL</div>
//                 <PiUserCircle size={width}/>
//             )
//         )
//       }

//       {
//         isOnline && (
//           <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full '>PROFIL</div>
//         )
//       } 

//     </div>
//   )
// }

// export default Avatar
