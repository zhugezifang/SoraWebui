import { v4 as uuidv4 } from 'uuid';
import {getDb} from "~/utils/db";

const db = getDb();

export const checkAndSaveUser = async (name:string, email:string, image:string) => {
  const results = await db.query(`select * from user_info where email=$1;`, [email]);
  const users = results.rows;
  if (users.length <= 0) {
    const result = {
      user_id: '',
      name: '',
      email: '',
      image: '',
    }
    // 新增
    try {
      const strUUID = uuidv4();
      const text = 'insert into user_info(user_id,name,email,image) values($1,$2,$3,$4) RETURNING *';
      const values = [strUUID,name,email,image]
      await db.query(text, values);
      result.user_id = strUUID;
      result.name = name;
      result.email = email;
      result.image = image;
      return result;
    } catch (e) {
      console.log(e)
      return result;
    }
  } else {
    // 更新
    const user = users[0];
    const text = 'update user_info set name=$1,image=$2,updated_at=now() where id=$3';
    const values = [name, image, user.id];
    await db.query(text, values);
    return user;
  }
}

export const getUserById = async (user_id) => {
  const text = 'select * from user_info where user_id=$1';
  const values = [user_id];
  const results = await db.query(text, values);
  const users = results.rows;
  if (users.length > 0) {
    const user = users[0];
    return {
      user_id: user_id,
      name: user.name,
      email: user.email,
      image: user.image,
      status: 1
    }
  }
  return {
    user_id: user_id,
    name: '',
    email: '',
    image: '',
    status: 0
  }
}

export const getUserByEmail = async (email) => {

  const text = 'select * from user_info where email=$1';
  const values = [email];
  const results = await db.query(text, values);
  const users = results.rows;
  if (users.length > 0) {
    const user = users[0];
    return {
      user_id: user.user_id,
      name: user.name,
      email: email,
      image: user.image,
      status: 1
    }
  }
  return {
    user_id: '',
    name: '',
    email: email,
    image: '',
    status: 0
  }
}
