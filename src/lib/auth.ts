
'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore"; 

export async function signUpWithEmail(email, password, fullName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create a document in the 'users' collection
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      is_admin: false, // Default role is not admin
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error: error };
  }
}

export async function signInWithEmail(email, password, role) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    
    // Check user role from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        const isAdmin = userData.is_admin === true;

        if (role === 'admin' && !isAdmin) {
            await signOut(auth);
            return { user: null, error: { message: "Access Denied. You are not an administrator." } };
        }

        if (role === 'student' && isAdmin) {
            await signOut(auth);
            return { user: null, error: { message: "Admin accounts cannot log in as students. Please use the 'Admin' option." } };
        }
        
        // Return user and determined role for redirection
        return { user, error: null, role: isAdmin ? 'admin' : 'student' };

    } else {
        // If user doc doesn't exist, they can't log in.
        await signOut(auth);
        return { user: null, error: { message: "User profile not found. Please contact support." } };
    }

  } catch (error) {
    return { user: null, error: error, role: null };
  }
}

export async function signOutFromApp() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error };
  }
}
