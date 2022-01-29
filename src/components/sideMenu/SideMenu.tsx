import React from 'react'
import {Menu} from "antd"
import { GifOutlined } from '@ant-design/icons'
import styles from "./SideMenu.module.css"
import { sideMenuList } from '../../pages/home/mockUp'

export const SideMenu:React.FC = () => {
    return (
        <Menu mode='vertical' className={styles['side-menu']}>
            {sideMenuList.map((m,index)=>{
                return (
                    <Menu.SubMenu 
                        key={index} 
                        title={<span><GifOutlined />{m.title}</span>}
                    >
                        {m.subMenu.map((sm,smindex)=>{
                            return (
                                <Menu.SubMenu
                                    key={smindex}
                                    title={<span><GifOutlined />{sm.title}</span>}
                                >
                                    {sm.subMenu.map((sms, smsindex)=>{
                                        return (
                                            <Menu.Item
                                                key={smsindex}
                                            >
                                                <span><GifOutlined />{sms}</span>
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu.SubMenu>
                            )
                        })}
                    </Menu.SubMenu>
                )
                
            })}
        </Menu>
    )
}
