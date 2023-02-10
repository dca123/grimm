import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { Input } from "~/components/Input";
import { Submit } from "~/components/Submit";
import { db } from "~/utils/db.server";

const validator = withZod(
  z.object({
    persona: z.string().min(1),
    intent: z.string().min(1),
    goal: z.string().min(1),
  })
);

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  console.log(formData);
  const { data, error } = await validator.validate(formData);

  if (error) {
    // validationError comes from `remix-validated-form`
    return validationError(error);
  }

  await db.story.create({
    data,
  });

  return redirect("/");
};

export default function Index() {
  return (
    <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded p-12 m-auto max-w-3xl mx-auto">
      <ValidatedForm
        className="flex flex-col items-center"
        validator={validator}
        method="post"
      >
        <div className="flex flex-col space-y-4">
          <Input name="persona">
            {({ getInputProps, error }) => (
              <div className="flex flex-col items-start space-y-1">
                <label className="text-xl font-medium text-purple-900">
                  As a
                </label>
                <input
                  {...getInputProps({
                    id: "persona",
                  })}
                  type="text"
                  className="p-2 px-4 rounded placeholder:text-purple-300 font-semibold text-2xl focus:outline-none focus:border-purple-900 focus:ring-2 focus:ring-purple-900"
                  placeholder="Procrastinator"
                />
                {error && (
                  <span className="text-pink-700 text-sm">{error}</span>
                )}
              </div>
            )}
          </Input>

          <Input name="intent">
            {({ getInputProps, error }) => (
              <div className="flex flex-col items-start space-y-1">
                <label className="text-xl font-medium text-purple-900">
                  I want to
                </label>
                <textarea
                  {...getInputProps({
                    id: "intent",
                  })}
                  className="p-2 px-4 rounded placeholder:text-purple-300 font-semibold text-2xl focus:outline-none focus:border-purple-900 focus:ring-2 focus:ring-purple-900"
                  placeholder="Organize my work"
                  rows={4}
                />
                {error && (
                  <span className="text-pink-700 text-sm">{error}</span>
                )}
              </div>
            )}
          </Input>

          <Input name="goal">
            {({ getInputProps, error }) => (
              <div className="flex flex-col items-start space-y-1">
                <label className="text-xl font-medium text-purple-900">
                  So that I
                </label>
                <textarea
                  {...getInputProps({
                    id: "goal",
                  })}
                  className="p-2 px-4 rounded placeholder:text-purple-300 font-semibold text-2xl focus:outline-none focus:border-purple-900 focus:ring-2 focus:ring-purple-900"
                  placeholder="Can feel more in control"
                  rows={4}
                />
                {error && (
                  <span className="text-pink-700 text-sm">{error}</span>
                )}
              </div>
            )}
          </Input>
        </div>
        <Submit>
          {(isSubmitting) => (
            <button className="p-2 px-4 bg-gray-900 rounded-lg text-white mt-6 hover:shadow-lg font-light text-xl max-w-fit">
              {isSubmitting ? "Submitting..." : "Create Story"}
            </button>
          )}
        </Submit>
      </ValidatedForm>
    </div>
  );
}
