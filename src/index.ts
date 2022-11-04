import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  return console.log(`Express is listening in http://localhost:${PORT}`);
});
