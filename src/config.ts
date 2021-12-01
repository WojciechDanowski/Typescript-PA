export const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface InstanceConfig {
  API_URL: string;
}

export const config: InstanceConfig = {
  API_URL: "https://typescript-PA-289303247010.firebaseio.com/todos",
};
