import { StaticImageData } from "next/image";

type QueryParams = {
  api_token: string;
  categories: string;
  locale: string;
  language: string;
  search: string;
  search_fields: string;
  published_on: string;
  domains?: string;
};

export type ArticleData = {
  uuid: string;
  description: string;
  image_url: string | StaticImageData;
  source: string;
  title: string;
  image_alt: string;
};

export const createTodaysDate = (): string => {
  const today = new Date();
  const currentMonth =
    today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const currentDate =
    today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const todayQuery =
    today.getFullYear() + "-" + currentMonth + "-" + currentDate;
  return todayQuery;
};
