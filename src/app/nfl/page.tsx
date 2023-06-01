import Image from 'next/image';
export default function NFL() {
  return (
    <div className='d-flex flex-column mt-4 align-items-center'>
      <Image
        src='https://cdn.bleacherreport.net/images/team_logos/328x328/nfl.png'
        alt='NBA logo'
        width={80}
        height={80}
      ></Image>
      <h2>NFL</h2>
    </div>
  );
}
