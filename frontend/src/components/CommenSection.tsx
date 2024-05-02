import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import VoteupButton from "./VoteupButton";
import { format } from "date-fns";

interface IAnswer {
  upvotes: number;
  created_at: string;
  content: string;
  author_nickname: string;
  answer_id: string;
}

interface IProps {
  answers: IAnswer[];
  question_id: string;
  today: string;
}

const CommentSection: React.FC<IProps> = ({ answers, question_id, today }) => {
  return (
    <>
      {answers.map((content: IAnswer, index: number) => (
        <Card
          key={content.answer_id}
          shadow="none"
          className="bg-slate-200 mb-5"
        >
          <CardBody>
            <div className="flex flex-col gap-3 py-5 px-3">
              <div className="flex flex-row items-center gap-3">
                <p className="text-blue-600">{content.author_nickname}</p>
                <VoteupButton
                  voteNumber={content.upvotes}
                  voteType="answer"
                  answer_id={content.answer_id}
                  question_id={question_id}
                  today={today}
                />
                <p>
                  {format(new Date(content.created_at), "yyyy-MM-dd HH:mm:ss")}
                </p>
              </div>
              <p>{content.content}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default CommentSection;
