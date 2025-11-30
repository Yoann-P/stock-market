import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Déclare un cache global pour éviter que Next.js recrée une connexion MongoDB
// à chaque rechargement ou rerender en mode développement.
// Sans ce cache, chaque hot reload ouvrirait une nouvelle connexion !
declare global {
    var mongooseCache: {
        conn: typeof mongoose | null,
        promise: Promise<typeof mongoose> | null
    }
}

// On récupère le cache global existant, ou on l'initialise s'il n'existe pas.
let cached = global.mongooseCache

if (!cached) {
    // Première initialisation du cache (évite les doublons lors des reloads)
    cached = global.mongooseCache = { conn: null, promise: null }
}

export const connectToDatabase = async () => {

    // Vérifie que l’URI MongoDB est bien fournie
    if (!MONGODB_URI) {
        throw new Error("Please provide a valid MongoDB URI in the environment variables");
    }

    // Si une connexion existe déjà dans le cache, on la réutilise immédiatement.
    // -> Très important pour éviter les connexions multiples en mode dev !
    if (cached.conn) return cached.conn;

    // Si aucune connexion n'est encore en cours, on crée une nouvelle promesse
    if (!cached.promise) {
        // bufferCommands:false empêche Mongoose d'empiler des commandes quand non connecté
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }

    try {
        // On attend la connexion en utilisant la promesse stockée
        cached.conn = await cached.promise;
    } catch (e) {
        // Si la connexion échoue, on réinitialise la promesse pour permettre un retry propre
        cached.promise = null;
        throw e;
    }

    console.log(`Connected to Database ${process.env.NODE_ENV} - ${MONGODB_URI}`);
}

/*
-----------------------------------------------------------
Résumé :
Cette fonction met en place un système de cache global pour la connexion MongoDB.
Ce mécanisme est essentiel en mode développement avec Next.js, car chaque hot reload relance le code — sans cache, cela ouvrirait plusieurs connexions simultanées à MongoDB et saturerait le serveur.
Le cache garantit donc qu'une seule connexion persistante est utilisée, évitant les duplications.
-----------------------------------------------------------
*/
