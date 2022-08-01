const Auth =
{
    SignUpSuccess : "Sign Up Successfully",
    UsernameError: "Username is already taken",
    EmailError: "Email is already used to",
    passwordMatchError: "password does not match",
    UserRoleError: "Error assigning role to user" ,
    UserNotFound: "Error user not created",
    INVALIDUSER:"Invalid user",
    IncorrectCredential : "Invalid credentials",
    InvalidEmail:"Invalid email",
    emailNotVerified: "Email not verified",
    accountLocked: "Account Locked contact Admin",
    InvalidLink:"Invalid verification link",
    EmailVerified:"Email verified successfully",
    PasswordResetSuccess:"Password reseted successfully"
}

const Redis = 
{
    email: "Invalid token... Contact admin for a new token",
    isVerified:"Email successfully verified",
}

const Program =
{
    TITLE:"A program with same title already exist",
    ERROR: "Couldn't perform action...",
    NOTHING_TO_SHOW:"There are no programs to show "
}

const USER =
{
    ACTION_ERROR:"Couldn't perform action..."
}

const COURSE =
{
    NOT_FOUND : "Course not found"
}
const EMAIL = 
{
    EMAIL_SUBJECT :"Registeration Confirmation",
    PASSWORD_RESET: "Password Reset",
    RESET_SUCCESS:"Password reset link successfully sent to your email",
    
}

const TOKEN =
{
    INVALID_TOKEN:"Invalid token ",
    EXPIRED_TOKEN:"Invalid or expired token"
}

const UNAUTHORIZED = 
{
    AUTHORIZED_REQUEST :"You are not authorized to access this resource"
}

const JOBS = 
{
    QUEUENAME:"baseQueue",
    EMAILVERIFICATION:"email",
    AWARD :"award",
    RESETLINK: "reset_link",
    ADMINCREATED: "admin_created"
}
export default {Auth,Redis,Program,USER,TOKEN,COURSE,EMAIL,UNAUTHORIZED,JOBS}