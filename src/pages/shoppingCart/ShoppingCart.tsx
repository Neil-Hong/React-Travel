import React from 'react';
import { Row, Col, Affix } from 'antd';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import styles from "./ShoppingCart.module.css"
import { MainLayout } from '../../layouts/mainLayout';
import { ProductList, PaymentCard } from '../../components';
import { useSelector } from '../../redux/hooks';
import { clearShoppingCartItem, checkout } from '../../redux/shoppingCart/slice';

export const ShoppingCart: React.FC = () => {

    const shoppingCartLoading = useSelector(state=>state.shoppingCart.loading)
    const shoppingCartItems = useSelector(state=>state.shoppingCart.items)
    const jwt = useSelector(state=>state.user.token) as string
    const dispatch = useDispatch()
    const history = useNavigate()

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList data={shoppingCartItems.map(s=>s.touristRoute)}/>
                    </div>
                </Col>

                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard 
                                loading={shoppingCartLoading}
                                originalPrice={shoppingCartItems.map(s=>s.originalPrice).reduce((a,b)=>a+b,0)}
                                price={shoppingCartItems.map(s=>s.originalPrice * (s.discountPresent ? s.discountPresent : 1)).reduce((a,b)=>a+b,0)}
                                onCheckout={()=>{
                                    if(shoppingCartItems.length <= 0){
                                        return
                                    }
                                    dispatch(checkout(jwt))
                                    history("/placeOrder")
                                }}
                                onShoppingCartClear={()=>{
                                    dispatch(clearShoppingCartItem({jwt,itemIds:shoppingCartItems.map((s)=>s.id)}))
                                }}
                            />
                        </div>
                    </Affix>
                </Col>

            </Row>
        </MainLayout>

    )
}
