// Importation des modules nécessaires
const multer = require("multer");
const { format } = require("date-fns");

// Création d'une instance multer avec un stockage en mémoire
const upload = multer({ storage: multer.memoryStorage() });

// Fonction middleware pour gérer les téléchargements de fichiers
const handleFileUploads = async (req, res, next) => {
  // Utilisation de la méthode 'fields' de multer pour gérer les téléchargements de fichiers multiples
  await upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 2 },
  ])(req, res, async (err) => {
    // Vérification des erreurs lors du téléchargement du fichier
    if (err) {
      return res.status(400).json({ error: "Erreur de téléchargement de fichier" });
    }

    // Extraction du titre du produit et formatage de la date
    const { title } = req.body;
    const formattedDate = format(Date.now(), "yyyy-MM-dd'_'HH:mm");

    try {
      // Stockage des détails du produit dans l'objet de requête pour une utilisation ultérieure
      req.productDetails = { title, formattedDate };

      // Passez au prochain middleware ou gestionnaire de route
      next();
    } catch (error) {
      // Gestion des erreurs qui peuvent survenir pendant le traitement du fichier
      console.error("Erreur lors du traitement des fichiers :", error);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });
};

// Exportation de la fonction middleware pour une utilisation dans d'autres fichiers
module.exports = { handleFileUploads };
