import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
// import toast from "react-hot-toast";
import { LogIn, SignUp, auth, db, provider } from "../../db/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import Upload from "../../db/upload";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    const imgUrl = await Upload(avatar.file);
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!");
    try {
      if (!username || !email || !password)
        return toast.warn("Please enter inputs!");
      const res = await SignUp(email, password);
      const docRef = doc(db, "users", res.user.uid);
      const payload = {
        id: res.user.uid,
        username,
        email,
        avatar: imgUrl,
        blocked: [],
      };
      await setDoc(docRef, payload);

      await setDoc(doc(db, "chatUser", res.user.uid), {
        chats: [],
      });
      toast.success("Accounted created successfully");
      console.log("Account created successfully");
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred";
      toast.error(errorMessage);
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await LogIn(email, password);
      toast.success("Logged In successfully.");
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred";
      toast.error(errorMessage);
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const docRef = doc(db, "users", res.user.uid);
      const payload = {
        id: res.user.uid,
        username: res.user.displayName,
        email: res.user.email,
        avatar: res.user.photoURL,
        blocked: [],
      };
      await setDoc(docRef, payload);

      await setDoc(doc(db, "chatUser", res.user.uid), {
        chats: [],
      });
      toast.success("Logged In successfully.");
      console.log("Logged In successfully.");
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };
  return (
    <div className="login">
      <div className="images">
        <img className="last-img" src="/chat.png" alt="" />
        <img
          className="logo-img"
          src="https://th.bing.com/th/id/R.0c033ff47449ad26c2c1b79e48ee9d59?rik=8hCCD5JbHoUxVg&pid=ImgRaw&r=0"
          alt=""
        />
      </div>
      {login ? (
        <div className="item">
          <h2 className="title">Welcome back</h2>
          <button
            type="button"
            className="login-with-google-btn"
            onClick={handleGoogleSignUp}
          >
            Sign in with Google
          </button>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button disabled={loading}>Sign In</button>
          </form>
          <p>
            Need an account?
            <span onClick={() => setLogin(false)}> Sign UP</span>
          </p>
        </div>
      ) : (
        <div className="item">
          <h2 className="title">Create an Account</h2>
          <form onSubmit={handleSignUp}>
            <label htmlFor="file" className="pro">
              <img
                src={
                  avatar.url ||
                  "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
                }
                alt=""
              />
              Profile
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none", margin: "0 auto" }}
              onChange={handleAvatar}
            />
            <input type="text" placeholder="Username" name="username" />
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button disabled={loading}>
              {loading ? "Loading" : "Sign Up"}
            </button>
          </form>
          <p onClick={() => setLogin(true)}>
            go back to <span>Sign in</span> Page
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;