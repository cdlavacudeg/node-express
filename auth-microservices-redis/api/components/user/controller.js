const uniqid = require("uniqid");
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
  function upsert(body) {
    const user = {
      name: body.name,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = uniqid();
    }
    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert,
  };
};
