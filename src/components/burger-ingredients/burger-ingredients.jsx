import style from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, createRef, useEffect } from 'react'
import Category from './category/category'

export default function BurgerIngredients() {
  // Статы
  const [currentTab, setCurrentTab] = useState('bun')
  const [categoryStarts, setStarts] = useState({})
  const [didMount, setDidMount] = useState(false)
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
    // Защита от преждевременно выбранной категории
    if (!didMount) {
      containerRef.current.scrollTop = 0
      setCurrentTab('bun')
      setDidMount(true)
    }
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
