"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useNickname } from "@/app/providers";

const NicknameButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { nickname, setNickname, isNickname } = useNickname();
  const [name, setName] = useState("");

  useEffect(() => {
    let n = localStorage.getItem("nickname");
    if (n) {
      setNickname(n);
    }
  }, []);

  function saveName() {
    if (name) {
      localStorage.setItem("nickname", name);
      setNickname(name);
    }
  }

  return (
    <>
      {isNickname ? (
        <Button onPress={onOpen} color="primary" href="#" variant="flat">
          질문하기
        </Button>
      ) : (
        <Chip size="lg" color="primary" variant="flat">
          닉네임 {nickname}
        </Chip>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                접속하기
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Nickname"
                  placeholder="닉네임을 입력해주세요"
                  variant="bordered"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={saveName} onPress={onClose}>
                  접속
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NicknameButton;
