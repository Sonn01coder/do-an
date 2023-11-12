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
export const TOUR_URL = BASE_URL + "/tour"
export const PLACE_OF_TOUR_URL = BASE_URL + "/place-tour"
export const AUTH_URL = BASE_URL + "/user"
export const HISTORY_TOUR_URL = BASE_URL + "/historytour"


export const ROUTER = {
    ADMIN_VILLAGE_DETAIL: "/admin/village/detail/",
    ADMIN_VILLAGE_CREATE: "/admin/village/create",

    ADMIN_PRODUCT_DETAIL: "/admin/product/detail/",
    ADMIN_PRODUCT_CREATE: "/admin/product/create",

    ADMIN_POS_DETAIL: "/admin/pos/detail/",
    ADMIN_POS_CREATE: "/admin/pos/create",

    ADMIN_POI_DETAIL: "/admin/poi/detail/",
    ADMIN_POI_CREATE: "/admin/poi/create",

    ADMIN_PLACE_OF_TOUR_DETAIL: "/admin/place-tour/detail/",
    ADMIN_PLACE_OF_TOUR_CREATE: "/admin/place-tour/create",

    ADMIN_TOUR_DETAIL: "/admin/tour/detail/",
    ADMIN_TOUR_CREATE: "/admin/tour/create",

    ADMIN_USER_DETAIL: "/admin/user/",
    ADMIN_USER_CREATE: "/admin/user/create",
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
    },
    PLACE_OF_TOUR: {
        EDIT: "Edit Place of Tour",
        CREATE: "Create Place of Tour",
    },
    TOUR: {
        EDIT: "Edit Tour",
        CREATE: "Create Tour",
    },
    USER: {
        EDIT: "Edit Role User",
        CREATE: "Create User",
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

export const AVATAR_LINK = [
    {
        id: 1,
        name: "PROFILE",
        link: "/myaccount/profile",
        role:"member"
    },
    {
        id: 2,
        name: "HISTORY TOUR",
        link: "/myaccount/history-tour",
        role: "member"
    },
    {
        id:3,
        name: "ADMIN",
        link: "/admin/village",
        role: 'admin'
    },
    {
        id: 4,
        name: "LOGOUT",
        link: "/login",
        role: 'member'
    }
]

export const HISTORY_TOUR_DEFAULT = {
    tourId: 0,
    name: "",
    ticket: 0,
    phone1: 0,
    phone2: 0,
    dateStart: "",
    dateEnd:""
}

export const ROLE_USER = [
    {   
        id: 1,
        role: process.env.REACT_APP_MEMBER
    },
    {   
        id: 2,
        role: process.env.REACT_APP_ADMIN
    },
    {   
        id: 3,
        role: process.env.REACT_APP_SUPER_USER
    },
    {   
        id: 4,
        role: process.env.REACT_APP_VILLAGE_USER
    },

]


export const USER_DEFAULT = {
    email:'',
    id: 0,
    name: '',
    password: '',
    phone1: 0,
    phone2: 0,
    role: 'member'
}