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
    } else if(typeof Number(phone) !== 'number') {
        error.phone = "Số điện thoại không hợp lệ"
    }
    return error;
}

export const validationBookTour = (name, phoneOne, phoneTwo) => {
    let error = {}

    if(!name) {
        error.name = "Hãy nhập tên của bạn"
    }

    if(!phoneOne) {
        error.phoneOne = "Hãy nhập số điện thoại"
    } else if(phoneOne.length > 11 || phoneOne.length < 9) {
        error.phoneOne = "Số điện thoại không hợp lệ"
    }

    if(!phoneTwo) {
        error.phoneTwo = "Hãy nhập số điện thoại"
    } else if(phoneTwo.length > 11 || phoneTwo.length < 9 ) {
        error.phoneTwo = "Số điện thoại không hợp lệ"
    }

    return error;
}

export const validationChangePassword = (oldPassword, newPassword, confirmPassword) => {
    let error = {}

    if(!oldPassword) {
        error.oldPassword = "Hãy nhập mật khẩu"
    } 

    if(!newPassword) {
        error.newPassword = "Hãy nhập mật khẩu"
    }  else if(oldPassword === newPassword) {
        error.newPassword = "Mật khẩu mới không được trùng mật khẩu cũ";
    }
 
    if(confirmPassword !== newPassword){
        error.confirmPassword = "Mật khẩu không trùng nhau"
    } 

    return error;
}