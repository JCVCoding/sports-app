"use client";
import Link from "next/link";

import Card from "react-bootstrap/Card";

interface StoryCardProps {
  header: string;
  title: string;
  text: string;
  author: string;
}

const StoryCard = (props: StoryCardProps) => {
  return (
    <Card text="dark">
      <Card.Header>{props.header}</Card.Header>
      <Card.Body>
        <Link href="#">
          <Card.Title>{props.title}</Card.Title>
        </Link>
        <Link href="#">
          <Card.Text>{props.text}</Card.Text>
        </Link>
        <Card.Text>by {props.author}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StoryCard;
