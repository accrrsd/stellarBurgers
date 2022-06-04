import style from './burger-ingredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import propValidate from 'prop-types'
import { useState, useContext, createRef, useEffect, forwardRef } from 'react'
import { ingredientContext } from '../app/app'

const Category = forwardRef(({ type }, ref) => {
  const { ingredientsData } = useContext(ingredientContext)
  return (
    <li>
      <h3 ref={ref} className={`${style.categoryTitle} text text_type_main-medium`}>
        {type === 'sauce' ? 'Соусы' : type === 'main' ? 'Начинки' : 'Булки'}
      </h3>
      <ul className={style.categoryContent}>
        {ingredientsData.map(
          (item) => item.type === type && <CurrentIngredient item={item} key={item._id} />
        )}
      </ul>
    </li>
  )
})
Category.propTypes = {
  type: propValidate.string.isRequired,
}

const CurrentIngredient = ({ item }) => {
  const [count, setCount] = useState(0)
  const { setIngredient } = useContext(ingredientContext)
  function handleClick() {
    setCount(count + 1)
    setIngredient(item)
  }
  return (
    <li className={style.ingredient} onClick={handleClick}>
      {count !== 0 && (
        <span className={style.ingredientCount}>
          <Counter count={count} size="default" />
        </span>
      )}
      <img className={style.ingredientImage} src={item.image} alt={item.name} />
      <span className={`${style.ingredientPrice} text text_type_digits-default`}>
        {item.price} <CurrencyIcon type="primary" />
      </span>
      <p className={style.ingredientName}>{item.name}</p>
    </li>
  )
}
CurrentIngredient.propTypes = {
  item: propValidate.shape({
    _id: propValidate.string.isRequired,
    name: propValidate.string.isRequired,
    type: propValidate.string.isRequired,
    proteins: propValidate.number,
    fat: propValidate.number,
    carbohydrates: propValidate.number,
    calories: propValidate.number,
    price: propValidate.number.isRequired,
    image: propValidate.string.isRequired,
    image_mobile: propValidate.string,
    image_large: propValidate.string,
    __v: propValidate.any,
  }).isRequired,
}

export default function BurgerIngredients() {
  // Статы
  const [currentTab, setCurrentTab] = useState('bun')
  const [categoryStarts, setStarts] = useState({})
  // Рефы
  const containerRef = createRef(null)
  const bunRef = createRef(null)
  const sauceRef = createRef(null)
  const mainRef = createRef(null)
  // Находим точки начала категорий
  useEffect(() => {
    setStarts({
      ...categoryStarts,
      sauce: handleTab('sauce', true),
      main: handleTab('main', true),
    })
    containerRef.current.scrollTop = 0
    // eslint-disable-next-line
  }, [])
  // Переходы на табы
  const handleTab = (name, system) => {
    const refType = name === 'bun' ? bunRef : name === 'sauce' ? sauceRef : mainRef
    if (system) {
      refType.current.scrollIntoView()
      return containerRef.current.scrollTop
    } else {
      refType.current.scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
    }
  }
  // Автоматическая смена таба когда в категории
  const handleAutoTab = () => {
    const scroll = containerRef.current.scrollTop
    const { sauce, main } = categoryStarts
    scroll < sauce
      ? setCurrentTab('bun')
      : scroll >= sauce && scroll < main
      ? setCurrentTab('sauce')
      : setCurrentTab('main')
  }
  return (
    <div className={style.wrapper}>
      <h2 className={`${style.title} text text_type_main-large`}>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={handleTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTab}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={handleTab}>
          Начинки
        </Tab>
      </div>
      <ul className={style.container} ref={containerRef} onScroll={handleAutoTab}>
        <Category ref={bunRef} type="bun" />
        <Category ref={sauceRef} type="sauce" />
        <Category ref={mainRef} type="main" />
      </ul>
    </div>
  )
}
