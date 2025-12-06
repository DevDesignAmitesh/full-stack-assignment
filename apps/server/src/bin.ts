import { app } from "./index";

const PORT = 4000;

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
