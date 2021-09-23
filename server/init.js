import "dotenv/config";
import "./db";

import app from "./server";

const PORT = process.env.PORT || 4000;
const handleListenning = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListenning);
