const uniqid = require("uniqid");
const auth = require("../auth");
const TABLE = "user";

module.exports = function (injecteStore) {
  let store = injecteStore;
  if (!store) {
    store = require("../../../store/dummy");
  }
  function list() {
    return store.list(TABLE);
  }
  function get(id) {
    return store.get(TABLE, id);
  }

  async function upsert(body) {
    const user = {
      username: body.username,
      name: body.name,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = uniqid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }
    return store.upsert(TABLE, user);
  }

  async function update(body) {
    const user = {
      id: body.id,
      username: body.username,
      name: body.name,
    };

    return store.update(TABLE, user);
  }

  async function follow(from, to) {
    return store.upsert(TABLE + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  async function following(user) {
    const join = {};
    join[TABLE] = "user_to"; //{user:'user_to'}
    const query = { user_from: user };
    return await store.query(TABLE + "_follow", query, join);
  }

  return {
    list,
    get,
    upsert,
    update,
    follow,
    following,
  };
};
