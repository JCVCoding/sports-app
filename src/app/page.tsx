"use client";
import StoryCard from "@/components/storyCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
// import Image from "next/image";
import Image from "react-bootstrap/Image";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <section>
        <h2 className="display-3">Top News</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Col key={idx}>
              <StoryCard
                header="NBA"
                title="Miami Heat Proving They're Built Perfectly Around Jimmy Butler"
                text="Miami's role players continue to show up when it matters most"
                author="Andy Bailey"
              ></StoryCard>
            </Col>
          ))}
        </Row>
      </section>
      <section className="my-5">
        <h2 className="display-4 text-center mb-4">NBA</h2>
        <Row className="align-items-center mb-4">
          <Col>
            <Image
              src="https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_0.94,x_0.00,y_0.00/v1684698042/xqrtq76paiki9z2uksdu.jpg"
              alt="kyrie irving winding up to take a shot"
              fluid
            ></Image>
          </Col>
          <Col>
            <Link href="#">
              <h3>NBA Insiders Dish on Mavs Future</h3>
            </Link>
            <Link href="#">
              <p>Will Mavs shell out to keep Kyrie?</p>
            </Link>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col>
            <Link href="#">
              <h3>MOST AWKWARD SUPERSTAR FITS IN THE NBA 🤨</h3>
            </Link>
            <Link href="#">
              <p>
                Five teams who's stars don't compliment each other the way they
                should 📲
              </p>
            </Link>
          </Col>
          <Col>
            <Image
              src="https://media.bleacherreport.com/image/upload/c_crop,h_1.00,w_1.00,x_0.00,y_0.00/v1684766053/bnybaevfj6dqunrhh3h9.jpg"
              alt="kyrie irving winding up to take a shot"
              fluid
            ></Image>
          </Col>
        </Row>
      </section>
      <section>
        <h2 className="display-4">NFL</h2>
      </section>
      <section>
        <h2 className="display-4">MLB</h2>
      </section>
      <section>
        <h2 className="display-4">NHL</h2>
      </section>
    </Container>
  );
}
