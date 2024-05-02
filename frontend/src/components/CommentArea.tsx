import React, { useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
interface IComment {
  disabled?: boolean;
  nickname: string;
  question_id: string;
  today: string;
}
const CommentArea = ({ disabled, nickname, question_id, today }: IComment) => {
  const [answer, setAnswer] = useState("");

  async function postAnswer() {
    const userQuestion = {
      content: answer,
      author_nickname: nickname,
      question_id: question_id,
      date: today,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qna/addAnswer/`,
        {
          method: "POST",
          body: JSON.stringify(userQuestion),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("질문 등록 완료");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Textarea
        label="답변"
        placeholder={
          disabled ? "답변을 입력하시려면 닉네임 설정을 하세요." : "답변 입력"
        }
        disabled={disabled}
        onChange={(e) => setAnswer((prev) => e.target.value)}
      />
      <Button
        color="primary"
        variant="ghost"
        className="mt-3"
        isDisabled={disabled}
        onClick={postAnswer}
      >
        답변 입력
      </Button>
    </div>
  );
};

export default CommentArea;
