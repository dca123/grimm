import type { Story as StoryData } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => json(await db.story.findMany());

export default function Stories() {
  const stories = useLoaderData<typeof loader>();
  return (
    <div className="flex h-full flex-col py-8">
      <h1 className="text-center text-3xl font-normal text-purple-200">
        Stories
      </h1>
      <div className="grid w-full grid-cols-1 gap-12 pt-8 md:grid-cols-3">
        {stories.map((story, i) => (
          <Story key={i} {...story} />
        ))}
      </div>
    </div>
  );
}

const Story = ({ goal, intent, persona }: StoryData) => {
  return (
    <div className="flex flex-col space-y-2 rounded bg-violet-800 p-8 px-10 shadow-sm">
      <p className="inline text-2xl font-bold  text-violet-400">
        As a <span className="text-violet-50">{persona},</span>
      </p>
      <p className="inline text-2xl font-bold  text-violet-400">
        I want to <span className="text-violet-50">{intent},</span>
      </p>
      <p className="inline text-2xl font-bold  text-violet-400">
        So that I <span className="text-violet-50">{goal}</span>
      </p>
    </div>
  );
};
