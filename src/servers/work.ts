import {getDb} from "~/utils/db";

const db = getDb();
export const checkAndSaveWork = async (
  user_id: string,
  input_text: string,
  revised_prompt: string,
  url: string
) => {

  const results = await db.query('select * from works where user_id=$1 and revised_prompt=$2', [user_id, revised_prompt]);
  const works = results.rows;
  if (works.length <= 0) {
    // insert
    await db.query('insert into works(user_id, input_text, revised_prompt, url) values($1,$2,$3,$4)',
      [user_id, input_text, revised_prompt, url]);
  } else {
    // update
    const work = works[0];
    await db.query('update works set updated_at=now() where id=$1', [work.id]);
  }

}

export const getWorkListByUserId = async (user_id: string) => {
  const results = await db.query('select * from works where user_id=$1 order by updated_at desc', [user_id]);
  const works = results.rows;

  if (works.length > 0) {
    return works;
  }

  return [];
}
