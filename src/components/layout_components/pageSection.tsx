import { ArticleData } from '@/lib/getAPIArticleData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PageSectionType = {
  header: string;
  stories: ArticleData[] | undefined;
};

const PageSection = (props: PageSectionType) => {
  return (
    <section className='my-5'>
      <Link href={`/${props.header}`}>
        <h2 className='text-5xl font-bold uppercase text-center mb-4'>
          {props.header}
        </h2>
      </Link>
      <div className='flex flex-col items-center gap-y-5'>
        {props.stories?.map((item, index) => (
          <>
            {index === 0 ? (
              <div className='flex flex-col md:flex-row items-center'>
                <div>
                  <Image
                    src={item.image_url}
                    // src='https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_0.94,x_0.00,y_0.00/v1684698042/xqrtq76paiki9z2uksdu.jpg'
                    alt=''
                    width={500}
                    height={500}
                    style={{ height: 'auto', width: 'auto' }}
                  ></Image>
                </div>
                <div className='flex flex-col p-4'>
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    <h3>{item.title}</h3>
                  </Link>
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    {/* <p>Will Mavs shell out to keep Kyrie?</p> */}
                  </Link>
                </div>
              </div>
            ) : (
              <div className='flex flex-col md:flex-row-reverse items-center'>
                <div>
                  <Image
                    // src='https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_1.00,x_0.00,y_0.00/v1684766053/bnybaevfj6dqunrhh3h9.jpg'
                    src={item.image_url}
                    alt=''
                    width={500}
                    height={500}
                    style={{ height: 'auto', width: 'auto' }}
                  ></Image>
                </div>
                <div className='flex flex-col p-4'>
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    <h3>{item.title}</h3>
                  </Link>
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    {/* <p>
                    Five teams who&apos;s stars don&apos;t compliment each other
                    the way they should 📲
                  </p> */}
                  </Link>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default PageSection;
