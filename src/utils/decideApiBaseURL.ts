export default function decideApiBaseURL(): string {
  const nonProdBaseURL = "http://localhost:3000";
  const prodBaseURL = "https://api.todo.sundayexplore.tech";

  switch (process.env.NODE_ENV) {
    case "development":
      return nonProdBaseURL;

    case "test":
      return nonProdBaseURL;
  }

  return prodBaseURL;
}
