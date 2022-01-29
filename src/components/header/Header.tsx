import React, {useState, useEffect}from 'react'
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd"
import { GlobalOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useDispatch, connect} from 'react-redux'
import { useTranslation } from 'react-i18next'
import jwt_decode, {JwtPayload as DefaultJwtPayload} from 'jwt-decode'

import logo from '../../assets/logo.svg';
import styles from "./Header.module.css"
import { changeLanguageCreator } from '../../redux/language/languageActions'
import { useSelector } from '../../redux/hooks'
import { userSlice } from '../../redux/user/slice'
import { use } from 'i18next'


interface JwtPayload extends DefaultJwtPayload{
  username:string
}

export const Header: React.FC = () => {
  const history = useNavigate();
  // const location = useLocation();
  // const params = useParams();
  // const match = useMatch();
  const language = useSelector((state) =>state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const jwt = useSelector(state=>state.user.token)
  const [username,setUsername] = useState("")

  const shoppingCartItems = useSelector(state=>state.shoppingCart.items)
  const shoppingCartLoading = useSelector(state=>state.shoppingCart.loading)

  useEffect(()=>{
    if(jwt){
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  },[jwt])

  const menuClickHandler = (event)=>{
    dispatch(changeLanguageCreator(event.key))
  }

  const onLogOut = ()=>{
    dispatch(userSlice.actions.logOut())
    history("/")
  }

  return (
    <div className={styles['App-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button style={{ marginLeft: 15 }} overlay={
            <Menu onClick={menuClickHandler}>
              {
                languageList.map((l)=>{
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })
              }
            </Menu>
          }
            icon={<GlobalOutlined />}
          >Language
          </Dropdown.Button>
          {jwt ?
            <Button.Group className={styles['button-group']}>
              <span>
                {t("header.welcome")}, <Typography.Text style={{marginRight:50}} strong>{username}</Typography.Text>
              </span>
              <Button loading={shoppingCartLoading} onClick={()=>history("/shoppingCart")}>{t("header.shoppingcart")}({shoppingCartItems.length})</Button>
              <Button onClick={onLogOut}>{t("header.signOut")}</Button>
            </Button.Group> :
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history("/register")}>{t("header.register")}</Button>
              <Button onClick={() => history("/signIn")}>{t("header.signin")}</Button>
            </Button.Group>
          }       
        </div>
      </div>

      {/* Layout-header */}
      <Layout.Header className={styles['main-header']}>

        <span onClick={() => history("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]}></img>
          <Typography.Title level={3} className={styles['title']}>React Travel</Typography.Title>
        </span>

        <Input.Search 
        className={styles["search-input"]} 
        placeholder='Please enter your destination'
        onSearch={(keywords)=>{history("/search/"+keywords)}}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles['main-menu']}>
          <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
          <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
          <Menu.Item key="3"> {t("header.group")} </Menu.Item>
          <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
          <Menu.Item key="5"> {t("header.private")} </Menu.Item>
          <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
          <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
          <Menu.Item key="8"> {t("header.local")} </Menu.Item>
          <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
          <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
          <Menu.Item key="11"> {t("header.study")} </Menu.Item>
          <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
          <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
          <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
          <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
          <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
      </Menu>
    </div>
  )
}

connect()(Header)