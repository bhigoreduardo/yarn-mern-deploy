import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.extend(localizedFormat);

dayjs().format('L LT');
dayjs.locale('pt-br');