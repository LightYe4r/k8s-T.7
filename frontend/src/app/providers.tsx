"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, createContext, useContext, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

type UserContextType = {
  nickname: string;
  setNickname: (nickname: string) => void;
  isNickname: boolean;
};

export const UserContext = createContext<UserContextType>({
  nickname: "",
  setNickname: () => {},
  isNickname: false,
});

export const useNickname = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nickname, setNickname] = useState<string>("");
  const isNickname = nickname === "";
  console.log(isNickname);

  function saveNickname(name: string) {
    setNickname(name);
  }

  return (
    <UserContext.Provider
      value={{ nickname, setNickname: saveNickname, isNickname }}
    >
      {children}
    </UserContext.Provider>
  );
};

type DateContextType = {
  today: string;
  searchDate: string;
  setSearchDate: (sDate: string) => void;
};

export const DateContext = createContext<DateContextType>({
  today: "",
  searchDate: "",
  setSearchDate: () => {},
});

export const useDateInfo = () => useContext(DateContext);

export const DateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 오늘 날짜 가져오기
  let mainDate = new Date();
  // 시차 간격 가져오기
  const offset = mainDate.getTimezoneOffset();
  // 시차 적용

  mainDate = new Date(mainDate.getTime() - offset * 60 * 1000);
  const today = mainDate.toISOString().split("T")[0];
  const [searchDate, setSearchDate] = useState(today);

  return (
    <DateContext.Provider value={{ searchDate, setSearchDate, today }}>
      {children}
    </DateContext.Provider>
  );
};
