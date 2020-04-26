export default function decideApiBaseURL(): string {
  const nonProdBaseURL = "http://localhost:3000";
  const prodBaseURL = "https://sunday-fancy-todo-api.herokuapp.com";

  switch (process.env.NODE_ENV) {
    case "development":
      return nonProdBaseURL;

    case "test":
      return nonProdBaseURL;
  }

  return prodBaseURL;
}
