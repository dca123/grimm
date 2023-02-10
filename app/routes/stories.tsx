import { Story as StoryData } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => json(await db.story.findMany());

export default function Stories() {
  const stories = useLoaderData<typeof loader>();
  return (
    <div className="py-8 h-full flex flex-col">
      <h1 className="font-normal text-purple-300 text-3xl text-center">
        Stories
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-12 pt-8">
        {stories.map((story, i) => (
          <Story key={i} {...story} />
        ))}
      </div>
    </div>
  );
}

const Story = ({ goal, intent, persona }: StoryData) => {
  return (
    <div className="bg-purple-300 rounded p-8 px-10 shadow-purple-500 shadow-sm">
      <p className="inline leading-10 text-2xl font-bold text-purple-500">
        As a{" "}
      </p>
      <p className="inline leading-10 text-2xl font-bold text-purple-900">
        {persona},{" "}
      </p>
      <p className="inline leading-10 text-2xl font-bold text-purple-500">
        I want to{" "}
      </p>
      <p className="inline leading-10 text-2xl font-bold text-purple-900">
        {intent},{" "}
      </p>
      <p className="inline leading-10 text-2xl font-bold text-purple-500">
        So that I{" "}
      </p>
      <p className="inline leading-10 text-2xl font-bold text-purple-900">
        {goal}
      </p>
    </div>
  );
};
