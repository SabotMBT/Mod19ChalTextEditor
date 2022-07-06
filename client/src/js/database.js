import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  try {
    const jateDb = await openDB("jate", 1);
    const text = jateDb.transaction("jate", "readwrite");
    const store = text.objectStore("jate");
    const request = store.put({ id: 1, content: content });
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch (err) {
    console.error("putDb not implemented");
  }
};

export const getDb = async () => {
  try {
    console.log("GET all from the database");
    const jateDb = await openDB("jate", 1);
    const text = jateDb.transaction("jate", "readonly");
    const store = text.objectStore("jate");
    const request = store.get(1);
    const result = await request;
    console.log("result.value", result);
    return result && result.content;
  } catch (err) {
    console.error("getDb not implemented");
  }
};

initdb();
