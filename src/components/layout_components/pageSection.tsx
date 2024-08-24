import { ArticleData } from "@/lib/getAPIArticleData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type PageSectionType = {
  header: string;
  stories: ArticleData[] | undefined;
};

const PageSection = (props: PageSectionType) => {
  return (
    <section className="my-5">
      <Link href={`/${props.header}`}>
        <h2 className="text-5xl font-bold uppercase text-center mb-4">
          {props.header}
        </h2>
      </Link>
      <div className="py-5">
        {props.stories?.map((item, index) => (
          <>
            {index === 0 ? (
              <div className="grid md:grid-cols-2 items-center mb-8">
                <div className="relative">
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    <Image
                      src={item.image_url}
                      alt={item.image_alt}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto"
                    ></Image>
                  </Link>
                </div>
                <div className="flex flex-col p-4">
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    <h3 className="md:text-lg lg:text-xl">{item.title}</h3>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 items-center">
                <div className="relative">
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    <Image
                      src={item.image_url}
                      alt={item.image_alt}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto"
                    ></Image>
                  </Link>
                </div>
                <div className="flex flex-col p-4">
                  <Link
                    href={`/${props.header}/article/${encodeURIComponent(
                      item.uuid
                    )}`}
                  >
                    <h3 className="md:text-lg lg:text-xl">{item.title}</h3>
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
