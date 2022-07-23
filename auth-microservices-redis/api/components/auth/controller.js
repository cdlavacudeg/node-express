const bcrypt = require("bcrypt");
const auth = require("../../../auth");
TABLE = "auth";

module.exports = function (injecteStore) {
  let store = injecteStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    return store.upsert(TABLE, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });
    return bcrypt.compare(password, data.password).then((IsEqual) => {
      if (IsEqual) {
        //Generate token
        return auth.sign(data);
      } else {
        throw new Error("Invalid value");
      }
    });
  }
  return {
    upsert,
    login,
  };
};
