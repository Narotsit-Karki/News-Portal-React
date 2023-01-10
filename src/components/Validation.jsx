const valiDateData = () => {
    const aplhaExp = /^[a-zA-Z]+$/;
    const emailExp = /^\w+([\.]?\w+)*@([\.]?\w+)*(\.\w{2,3})$/
    

    if(firstname.value == "" || !firstname.value.match(aplhaExp)){
        setFirstname({
            ...firstname,
            has_error: true,
            error_message:'enter a valid firstname'
        })
        return false
        }
    
    if(lastname.value == ""||!lastname.value.match(aplhaExp)){
       setLastname({
            ...lastname,
            has_error:true,
            error_message:'enter a valid last name'})
        return false
    }

    if( username.value==""||!username.value.match(aplhaExp)){
       setUsername({
        ...username,
        has_error:true,
        error_message:'enter a valid username'
       })
        return false
    }

    if(email.value==""|| !email.value.match(emailExp)){
       setEmail({
        ...email,
        has_error:true,
        error_message: 'enter a valid email address'
     })
        return false
    }

    if(password.value==""){
        setPassword({
            ...password,
            has_error:true,
            error_message:'password field cannot be empty'
        })
        return false
    }else if(password.value.length<8){
       setPassword({
        ...password,
        has_error:true,
        error_message: 'password length must be greater than 8'
       })
        return false
    }

    if(confirmpassword.value != password.value){
       setConfirmPassword({
        ...confirmpassword,
        has_error:true,
        error_message:"password don't match"
       })
        return false
    }
    return true
}
