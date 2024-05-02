import QuestionArea from "@/components/QuestionArea";
import DateArea from "@/components/DateArea";
import QnaSection from "@/components/QnaSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 gap-10">
      <div className="sticky top-0 bg-white z-50">
        <div className="flex flex-row gap-2 justify-between">
          <DateArea />
          <QuestionArea />
        </div>
      </div>

      <QnaSection />
    </main>
  );
}
