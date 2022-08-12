import style from './feed-numbers.module.css'
import { v4 as uuidv4 } from 'uuid'
import propValidate from 'prop-types'

export const FeedNumbers = ({ readyNumberArr, workNumberArr, todayNum, allTimeNum }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.topWrapper}>
        <div className={style.numberList}>
          <h4 className={style.listTitle}>Готовы:</h4>
          <ul className={style.list}>
            {readyNumberArr &&
              readyNumberArr.map((num) => (
                <li className={style.listItem} key={uuidv4()}>
                  <span className={style.readyNumber}>{num}</span>
                </li>
              ))}
          </ul>
        </div>

        <div className={style.numberList}>
          <h4 className={style.listTitle}>В работе:</h4>
          <ul className={style.list}>
            {workNumberArr &&
              workNumberArr.map((num) => (
                <li className={style.listItem} key={uuidv4()}>
                  <span className={style.inWorkNumber}>{num}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className={style.categoryWrapper}>
        <h4 className={style.categoryTitle}>Выполнено за все время:</h4>
        <span className={`text text_type_digits-large ${style.bigNumbers}`}>
          {allTimeNum || '?'}
        </span>
      </div>

      <div className={style.categoryWrapper}>
        <h4 className={style.categoryTitle}>Выполнено за сегодня:</h4>
        <span className={`text text_type_digits-large ${style.bigNumbers}`}>{todayNum || '?'}</span>
      </div>
    </div>
  )
}

FeedNumbers.propTypes = {
  readyNumberArr: propValidate.oneOfType([propValidate.array, propValidate.bool]),
  workNumberArr: propValidate.oneOfType([propValidate.array, propValidate.bool]),
  todayNum: propValidate.oneOfType([propValidate.number, propValidate.string]).isRequired,
  allTimeNum: propValidate.oneOfType([propValidate.number, propValidate.string]).isRequired,
}
