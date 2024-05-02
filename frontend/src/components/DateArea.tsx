"use client";
import React from "react";
import { useDateInfo } from "@/app/providers";
import { Input } from "@nextui-org/react";

const DateArea = () => {
  const { searchDate, setSearchDate, today } = useDateInfo();

  return (
    <div>
      <h1 className="text-4xl font-semibold">{searchDate}</h1>
      <Input
        label="Date"
        placeholder="Enter your date"
        type="date"
        className="w-36"
        value={searchDate}
        max={today}
        onChange={(e) => {
          setSearchDate(e.target.value);
        }}
      />
    </div>
  );
};

export default DateArea;
