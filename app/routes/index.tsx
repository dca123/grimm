import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const persona = formData.get("persona");
  const intent = formData.get("intent");
  const goal = formData.get("goal");

  console.log({
    persona,
    intent,
    goal,
  });
  return redirect("/");
};

export default function Index() {
  return (
    <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded p-12 m-auto max-w-3xl mx-auto">
      <form
        className="flex flex-col items-center"
        method="post"
        action="/?index"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-start space-y-1">
            <label className="text-xl font-medium text-purple-900">As a</label>
            <input
              name="persona"
              type="text"
              className="p-2 px-4 rounded placeholder:text-purple-300 font-semibold text-2xl focus:outline-none focus:border-purple-900 focus:ring-2 focus:ring-purple-900"
              placeholder="User"
            />
          </div>

          <div className="flex flex-col items-start space-y-1">
            <label className="text-xl font-medium text-purple-900">
              I want to
            </label>
            <textarea
              name="intent"
              className="p-2 px-4 rounded placeholder:text-purple-300 font-semibold text-2xl focus:outline-none focus:border-purple-900 focus:ring-2 focus:ring-purple-900"
              placeholder="Organize my work"
            />
          </div>

          <div className="flex flex-col items-start space-y-1">
            <label className="text-xl font-medium text-purple-900">
              So that I can
            </label>
            <textarea
              name="goal"
              className="p-2 px-4 rounded placeholder:text-purple-300 font-semibold text-2xl focus:outline-none focus:border-purple-900 focus:ring-2 focus:ring-purple-900"
              placeholder="Feel more in control"
            />
          </div>
        </div>
        <button
          className="p-2 px-4 bg-gray-900 rounded-lg text-white mt-6 hover:shadow-lg font-light text-xl max-w-fit
        "
        >
          Create Story
        </button>
      </form>
    </div>
  );
}
