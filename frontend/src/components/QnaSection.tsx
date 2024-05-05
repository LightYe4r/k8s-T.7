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
  image: string | null; // 이미지가 null일 수 있음을 명시
}

const QnaSection = () => {
  const [qnaList, setQnaList] = useState<IQuestion[]>([]);
  const { nickname, isNickname } = useNickname();
  const { searchDate, today } = useDateInfo();
  const [modalImage, setModalImage] = useState<string | null>(null); // 모달에 표시할 이미지 주소를 저장하는 state

  // 이미지 클릭 시 모달 열기 함수
  const openModal = (imageUrl: string | null) => {
    if (imageUrl) {
      setModalImage(imageUrl);
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalImage(null);
  };

  async function getQnaData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qna/questions/?date=${searchDate}`
      );
      const qnaData = await response.json();
      console.log(qnaData);

      // Base64 이미지 디코딩
      const qnaListWithImages = qnaData.questions.map((question: IQuestion) => {
        // 이미지가 null이 아닐 때만 디코딩
        if (question.image) {
          return {
            ...question,
            // 이미지 Base64 디코딩
            image: `data:image/png;base64,${question.image}`,
          };
        }
        return question;
      });

      setQnaList(qnaListWithImages);
    } catch (error) {
      throw new Error("Please check your server"); // 오류를 throw하도록 수정
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
            aria-label={`Question ${question.question_id}`}
            title={
              <div className="flex flex-row justify-between">
                <div>
                  <p>{question.title}</p>
                  {question.image && (
                    <img
                      src={question.image} // 이미지가 null이 아닐 때만 이미지 표시
                      alt="Question Image"
                      style={{ maxWidth: "100px", maxHeight: "100px", cursor: "pointer" }} // Adjust size as needed
                      onClick={() => openModal(question.image)} // 이미지 클릭 시 모달 열기
                    />
                  )}
                </div>
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

      {/* 이미지를 표시할 모달 팝업 */}
      {modalImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {/* 모달에 이미지 표시 */}
            <img src={modalImage} alt="Question Image" />
          </div>
        </div>
      )}
    </>
  );
};

export default QnaSection;
