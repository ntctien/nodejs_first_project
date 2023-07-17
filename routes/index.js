import usersRouter from './user.js';
import studentsRouter from './student.js';

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Response from root router')
    })
    app.use('/users', usersRouter);
    app.use('/students', studentsRouter);
}

export default routes;