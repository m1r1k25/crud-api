export const isUrlHaveUuid = (url: string | undefined): boolean => {
  if (url !== undefined) {
    const splittedUrl = url.split("/");

    if (
      splittedUrl[splittedUrl.length - 3] === "api" &&
      splittedUrl[splittedUrl.length - 2] === "users"
    ) {
      return true;
    }
  }

  return false;
};