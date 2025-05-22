import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("✅ 로그인 성공:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("❌ 로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white space-y-6">
      <h1 className="text-4xl font-bold">🌙 해몽이</h1>
      <button
        onClick={handleLogin}
        className="bg-white text-black px-6 py-3 rounded-lg shadow hover:bg-gray-200"
      >
        Google로 로그인
      </button>
    </div>
  );
}
