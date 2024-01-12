// Importation de la fonction uploadFileToStorage depuis la configuration Firebase
const { uploadFileToStorage } = require("../config/firebase");

// Importation du modèle Product
const Product = require("../models/productModel");

// Fonction du contrôleur pour créer un nouveau produit
exports.createProduct = async (req, res) => {
  // Extraction du titre du produit et de la date formatée de l'objet de requête
  const { title, formattedDate } = req.productDetails;

  try {
    // Création d'un nouveau produit dans la base de données
    const product = await Product.create({ title });

    // Récupération de l'ID du produit généré
    const productId = product._id;
    console.log("1");

    // Téléchargement de l'image de couverture vers Firebase Storage
    const imageCoverUrl = await uploadFileToStorage(
      req.files.imageCover[0],
      `products/${productId}/${req.files.imageCover[0].originalname}--${formattedDate}`
    );
    console.log("2");

    // Téléchargement de plusieurs images vers Firebase Storage
    const imagesUrls = await Promise.all(
      req.files.images.map(async (file) =>
        uploadFileToStorage(
          file,
          `products/${productId}/listImages/${file.originalname}--${formattedDate}`
        )
      )
    );

    // Attribution des URL d'image au produit
    product.imageCover = imageCoverUrl;
    product.images = imagesUrls;

    // Enregistrement du produit avec les informations mises à jour
    await product.save();

    // Envoi d'une réponse de réussite au client
    res
      .status(201)
      .json({ message: "Produit créé avec succès", data: product });
  } catch (error) {
    // Gestion des erreurs pouvant survenir lors de la création du produit
    console.error("Erreur lors de la création du produit :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
