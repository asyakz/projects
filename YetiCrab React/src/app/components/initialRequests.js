import { nanoid } from 'nanoid';
import { dateNow } from '../utils/dateNow';

export const initialRequests = [
  { number: nanoid(), date: dateNow(), name: 'Руслан и Людмила', fullName: 'Пушкин Александр Сергеевич', tel: '+79093431940', comment: 'У лукоморья дуб зелёный, златая цепь на дубе том', status: 'Новая', ATI: 'https://ati.su/firms/12345/info' },
  { number: nanoid(), date: dateNow(), name: 'Черемуха', fullName: 'Есенин Сергей Александрович', tel: '+79067893112', comment: 'Черемуха душистая с весною расцвела и ветки золотистые, что кудри, завила', status: 'Новая', ATI: 'https://ati.su/firms/67891/info' },
  { number: nanoid(), date: dateNow(), name: 'Мастер и Маргарита', fullName: 'Булгаков Михаил Афанасьевич', tel: '+79990001100', comment: 'Аннушка уже разлила масло', status: 'Новая', ATI: 'https://ati.su/firms/43601/info' },
];