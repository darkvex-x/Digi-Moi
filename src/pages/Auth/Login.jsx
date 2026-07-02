import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../firebase";
import Button from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const existingUser = await getDoc(userRef);

      if (!existingUser.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          createdAt: serverTimestamp(),
        });
      } else {
        await setDoc(
          userRef,
          {
            uid: user.uid,
            displayName:
              user.displayName || existingUser.data().displayName || "",
            email: user.email || existingUser.data().email || "",
            photoURL: user.photoURL || existingUser.data().photoURL || "",
          },
          { merge: true },
        );
      }

      addToast({
        type: "success",
        title: "Signed In",
        message: "Welcome to Happy Pocket.",
      });
      navigate("/");
    } catch (error) {
      addToast({
        type: "error",
        title: "Google Sign-In Failed",
        message: error.message || "Unable to sign in with Google.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-[var(--card)] p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue managing your wedding events.
          </p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
