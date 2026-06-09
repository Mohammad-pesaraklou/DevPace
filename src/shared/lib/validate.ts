import { ObjectSchema } from "joi";
import { NextResponse } from "next/server";

const ValidateBody = (schema: ObjectSchema, body: any) => {
  const { error, value } = schema.validate(body, {
    abortEarly: false,
  });

  if (error) {
    return NextResponse.json(
      {
        message: "Validation Error",
        errors: error.details.map((err) => err.message),
      },
      { status: 400 },
    );
  }

  return value;
};

export default ValidateBody;
