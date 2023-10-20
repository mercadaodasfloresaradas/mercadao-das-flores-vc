import React from "react";

export default function FormatDate(props: {
  date: Date;
  isOnlyText?: boolean;
}): string | React.ReactNode {
  const { date, isOnlyText = false } = props;

  const result: string = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return isOnlyText ? result : <p>{result}</p>;
}
