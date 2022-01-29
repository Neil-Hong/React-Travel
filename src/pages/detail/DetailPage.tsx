import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Spin, Row, Col, DatePicker, Space, Divider, Typography, Anchor, Menu, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import styles from "./DetailPage.module.css"
import { ProductIntro, ProductComments } from '../../components';
import { commentMockData } from './mockup';
import { productDetailSlice, getProductDetail } from '../../redux/productDetail/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../../layouts/mainLayout';
import { addShoppingCartItem } from '../../redux/shoppingCart/slice';

const { RangePicker } = DatePicker



export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<string>()
  console.log(touristRouteId)
  // const [loading, setLoading] = useState<boolean>(true)
  // const [product, setProduct] = useState<any>()
  // const [error, setError] = useState<string | null>(null)
  const loading = useSelector(state => state.productDetail.loading)
  const product = useSelector(state => state.productDetail.data)
  const error = useSelector(state => state.productDetail.error)
  const dispatch = useDispatch()

  const jwt = useSelector(state=>state.user.token) as string
  const shoppingCartLoading = useSelector(state=>state.shoppingCart.loading)

  useEffect(() => {
    dispatch(getProductDetail(touristRouteId))
  }, [])

  if (loading) {
    return <Spin
      size="large"
      style={{
        marginTop: 200,
        marginBottom: 200,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%"
      }}
    />
  }

  if (error != null) {
    return <div>Website Crash{error}</div>
  }
  // return <h1>Detail ID:{params.id}</h1>;
  return (
    <MainLayout>
      
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => {
                  return p.url
                })}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{marginTop:50, marginBottom:30, display:"block"}}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={()=>{
                  dispatch(addShoppingCartItem({jwt, touristRouteId:product.id}))
                }}
              >
                <ShoppingCartOutlined />
                Add to Cart
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
              </Col>
          </Row>
        </div>
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key={1}>
              <Anchor.Link href="#feature" title="description" />
            </Menu.Item>
            <Menu.Item key={2}>
              <Anchor.Link href="#fees" title="fees" />
            </Menu.Item>
            <Menu.Item key={3}>
              <Anchor.Link href="#note" title="Notes" />
            </Menu.Item>
            <Menu.Item key={4}>
              <Anchor.Link href="#comments" title="Comments" />
            </Menu.Item>
          </Menu>
        </Anchor>
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation='center'>
            <Typography.Title level={3}>Description</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
        </div>
        <div id="fees" className={styles["product-detail-container"]}>

        </div>
        <div id="note" className={styles["product-detail-container"]}>
          <Divider orientation='center'>
            <Typography.Title level={3}>Notes</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
        </div>
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation='center'>
            <Typography.Title level={3}>Comments</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      
    </MainLayout>
  )

}


