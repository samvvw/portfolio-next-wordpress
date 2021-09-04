import admin from 'firebase-admin';

// if (!admin.apps.length) {
try {
    admin.initializeApp({
        credential: admin.credential.cert(
            JSON.parse(process.env.FIREBASE_API_KEY as string)
        ),
    });
} catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}
// }

console.log(admin.apps.length, '<--');

export const db = admin.firestore();
