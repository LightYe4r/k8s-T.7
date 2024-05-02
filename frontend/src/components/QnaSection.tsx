"use client";
import { Accordion, AccordionItem, Chip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CommenSection from "./CommenSection";
import VoteupButton from "./VoteupButton";
import CommentArea from "./CommentArea";
import { useDateInfo, useNickname } from "@/app/providers";
import { MdOutlineThumbUpAlt } from "react-icons/md";

interface IQuestion {
  question_id: string;
  title: string;
  author_nickname: string;
  created_at: string;
  upvotes: number;
  answers: {
    answer_id: string;
    author_nickname: string;
    created_at: string;
    content: string;
    upvotes: number;
  }[];
}
const QnaSection = () => {
  const [qnaList, setQnaList] = useState<IQuestion[]>([]);
  const { nickname, isNickname } = useNickname();
  const { searchDate, today } = useDateInfo();

  async function getQnaData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qna/questions/?date=${searchDate}`
      );
      const qnaData = await response.json();
      console.log(qnaData);
      setQnaList(qnaData.questions);
    } catch (error) {
      return "Please check your server";
    }
  }

  useEffect(() => {
    getQnaData();
  }, [searchDate]);
  return (
    <>
      <Accordion selectionMode="multiple">
        {qnaList.map((question) => (
          <AccordionItem
            key={question.question_id}
            aria-label="Question 1"
            title={
              <div className="flex flex-row justify-between">
                <p>{question.title}</p>
                <div className="flex flex-row gap-3">
                  <Chip color="warning" variant="flat">
                    {question.author_nickname}
                  </Chip>
                  <Chip
                    startContent={
                      <MdOutlineThumbUpAlt size={12} className="mx-2" />
                    }
                    variant="flat"
                    color="secondary"
                  >
                    {question.upvotes}
                  </Chip>
                </div>
              </div>
            }
          >
            <div className="flex flex-col gap-10">
              <VoteupButton
                voteNumber={question.upvotes}
                voteType="question"
                question_id={question.question_id}
                today={today}
              />
              <CommentArea
                disabled={isNickname}
                question_id={question.question_id}
                nickname={nickname}
                today={today}
              />
              <CommenSection
                answers={question.answers}
                question_id={question.question_id}
                today={today}
              />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default QnaSection;
