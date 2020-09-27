const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// nur zur internen Verarbeitung
const getOnlyFirstName = (name) => {
  let spaceindex = name.indexOf(" ");
  let firstname = "";
  if (spaceindex === -1) {
    firstname = name;
  } else {
    firstname = name.substring(0, spaceindex);
  }
  return firstname;
};

const createProfileOnAuth = (userRecord, context) => {
  const { email, phoneNumber, uid, displayName } = userRecord;
  if (displayName) {
    return db
      .collection("users")
      .doc(uid)
      .set({
        email,
        phoneNumber,
        hasSignedInOnce: true,
        name: getOnlyFirstName(displayName),
      })
      .catch(console.error);
  } else {
    const recieveUserName = async (userid) => {
      let user = await admin.auth().getUser(userid);
      user = user.toJSON();
      console.log(user);
      username = user.displayName;
      name = username;
    };
    let name;
    return recieveUserName(uid)
      .then(() => {
        return admin.auth().updateUser(uid, {
          displayName: getOnlyFirstName(name),
        });
      })
      .then(() => {
        return db
          .collection("users")
          .doc(uid)
          .set({
            email,
            phoneNumber,
            hasSignedInOnce: false,
            name: getOnlyFirstName(name),
          });
      })
      .catch(console.error);
  }
};

const setPutztIDForUser = (data, context) => {
  const code = data.code;
  const name = data.name;
  db.collection("putzt-app")
    .where("invitecode", "==", code)
    .get()
    .then((snapshot) => {
      let dbid;
      let idcount;
      snapshot.forEach((doc) => {
        dbid = doc.id;
        idcount = doc.data().idcount;
      });
      let newidcount = ++idcount;
      db.collection("putzt-app").doc(dbid).update({ idcount: newidcount });
      db.collection("putzt-app")
        .doc(dbid)
        .collection("putzplan")
        .doc(context.auth.uid)
        .set({ name: name, id: idcount });
      return db
        .collection("users")
        .doc(context.auth.uid)
        .update({ putztID: dbid });
    })
    .catch(console.error);
};

const createPutzgroup = (data, context) => {
  const name = data.name;

  db.collection("putzt-app")
    .add({
      weeknumber: 0,
      lastupdate: null,
      rooms: {
        bathrooms: ["Bad 1", "Bad 2"],
        otherrooms: ["Müll", "Küche", "Wohnen"],
      },
      firstDrawDone: false,
      idcount: 1,
    })
    .then((docRef) => {
      db.collection("putzt-app")
        .doc(docRef.id)
        .update({
          invitecode: docRef.id.substr(0, 6),
        });
      db.collection("putzt-app")
        .doc(docRef.id)
        .collection("putzplan")
        .doc(context.auth.uid)
        .set({ name: name, id: 0 });
      return db
        .collection("users")
        .doc(context.auth.uid)
        .update({ putztID: docRef.id });
    })
    .catch(console.error);
};

const setRausvotenIDForUser = (data, context) => {
  const code = data.code;
  const name = data.name;

  db.collection("rausvoten-game")
    .where("invitecode", "==", code)
    .get()
    .then((snapshot) => {
      let dbid;
      snapshot.forEach((doc) => {
        dbid = doc.id;
      });
      return db
        .collection("users")
        .doc(context.auth.uid)
        .update({ rausvotenActiveID: dbid, rausvotenOldID: admin.firestore.FieldValue.arrayUnion(dbid) });
    })
    .catch(console.error);
}

const createRausvotengame = (data, context) => {
  const name = data.name;
  db.collection("rausvoten-game")
    .add({
      active: true
    })
    // ID kann erst nach dem .add abgefangen werden!
    .then((docRef) => {
      db.collection("rausvoten-game")
        .doc(docRef.id)
        .update({
          invitecode: docRef.id.substr(0, 6),
        });
      return db
        .collection("users")
        .doc(context.auth.uid)
        .update({ rausvotenActiveID: docRef.id, rausvotenOldID: admin.firestore.FieldValue.arrayUnion(docRef.id) });
    })
    .catch(console.error);
};

module.exports = {
  createProfileOnAuth: functions
    .region("europe-west3")
    .auth.user()
    .onCreate(createProfileOnAuth),
  setPutztIDForUser: functions
    .region("europe-west3")
    .https.onCall(setPutztIDForUser),
  createPutzgroup: functions
    .region("europe-west3")
    .https.onCall(createPutzgroup),
  createRausvotengame: functions
    .region("europe-west3")
    .https.onCall(createRausvotengame),
  setRausvotenIDForUser: functions
    .region("europe-west3")
    .https.onCall(setRausvotenIDForUser),
};