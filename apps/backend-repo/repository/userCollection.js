"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserData =
  exports.updateUserData =
  exports.fetchUserData =
  exports.addUserData =
    void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const addUserData = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield firebaseConfig_1.db.collection("USERS").doc(id).set(data);
  });
exports.addUserData = addUserData;
const fetchUserData = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const users = yield firebaseConfig_1.db.collection("USERS").get();
    return users.docs.map((doc) => {
      return Object.assign({ id: doc.id }, doc.data());
    });
  });
exports.fetchUserData = fetchUserData;
const updateUserData = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield firebaseConfig_1.db.collection("USERS").doc(id).update(data);
  });
exports.updateUserData = updateUserData;
const deleteUserData = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield firebaseConfig_1.db.collection("USERS").doc(id).delete();
  });
exports.deleteUserData = deleteUserData;
