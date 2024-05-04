import React, { useState, useEffect } from "react";
import {
  Button,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useDateInfo, useNickname } from "@/app/providers";

const QuestionArea = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<
    { file: File; url: string }[]
  >([]);
  const { today } = useDateInfo();
  const { nickname, isNickname } = useNickname();

  useEffect(() => {
    return () => {
      imagePreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  async function postQuestion() {
    const base64Images = await Promise.all(images.map(async (image) => {
      const base64String = await convertImageToBase64(image);
      return base64String;
    }));

    const userQuestion = {
      title: question,
      author_nickname: nickname,
      date: today,
      images: base64Images,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qna/addQuestion/`,
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
        setQuestion("");
        setImages([]);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: File[] = Array.from(files);
      setImages((prevImages) => [...prevImages, ...newImages]);
      const newImagePreviews = newImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newImagePreviews,
      ]);
    }
  };

  const convertImageToBase64 = (image: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to convert image to Base64."));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(image);
    });
  };

  return (
    <>
      <Button
        color="primary"
        variant="ghost"
        disabled={isNickname}
        onClick={onOpen}
      >
        질문하기
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">질문</ModalHeader>
          <ModalBody>
            <Textarea
              autoFocus
              label="Question"
              placeholder="질문을 입력하세요"
              variant="bordered"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <div
              className="image-previews"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {imagePreviews.map(({ url }, index) => (
                <div
                  className="image-preview"
                  key={index}
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    margin: "5px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              닫기
            </Button>
            <Button color="primary" onClick={postQuestion}>
              등록
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionArea;
