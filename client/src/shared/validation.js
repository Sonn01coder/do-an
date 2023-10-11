export const validationLogin = (email, password, confirmPassword) => {
    
    let error = {}

    if(!email) {
        error.email = "Hãy nhập email của bạn"
    } else if(!/\S+@\S+\.\S+/.test(email)) {
        error.email = "Email của bạn không chính xác"
    }

    if(!password) {
        error.password ="Hãy nhập mật khẩu"
    } else if(password.length < 6) {
        error.password = "Mật khẩu không đạt yêu cầu"
    }

    if(confirmPassword !== password) {
        error.confirmPassword ="Mật khẩu không trùng nhau"
    } 


    return error
}

export const validationProfile = (name, phone) => {
    let error = {}

    if(!name) {
        error.name = "Hãy nhập tên của bạn"
        error.name = "Hãy nhập tên của bạn"
    }

    if(!phone) {
        error.phone = "Hãy nhập số điện thoại"
    } else if(typeof phone !== 'number') {
        error.phone = "Số điện thoại không hợp lệ"
    }
    return error;
}

export const validationBookTour = (name, email, phoneOne, phoneTwo) => {
    let error = {}

    if(!name) {
        error.name = "Hãy nhập tên của bạn"
    }

    if(!email) {
        error.email = "Hãy nhập email của bạn"
    } else if(!/\S+@\S+\.\S+/.test(email)) {
        error.email = "Email của bạn không chính xác"
    }

    if(!phoneOne) {
        error.phoneOne = "Hãy nhập số điện thoại"
    } else if(typeof phoneOne !== 'number') {
        error.phoneOne = "Số điện thoại không hợp lệ"
    }

    if(!phoneTwo) {
        error.phoneTwo = "Hãy nhập số điện thoại"
    } else if(typeof phoneTwo !== 'number') {
        error.phoneTwo = "Số điện thoại không hợp lệ"
    }

    return error;
}
