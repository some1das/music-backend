const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require("./serviceAccountKey.json");

exports.getBucket = () => {
  //   console.log(JSON.parse(process.env.STORAGE_KEY));
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "suman-fire.appspot.com",
  });

  const bucket = getStorage().bucket();
  return bucket;
};

// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.
