import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PageSectionType = {
  header: string;
  stories: any;
};

const PageSection = (props: PageSectionType) => {
  return (
    <section className='my-5'>
      <h2 className='text-5xl font-bold uppercase text-center mb-4'>
        {props.header}
      </h2>
      <div className='flex flex-col items-center gap-y-5'>
        {props.stories?.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
        <div className='flex flex-grow flex-col md:flex-row items-center w-full'>
          <Image
            src='https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_0.94,x_0.00,y_0.00/v1684698042/xqrtq76paiki9z2uksdu.jpg'
            alt='kyrie irving winding up to take a shot'
            width={300}
            height={300}
          ></Image>
          <div className='flex flex-col p-4'>
            <Link href='#'>
              <h3>NBA Insiders Dish on Mavs Future</h3>
            </Link>
            <Link href='#'>
              <p>Will Mavs shell out to keep Kyrie?</p>
            </Link>
          </div>
        </div>
        <div className='flex flex-col md:flex-row-reverse items-center'>
          <div className='basis-1/3'>
            <Image
              src='https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_1.00,x_0.00,y_0.00/v1684766053/bnybaevfj6dqunrhh3h9.jpg'
              alt='kyrie irving winding up to take a shot'
              width={300}
              height={300}
            ></Image>
          </div>
          <div className='flex flex-col p-4 basis-2/3'>
            <Link href='#'>
              <h3>MOST AWKWARD SUPERSTAR FITS IN THE NBA 🤨</h3>
            </Link>
            <Link href='#'>
              <p>
                Five teams who&apos;s stars don&apos;t compliment each other the
                way they should 📲
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageSection;
