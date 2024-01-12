// Importation des modules Firebase nécessaires
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Configuration Firebase contenant les clés API et d'autres paramètres
const firebaseConfig = {
  // Votre configuration Firebase
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: "image-node.appspot.com", // Ajusté pour le bucket de stockage spécifique
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialisation de l'application Firebase avec la configuration fournie
const firebaseApp = initializeApp(firebaseConfig);

// Obtention de l'instance de stockage Firebase
const storage = getStorage(firebaseApp);

// Fonction pour téléverser un fichier sur le stockage Firebase et obtenir l'URL de téléchargement
const uploadFileToStorage = async (file, destination) => {
  // Création d'une référence à la destination spécifiée dans le stockage
  const storageRef = ref(storage, destination);

  // Configuration des métadonnées du fichier (type de contenu dans ce cas)
  const metadata = {
    contentType: "image/png", // Ajustez en fonction de votre type de fichier réel
  };

  // Téléversement des octets du fichier sur le stockage Firebase
  await uploadBytes(storageRef, file.buffer, metadata);

  // Récupération de l'URL de téléchargement pour le fichier téléversé
  const downloadURL = await getDownloadURL(storageRef);

  // Retour de l'URL de téléchargement pour une utilisation ultérieure
  return downloadURL;
};

// Exportation de la fonction uploadFileToStorage pour une utilisation dans d'autres modules
module.exports = { uploadFileToStorage };
