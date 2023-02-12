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
    <div className="m-auto mx-auto max-w-3xl rounded bg-violet-800 p-12">
      <ValidatedForm
        className="flex flex-col items-center"
        validator={validator}
        method="post"
      >
        <div className="flex flex-col space-y-4">
          <Input name="persona">
            {({ getInputProps, error }) => (
              <div className="flex flex-col items-start space-y-1">
                <label className="text-xl font-medium text-purple-50">
                  As a
                </label>
                <input
                  {...getInputProps({
                    id: "persona",
                  })}
                  type="text"
                  className="rounded bg-violet-700 p-2 px-4 text-2xl font-semibold text-slate-50 shadow-inner placeholder:text-violet-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  placeholder="Procrastinator"
                />
                {error && (
                  <span className="text-sm text-pink-300">{error}</span>
                )}
              </div>
            )}
          </Input>

          <Input name="intent">
            {({ getInputProps, error }) => (
              <div className="flex flex-col items-start space-y-1">
                <label className="text-xl font-medium text-purple-50">
                  I want to
                </label>
                <textarea
                  {...getInputProps({
                    id: "intent",
                  })}
                  className="rounded bg-violet-700 p-2 px-4 text-2xl font-semibold text-slate-50 shadow-inner placeholder:text-violet-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  placeholder="Organize my work"
                  rows={4}
                />
                {error && (
                  <span className="text-sm text-pink-300">{error}</span>
                )}
              </div>
            )}
          </Input>

          <Input name="goal">
            {({ getInputProps, error }) => (
              <div className="flex flex-col items-start space-y-1">
                <label className="text-xl font-medium text-purple-50">
                  So that I
                </label>
                <textarea
                  {...getInputProps({
                    id: "goal",
                  })}
                  className="rounded bg-violet-700 p-2 px-4 text-2xl font-semibold text-slate-50 shadow-inner placeholder:text-violet-400 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  placeholder="Can feel more in control"
                  rows={4}
                />
                {error && (
                  <span className="text-sm text-pink-300">{error}</span>
                )}
              </div>
            )}
          </Input>
        </div>
        <Submit>
          {(isSubmitting) => (
            <button className="mt-6 max-w-fit rounded-lg bg-purple-600 p-2 px-4 text-xl font-light text-white hover:shadow-lg">
              {isSubmitting ? "Submitting..." : "Create Story"}
            </button>
          )}
        </Submit>
      </ValidatedForm>
    </div>
  );
}
