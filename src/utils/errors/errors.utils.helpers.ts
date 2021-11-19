export const Errors = Object.freeze({
  server: { code: "000", error: "Internal Server Error." },
  notFound: { code: "001", error: "Method not found." },
  unauthorized: { code: "002", error: "Unauthorized." },
  fetchEntity: { code: "003", error: "Fetch entity failed." },
  addEntity: { code: "004", error: "Add entity failed." },
  deleteEntity: { code: "005", error: "Delete entity failed." },
  patchEntity: { code: "006", error: "Patch entity failed." },
  replaceEntity: { code: "007", error: "Replace entity failed." }
});

export const getErrorData = (code: string) => {
  return (
    Object.values(Errors).find(error => {
      return error.code === code;
    }) || Errors.server
  );
};

export const transformValidationErrors = (errors: any) => {
  const formatedErrors = [];
  for (const key in errors.errors) {
    if (Object.prototype.hasOwnProperty.call(errors.errors, key)) {
      formatedErrors.push({
        code: null,
        field: key,
        value: errors.first(key)
      });
    }
  }

  return {
    code: 422,
    status: "fail",
    message: "Error de validación.",
    error: formatedErrors
  };
};
