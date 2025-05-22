import { useState } from "react";
import Textarea from "../components/textarea";
import Button from "../components/button";
import { Card, CardContent } from "../components/card";
import { Loader2 } from "lucide-react";
import "../main.css";

import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showDreams, setShowDreams] = useState(false);
  const [dreams, setDreams] = useState([]);

  const handleInterpret = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "당신은 해몽 전문가입니다. 사용자의 꿈 내용을 읽고 아래 포맷에 맞춰 해석하세요. 모든 응답은 한국어로 작성하세요.\n\n키워드: ...\n감정: ...\n해석: ...\n조언: ...",
            },
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) {
        console.error("GPT 응답 오류:", data);
        alert("GPT 응답에 문제가 있습니다.");
        return;
      }

      const raw = data.choices[0].message.content;
      const lines = raw.split("\n").filter((line) => line.includes(":"));
      const parsed = Object.fromEntries(
        lines.map((line) => {
          const [key, ...rest] = line.split(":");
          return [key.trim(), rest.join(":").trim()];
        })
      );

      console.log("GPT 응답 결과:", parsed);

      const resultObj = {
        keywords: parsed["키워드"]
          ? parsed["키워드"].split(",").map((k) => k.trim())
          : [],
        emotion: parsed["감정"] ?? "",
        interpretation: parsed["해석"] ?? "",
        advice: parsed["조언"] ?? "",
      };

      setResult(resultObj);

      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "dreams"), {
          userId: user.uid,
          dream: input,
          ...resultObj,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
      alert("GPT 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDreamList = async () => {
    const user = auth.currentUser;

    if (!showDreams && user) {
      const q = query(
        collection(db, "dreams"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDreams(data);
    }
    if (showDreams) {
      setInput("");
      setResult(null);
      setLoading(false);
    }
    setShowDreams(!showDreams);
  };

  const deleteDream = async (id) => {
    await deleteDoc(doc(db, "dreams", id));
    setDreams(dreams.filter((d) => d.id !== id));
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6 mt-40 space-y-6">
      <div className="flex justify-between items-center absolute top-6 left-0 right-0 px-6 z-10">
        <h1 className="fixed top-14 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white z-10">
          🌙 해몽이
        </h1>
        <button
          onClick={toggleDreamList}
          className="absolute right-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-1.5 rounded shadow-md hover:opacity-90 transition"
        >
          {showDreams ? "꿈 작성으로 돌아가기" : "내 꿈 저장소"}
        </button>
      </div>

      {!showDreams && (
        <>
          <Card>
            <CardContent className="p-4 space-y-4">
              <Textarea
                rows={5}
                placeholder="꿈 내용을 입력해주세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="text-base"
              />
              {loading ? (
                <Button disabled className="w-full flex items-center justify-center">
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  해석 중...
                </Button>
              ) : (
                <Button onClick={handleInterpret} className="w-full">
                  AI 해몽하기
                </Button>
              )}
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-blue-50 ">
              <CardContent className="p-4 space-y-2">
                <p>
                  <strong>🔑 키워드:</strong> {result.keywords.join(", ")}
                </p>
                <p>
                  <strong>💬 감정 분석:</strong> {result.emotion}
                </p>
                <p>
                  <strong>🧠 해석:</strong> {result.interpretation}
                </p>
                <p>
                  <strong>🌟 조언:</strong> {result.advice}
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {showDreams && (
        <div className="space-y-4 pt-12">
          {dreams.map((d) => (
            <Card key={d.id} className="bg-white text-black relative">
              <CardContent className="p-4 space-y-2">
                <button
                  onClick={() => deleteDream(d.id)}
                  className="absolute top-2 right-4 text-sm text-red-500 hover:underline"
                >
                  삭제
                </button>
                <p className="text-sm text-gray-500">
                  📅 저장일: {d.createdAt?.toDate().toLocaleDateString("ko-KR")}
                </p>
                <p>
                  <strong>📝 꿈:</strong> {d.dream}
                </p>
                <p>
                  <strong>🔑 키워드:</strong> {d.keywords?.join(", ")}
                </p>
                <p>
                  <strong>💬 감정분석:</strong> {d.emotion}
                </p>
                <p>
                  <strong>🧠 해석:</strong> {d.interpretation}
                </p>
                <p>
                  <strong>🌟 조언:</strong> {d.advice}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
