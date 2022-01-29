import React from 'react';
import { Typography, Image, Carousel, Rate, Table } from 'antd';
import styles from "./ProductIntro.module.css"
import {ColumnsType} from "antd/es/table"

interface PropsType {
    title: string,
    shortDescription: string,
    price: string | number,
    coupons: string,
    points: string,
    discount: string,
    rating: string | number,
    pictures: string[]
}

const columns:ColumnsType<RowType>=[
    {
        title:"title",
        dataIndex:"title",
        key:"title",
        align:"left",
        width:120
    },
    {
        title:"description",
        dataIndex:"description",
        key:"descripion",
        align:"center"
    }
]

interface RowType{
    title:string,
    description:string | number| JSX.Element,
    key:number
}

export const ProductIntro: React.FC<PropsType> = ({
    title, shortDescription, price, coupons, points, discount, rating, pictures
}) => {

    const tableDataSource: RowType[] = [
        {
          key: 0,
          title: "Route Name",
          description: title,
        },
        {
          key: 1,
          title: "Price",
          description: (
            <>
              ${" "}
              <Typography.Text type="danger" strong>
                {price}
              </Typography.Text>
            </>
          ),
        },
        {
          key: 2,
          title: "Time-Limited Discount",
          description: discount ? (
            <>
              $ <Typography.Text delete>{price}</Typography.Text>{" "}
              <Typography.Text type="danger" strong>
                $ {discount}
              </Typography.Text>
            </>
          ) : (
            "No Discount"
          ),
        },
        {
          key: 2,
          title: "Available Discount",
          description: coupons ? discount : "No discount available",
        },
        {
          key: 2,
          title: "Route Rating",
          description: (
            <>
              <Rate allowHalf defaultValue={+rating} />
              <Typography.Text style={{ marginLeft: 10 }}>
                {rating} stars
              </Typography.Text>
            </>
          ),
        },
      ];

    return <div className={styles["intro-container"]}>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text>{shortDescription}</Typography.Text>
        <div className={styles["intro-detail-container"]}>
            <Typography.Text style={{marginLeft:20}}>
                $<span className={styles["intro-detail-strong-text"]}>{price}/per people</span>
            </Typography.Text>
            <Typography.Text style={{marginLeft:50}}>
                <span className={styles["intro-detail-strong-text"]}>Rating: {rating}</span>
            </Typography.Text>
        </div>
        <Carousel autoplay slidesToShow={3}>
            {pictures.map((p)=>{
                return <Image height={150} src={p}></Image>
            })}
        </Carousel>
        <Table columns={columns} dataSource={tableDataSource} size="small" bordered={false}  pagination={false}/>
    </div>;
}
