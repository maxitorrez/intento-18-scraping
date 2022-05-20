import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(1).stores({
  profiles: "++id, fullname, pruebaExperience, pruebaEducation", // Primary key and indexed props
  education: "++id, place, degree, period",
  experience: "++id, role,period, place,country",
});
