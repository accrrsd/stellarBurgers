import style from './user-orders.module.css'
import { OrdersTape } from '../../../components/orders-tape/orders-tape'
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '../../../hooks/appHooks'
import { useEffect } from 'react'
import { closeOrder, openOrder } from '../../../services/slices/orders'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/modal/modal'
import { OrderInfo } from '../../../components/modal-content/order-info/order-info'

export const UserOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userOrders = useSelector((store) => store.ordersSliceReducer.userOrders)
  const openedOrder = useSelector((store) => store.ordersSliceReducer.openedOrder)

  const closeModal = () => {
    dispatch(closeOrder()) && navigate('/profile/orders')
  }

  const opened = sessionStorage.getItem('openedOrder')
  useEffect(() => {
    if (opened) {
      const item = JSON.parse(opened)
      opened && dispatch(openOrder(item))
    }
  }, [opened, dispatch])
  if (userOrders && typeof userOrders.orders !== 'undefined')
    return (
      <div className={style.wrapper}>
        <OrdersTape orders={userOrders.orders} type="profile" />
        {openedOrder && (
          <Modal
            title={`#${(opened && JSON.parse(opened).number) || openedOrder.number}`}
            onEscKeyDown={closeModal}
          >
            <OrderInfo order={openedOrder} />
          </Modal>
        )}
      </div>
    )
  else return null
}
