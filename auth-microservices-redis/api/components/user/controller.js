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

  return {
    list,
    get,
    upsert,
  };
};
