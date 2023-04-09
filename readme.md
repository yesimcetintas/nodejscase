# REST API NODEJS CASE

## Install

    npm install

## Run the app

    nodemon app

# REST API

## Get list of Campaigns

### Request

`GET /campaign`

### Response
```
[
    {
        "_id": "642ea53fbf7a86ef41152ad7",
        "type": "count",
        "buyCount": 2,
        "campaignCount": 1,
        "author": "Sabahattin Ali",
        "category_id": 1,
        "__v": 0
    },
    {
        "_id": "642ea5b4bf7a86ef41152ad9",
        "type": "rate",
        "discountRate": 5,
        "orderTotalAmount": 100,
        "__v": 0
    }
]
```

## Post campaign

### Request

`POST /campaign`

#### Example-1

```
    {
        "type": "rate",
        "discountRate": 5,
        "orderTotalAmount": 100
    }
```

#### Example-2

```
    {
        "type": "count",
        "buyCount": 2,
        "campaignCount": 1,
        "author": "Sabahattin Ali",
        "category_id": 1
    }
```

## Create a new order

### Request

`POST /order`
```
    {
    "cart":[
        {
            "product_id": 1,
            "product_count": 5
        },
        {
            "product_id": 3,
            "product_count": 3
        }
        ]
    }
```

## Get list of Orders

### Request

`GET /order`

### Response
```
[
    {
        "campaign": {
            "discountType": "count",
            "id": "642ea53fbf7a86ef41152ad7",
            "discount": 9.1
        },
        "_id": "6430217dcff061a8e2e538b3",
        "cart": 
            [
                {
                    "product_id": 1,
                    "author": "Yaşar Kemal",
                    "title": "İnce Memed",
                    "list_price": 48.75,
                    "product_count": 1,
                    "category_id": 1,
                    "_id": "6430217dcff061a8e2e538b4"
                },
                {
                    "product_id": 3,
                    "author": "Sabahattin Ali",
                    "title": "Kürk Mantolu Madonna",
                    "list_price": 9.1,
                    "product_count": 3,
                    "category_id": 1,
                    "_id": "6430217dcff061a8e2e538b5"
                }
            ],
        "shippingCost": 35,
        "totalPrice": 101.95,
        "totalPriceWithoutDiscount": 111.05,
        "createdAt": "2023-04-08T15:08:06.997Z",
        "updatedAt": "2023-04-08T15:08:06.997Z",
        "__v": 0
    }
]
```