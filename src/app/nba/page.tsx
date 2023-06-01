import Image from 'next/image';
export default function NBA() {
  return (
    <div className='d-flex flex-column mt-4 align-items-center'>
      <Image
        src='https://cdn.bleacherreport.net/images/team_logos/328x328/nba.png'
        alt='NBA logo'
        width={80}
        height={80}
      ></Image>
      <h2>NBA</h2>
    </div>
  );
}
