export const LOCATION_HANOI = [21.0285, 105.8542]

export const showListLength = [
    {
        id: 1,
        length: 10
    },
    {
        id: 2,
        length: 20
    },
    {
        id: 3,
        length: 50
    },
    {
        id: 4,
        length: 100
    },
    {
        id: 5,
        length:200
    },
    {
        id: 6,
        length: "All"
    }
]

export const BASE_URL = 'http://localhost:8888/api/v1'

export const VILLAGE_URL = BASE_URL + "/village"
export const PRODUCT_URL = BASE_URL + "/product"
export const POI_URL = BASE_URL + "/poi"
export const POS_URL = BASE_URL + "/pos"
export const NEI_URL = BASE_URL + "/nei"


export const ROUTER = {
    ADMIN_VILLAGE_DETAIL: "/admin/village/detail/",
    ADMIN_VILLAGE_CREATE: "/admin/village/create",

    ADMIN_PRODUCT_DETAIL: "/admin/product/detail/",
    ADMIN_PRODUCT_CREATE: "/admin/product/create",

    ADMIN_POS_DETAIL: "/admin/pos/detail/",
    ADMIN_POS_CREATE: "/admin/pos/create",

    ADMIN_POI_DETAIL: "/admin/poi/detail/",
    ADMIN_POI_CREATE: "/admin/poi/create",
}

export const TITLE_VILLAGE_ADMIN = {
    EDIT_VILLAGE: "Edit Village",
    CREARTE_VILLAGE: "Create Village",
}

export const TITLE_ADMIN = {
    VILLAGE: {
        EDIT: "Edit Village",
        CREATE: "Create Village",
    },
    PRODUCT: {
        EDIT: "Edit Product",
        CREATE: "Create Product",
    },
    POINT_OF_INTEREST: {
        EDIT: "Edit Point of Interest",
        CREATE: "Create Point of Interest",
    },
    POINT_OF_SERVICE: {
        EDIT: "Edit Point of Service",
        CREATE: "Create Point of Service",
    }
}

export const VILLAGE_DEFAULT = {
    name: "",
    slug: "",
    address: "",
    geocode: "",
    history : "",
    image: [],
}

export const PRODUCT_DEFAULT = {
    name: '',
    slug: '',
    villageId: 0,
    image: [],
    description: ''
}

export const POI_DEFAULT = {
    name: '',
    slug: '',
    villageId: 0,
    address: '',
    image: [],
    geocode: [],
    description: ''
}

export const POS_DEFAULT = {
    name: '',
    slug: '',
    villageId: 0,
    address: '',
    image: [],
    geocode: [],
}

export const LIST_SIDEBAR_MYACCOUNT = [
    {
        id: 1,
        name: "PROFILE",
        path:"/myaccount/profile"
    },
    {
        id: 2,
        name: 'HISTORY TOURS',
        path:"/myaccount/history-tour"
    }
]

export const LIST_NAVIGATE_BOOKTOURS = [
    {
        id: 1,
        number : 1
    },
    {
        id: 2,
        number: 2,
    },
    {
        id:3,
        number: 3
    }
]