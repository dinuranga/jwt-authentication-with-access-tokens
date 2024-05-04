const express = require('express');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
});