"use client"
import Container from "react-bootstrap/Container";
export default function NBALayout({children}: {children: React.ReactNode}) {
  return <Container>{children}</Container>;
}
