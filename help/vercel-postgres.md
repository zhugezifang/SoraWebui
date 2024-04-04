### 1. Go to vercel storage
![vercel storage](https://sorawebui.com/vercel/1.jpg)

### 2. Create new postgres database
![Create postgres database](https://sorawebui.com/vercel/2.jpg)

### 3. Create table user_info and works, sql in /sql/init directory, use some database tool like DataGrip to do it.
![init-sql](https://sorawebui.com/vercel/init-sql.jpg)

### 4. Copy paste this config to .env.local and .env.production
![database config](https://sorawebui.com/vercel/3.jpg)

### 5. You can also use your own postgres, config like this
POSTGRES_URL="postgres://postgres:pass1234@localhost:5432/sorawebui"
