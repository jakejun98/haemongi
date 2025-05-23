import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmotionChart({ data }) {

  
  const filtered = Object.entries(data).filter(([_, value]) => value > 0);

  if (filtered.length === 0) return null;
  
  const labels = filtered.map(([label]) => label);
  const values = filtered.map(([_, value]) => value);
  
  console.log(labels)
  console.log(values)

  const colors = {
    "불안": "#f87171",
    "기쁨": "#60a5fa",
    "슬픔": "#a78bfa",
    "분노": "#facc15",
    "혼란": "#fb923c",
    "평온": "#34d399"
  };

  const backgroundColor = labels.map(label => colors[label] || "#ccc");


  return (
    <div className="w-[240px] mx-auto bg-white p-4 rounded-xl shadow-sm border mb-4">
      <h2 className="text-lg font-semibold mb-2 text-center">감정 통계</h2>
      <Pie
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor,
              borderColor: "#fff",
              borderWidth: 2
            },
          ],
        }}
        options={{
            plugins: {
              legend: {
                position: "bottom"
              }
            }
          }}
      />
    </div>
  );
}
