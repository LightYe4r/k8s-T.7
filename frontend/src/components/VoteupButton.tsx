import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { MdOutlineThumbUpAlt } from "react-icons/md";

interface IVoteButton {
  voteType: "question" | "answer";
  voteNumber: number;
  today: string;
  question_id: string;
  answer_id?: string;
}

const VoteupButton = ({
  voteType,
  voteNumber,
  today,
  question_id,
  answer_id,
}: IVoteButton) => {
  const [number, setNumber] = useState(voteNumber);
  async function clickVote() {
    const upQuestion = {
      date: today,
      question_id: question_id,
    };
    const upAnswer = {
      date: today,
      question_id: question_id,
      answer_id: answer_id,
    };

    try {
      const res = await fetch(
        voteType === "question"
          ? `${process.env.NEXT_PUBLIC_API_URL}/qna/addQuestionVote/`
          : `${process.env.NEXT_PUBLIC_API_URL}/qna/addAnswerVote/`,
        {
          method: "POST",
          body: JSON.stringify(voteType === "question" ? upQuestion : upAnswer),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        setNumber(number + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button
      color="primary"
      variant="bordered"
      startContent={<MdOutlineThumbUpAlt />}
      size="sm"
      className="w-32"
      onClick={clickVote}
    >
      {number}
    </Button>
  );
};

export default VoteupButton;
