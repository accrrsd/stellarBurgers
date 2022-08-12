import { FeedNumbers } from './feed-numbers/feed-numbers'
import style from './Feed.module.css'
import Modal from '../../components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { OrdersTape } from '../../components/orders-tape/orders-tape'
import { closeOrder, openOrder } from '../../services/slices/orders'
import { useNavigate } from 'react-router-dom'
import { OrderInfo } from '../../components/modal-content/order-info/order-info'
import { useEffect } from 'react'

export default function Feed() {
  const data = useSelector((store) => store.ordersSliceReducer.allOrders)
  const openedOrder = useSelector((store) => store.ordersSliceReducer.openedOrder)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const readyNumbers = data.orders
    ?.filter((order) => order.status === 'done')
    ?.map((order) => order.number)

  const inWorkNumbers = data.orders
    ?.filter((order) => order.status === 'pending')
    ?.map((order) => order.number)

  const todayNum = data.totalToday
  const allTimeNum = data.total

  const closeModal = () => {
    dispatch(closeOrder()) && navigate('/feed')
  }

  const opened = sessionStorage.getItem('openedOrder')
  useEffect(() => {
    if (opened) {
      const item = JSON.parse(opened)
      opened && dispatch(openOrder(item))
    }
  }, [opened, dispatch])

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Лента заказов</h2>
      <div className={style.connectWrapper}>
        <OrdersTape orders={data.orders} type="feed" />
        <FeedNumbers
          readyNumberArr={readyNumbers?.length > 5 ? readyNumbers.slice(0, 5) : readyNumbers}
          workNumberArr={inWorkNumbers?.length > 5 ? inWorkNumbers.slice(0, 5) : inWorkNumbers}
          todayNum={todayNum || 0}
          allTimeNum={allTimeNum || 0}
        />
        {openedOrder && (
          <Modal
            title={`#${(opened && JSON.parse(opened).number) || openedOrder.number}`}
            onEscKeyDown={closeModal}
          >
            <OrderInfo order={openedOrder} />
          </Modal>
        )}
      </div>
    </div>
  )
}
