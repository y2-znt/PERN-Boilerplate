import app from ".";

const PORT = process.env.BACKEND_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
