process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import BMIRoute from './routes/bmi.route';

validateEnv();

const app = new App([new BMIRoute()]);

app.listen();
