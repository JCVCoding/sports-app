import { StaticImageData } from 'next/image';
import { escape } from 'querystring';

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
};

export const createTodaysDate = (): string => {
  const today = new Date();
  const currentMonth =
    today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
  const currentDate =
    today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  const todayQuery =
    today.getFullYear() + '-' + currentMonth + '-' + currentDate;
  return todayQuery;
};

export const createURLQuery = (
  date: string,
  search: string,
  topStories: boolean
): string => {
  if (!process.env.NEWS_API_KEY) {
    throw new Error('Invalid/Missing environment variable: "NEWS_API_KEY"');
  }

  const url = topStories
    ? 'https://api.thenewsapi.com/v1/news/top?'
    : 'https://api.thenewsapi.com/v1/news/all?';
  const params: QueryParams = {
    api_token: process.env.NEWS_API_KEY,
    categories: 'sports',
    locale: 'us',
    language: 'en',
    search: search,
    search_fields: 'title,description,keywords,main_text',
    published_on: date,
    domains: 'bleacherreport.com',
  };
  const query = Object.keys(params)
    .map((param) => {
      return escape(param) + '=' + escape(params[param]);
    })
    .join('&');
  return url + query;
};
