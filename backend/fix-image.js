require("dotenv").config();
const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./firebase-adminsdk.json";
const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

async function fixImage() {
  const snapshot = await db.collection("products").where("name", "==", "Merino Wool Sweater").get();
  
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }  

  for (const doc of snapshot.docs) {
    await doc.ref.update({
      imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"
    });
    console.log(`Updated image for ${doc.id}`);
  }
}

fixImage().then(() => process.exit(0)).catch(console.error);
