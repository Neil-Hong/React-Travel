import React, { Component } from 'react'
import styles from "./HomePage.module.css"
import {Row, Col, Typography, Spin} from "antd"
import axios from "axios"
import { connect } from 'react-redux'
import {Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartner} from "../../components"
// import {productList1, productList2, productList3} from "./mockUp"
import sideImage1 from "../../assets/images/sider_2019_02-04.png"
import sideImage2 from "../../assets/images/sider_2019_02-04-2.png"
import sideImage3 from "../../assets/images/sider_2019_12-09.png"
import { withTranslation, WithTranslation } from 'react-i18next'
import {RootState} from "../../redux/store"
import {giveMeDataActionCreator}
    from "../../redux/recommendProducts/recommendProductsAction"
import { MainLayout } from '../../layouts/mainLayout'

const mapStateToProps = (state:RootState)=>{
    return{
        loading:state.recommendProducts.loading,
        productList:state.recommendProducts.productList,
        error:state.recommendProducts.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        giveMeData:()=>{
            dispatch(giveMeDataActionCreator())
        }          
    }
}

type PropsType = WithTranslation &
    ReturnType<typeof mapDispatchToProps> &
    ReturnType<typeof mapStateToProps>


class HomePageComponent extends Component<PropsType> {

    componentDidMount() {
        this.props.giveMeData()
    }

    render() {
        
        const {t} = this.props
        const {productList, loading, error} = this.props
        
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

        if(error != null){
            return <div>Website Crash{error}</div>
        }
        return (
            <div>
                <MainLayout>
                <Row style={{marginTop:20}}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                        <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>
                <ProductCollection
                    title={<Typography.Title level={3} type={"warning"}>{t("home_page.hot_recommended")}</Typography.Title>}
                    sideImage={sideImage1}
                    products={productList[0].touristRoutes}
                ></ProductCollection>
                <ProductCollection
                    title={<Typography.Title level={3} type="danger">{t("home_page.new_arrival")}</Typography.Title>}
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                ></ProductCollection>
                <ProductCollection
                    title={<Typography.Title level={3} type="success">{t("home_page.domestic_travel")}</Typography.Title>}
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                ></ProductCollection>
                
                <BusinessPartner />
                </MainLayout>
            </div>
        )
    }
}

export const HomePage = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(HomePageComponent))