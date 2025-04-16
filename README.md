
## Advanced Authentication in Nextjs
    - signup, login
    - forget password
    - verify email

# setup
    - initialize a nextjs project with typescript
    - npx create-next-app@latest

# Configurations 
    - Setup environment variables
    - setup a mongoDb project, add url, dbname

    DB :
    - Define schema and user model
    - Initialize Db connection instance
    
    Sending Email:
    - will use a service called nodemailer >> npm i nodemailer
    - will define a function SendEmail 
        - parameters --> email(whom to send), emailType(verification or forgot password), userId