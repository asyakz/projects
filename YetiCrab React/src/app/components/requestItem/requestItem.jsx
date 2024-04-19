import styles from './requestItem.module.css';
import PropTypes from 'prop-types';

const RequestItem = ({ index, request }) => {
  return (
    <li className={styles.item} key={index}>
      <ol className={styles.reqList}>
        <li className={styles.reqItem}>Номер заявки: {request.number}</li>
        <li className={styles.reqItem}>Дата и время получения заявки: {request.date}</li>
        <li className={styles.reqItem}>Название фирмы клиента: {request.name}</li>
        <li className={styles.reqItem}>ФИО перевозчика: {request.fullName}</li>
        <li className={styles.reqItem}>Телефон: {request.tel}</li>
        <li className={styles.reqItem}>Комментарий: {request.comment}</li>
        <li className={styles.reqItem}>Статус: {request.status}</li>
        <li className={styles.reqItem}>ATI код сети перевозчика: {request.ATI}</li>
      </ol>
    </li>
  )
}

RequestItem.propTypes = {
  index: PropTypes.number,
  request: PropTypes.object,
}

export default RequestItem;