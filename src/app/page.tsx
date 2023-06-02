import StoryCard from '@/components/storyCard';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section>
        <h2 className='display-3'>Top News</h2>
        {Array.from({ length: 6 }).map((_, idx) => (
          <StoryCard
            key={idx}
            header='NBA'
            title="Miami Heat Proving They're Built Perfectly Around Jimmy Butler"
            text="Miami's role players continue to show up when it matters most"
            author='Andy Bailey'
          ></StoryCard>
        ))}
      </section>
      <section className='my-5'>
        <h2 className='display-4 text-center mb-4'>NBA</h2>

        <Image
          src='https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_0.94,x_0.00,y_0.00/v1684698042/xqrtq76paiki9z2uksdu.jpg'
          alt='kyrie irving winding up to take a shot'
          width={300}
          height={300}
        ></Image>

        <Link href='#'>
          <h3>NBA Insiders Dish on Mav's Future</h3>
        </Link>
        <Link href='#'>
          <p>Will Mav's shell out to keep Kyrie?</p>
        </Link>

        <Link href='#'>
          <h3>MOST AWKWARD SUPERSTAR FITS IN THE NBA 🤨</h3>
        </Link>
        <Link href='#'>
          <p>
            Five teams who&apos;s stars don&apos;t compliment each other the way
            they should 📲
          </p>
        </Link>

        <Image
          src='https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_1.00,x_0.00,y_0.00/v1684766053/bnybaevfj6dqunrhh3h9.jpg'
          alt='kyrie irving winding up to take a shot'
          width={300}
          height={300}
        ></Image>
      </section>
      <section>
        <h2 className='display-4'>NFL</h2>
      </section>
      <section>
        <h2 className='display-4'>MLB</h2>
      </section>
      <section>
        <h2 className='display-4'>NHL</h2>
      </section>
    </>
  );
}
