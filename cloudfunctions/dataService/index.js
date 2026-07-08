const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

const collections = {
  profile: "profiles",
  dailyLogs: "daily_logs",
  workoutLogs: "workout_logs",
  cardioLogs: "cardio_logs"
};

function now() {
  return db.serverDate();
}

function cleanData(data) {
  const value = { ...data };
  delete value._id;
  delete value._openid;
  delete value.createdAt;
  delete value.updatedAt;
  return value;
}

async function getProfile(openid) {
  const result = await db.collection(collections.profile).where({ _openid: openid }).limit(1).get();
  return result.data[0] || null;
}

async function saveProfile(openid, profile) {
  const data = cleanData(profile);
  const existing = await getProfile(openid);

  if (existing) {
    await db.collection(collections.profile).doc(existing._id).update({
      data: {
        ...data,
        updatedAt: now()
      }
    });
    return { ok: true, id: existing._id };
  }

  const result = await db.collection(collections.profile).add({
    data: {
      _openid: openid,
      ...data,
      createdAt: now(),
      updatedAt: now()
    }
  });

  return { ok: true, id: result._id };
}

async function listByDate(openid, collection) {
  const result = await db.collection(collection).where({ _openid: openid }).orderBy("date", "desc").get();
  return result.data;
}

async function saveByDate(openid, collection, log) {
  const data = cleanData(log);
  const result = await db.collection(collection).where({ _openid: openid, date: data.date }).limit(1).get();

  if (result.data[0]) {
    await db.collection(collection).doc(result.data[0]._id).update({
      data: {
        ...data,
        updatedAt: now()
      }
    });
    return { ok: true, id: result.data[0]._id };
  }

  const created = await db.collection(collection).add({
    data: {
      _openid: openid,
      ...data,
      createdAt: now(),
      updatedAt: now()
    }
  });

  return { ok: true, id: created._id };
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const { action, payload } = event;

  switch (action) {
    case "getProfile":
      return getProfile(OPENID);
    case "saveProfile":
      return saveProfile(OPENID, payload);
    case "listDailyLogs":
      return listByDate(OPENID, collections.dailyLogs);
    case "saveDailyLog":
      return saveByDate(OPENID, collections.dailyLogs, payload);
    case "listWorkoutLogs":
      return listByDate(OPENID, collections.workoutLogs);
    case "saveWorkoutLog":
      return saveByDate(OPENID, collections.workoutLogs, payload);
    case "listCardioLogs":
      return listByDate(OPENID, collections.cardioLogs);
    case "saveCardioLog":
      return saveByDate(OPENID, collections.cardioLogs, payload);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
