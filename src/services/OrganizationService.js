import axios from "axios";

const SERVER_URL = "http://188.95.89.161/api";
// GET ​/api​/Package

//---------------------------- Organization-------------------------------
// GET
// ​/api​/Organization
export const getAllOrganization = () => {
  // const url = `${SERVER_URL}/Organization​/types`;
  const url = "http://188.95.89.161/api/Organization";
  return axios.get(url);
};
// POST
// ​/api​/Organization

// -------------------------------- type ------------------------------------------- start
// GET
// ​/api​/Organization​/types

export const getType = () => {
  // const url = `${SERVER_URL}/Organization​/types`;
  const url = "http://188.95.89.161/api/Organization/types";
  return axios.get(url);
};

// POST
// ​/api​/Organization​/types
export const createType = (type) => {
  const url = "http://188.95.89.161/api/Organization/types";
  // const url = `${SERVER_URL}/types`;
  return axios.post(url, type);
};

// GET
// ​/api​/Organization​/types​/{id}

export const getType_ID = (typeId) => {
  const url = `${SERVER_URL}/types​/${typeId}`;
  return axios.put(url, typeId);
};
// PUT
// ​/api​/Organization​/types​/{id}
export const updateType = (type, typeId) => {
  const url = `${SERVER_URL}/types​/${typeId}`;
  return axios.put(url, type);
};

// DELETE
// ​/api​/Organization​/types​/{id}
export const deleteType = (typeId) => {
  const url = `${SERVER_URL}/types​/${typeId}`;
  return axios.delete(url);
};

// --------------------------------  type  -----------------end

// GET
// ​/api​/Organization​/{id}

// PUT
// ​/api​/Organization​/{id}

// DELETE
// ​/api​/Organization​/{id}

// GET
// ​/api​/Organization​/complement-type

export const getComplementType = () => {
  // const url = `${SERVER_URL}/Organization​/complement-type`;
  const url = " http://188.95.89.161/api/Organization/complement-type";

  return axios.get(url);
};

// POST
// ​/api​/Organization​/complement-type

// PUT
// ​/api​/Organization​/complement-type​/{id}

// DELETE
// ​/api​/Organization​/complement-type​/{id}

// GET
// ​/api​/Organization​/complement-value

export const getComplementValue = () => {
  // http://188.95.89.161/api/Organization/complement-value
  const url = " http://188.95.89.161/api/Organization/complement-value";
  return axios.get(url);
};

// POST
// ​/api​/Organization​/complement-value

// PUT
// ​/api​/Organization​/complement-value​/{id}

// DELETE
// ​/api​/Organization​/complement-value​/{id}

// PUT
// ​/api​/Organization​/{id}​/image

// // POST ​/api​/Package
// export const createPackage = (packagelist) => {
//   // http://188.95.89.161/api/Package/category
//   const url = `${SERVER_URL}/package`;
//   return axios.post(url, packagelist);
// };

// // GET
// // ​/api​/Package​/category
// export const getAllcategory = () => {
//   const url = `${SERVER_URL}/Package/category`;
//   return axios.get(url);
// };

// // POST
// // ​/api​/Package​/category
// export const createCategory = (category) => {
//   const url = `${SERVER_URL}/package`;
//   return axios.post(url, category);
// };

// // GET
// // ​/api​/Package​/{id}
// export const getPackage = () => {
//   const url = `${SERVER_URL}/package`;
//   return axios.get(url);
// };

// // PUT
// // ​/api​/Package​/{id}
// export const updatePackage = (packagelist, packageId) => {
//   const url = `${SERVER_URL}/package/${packageId}`;
//   return axios.put(url, packagelist);
// };

// // DELETE
// // ​/api​/Package​/{id}

// // PUT
// // ​/api​/Package​/category​/{id}
// export const updateCategory = (category, CategoryID) => {
//   const url = `${SERVER_URL}/package/${CategoryID}`;
//   return axios.put(url, category);
// };

// // DELETE
// // ​/api​/Package​/category​/{id}

// // PUT
// // ​/api​/Package​/{id}​/image
// export const updatepackageImage = (category, CategoryID) => {
//   const url = `${SERVER_URL}/package/${CategoryID}`;
//   return axios.put(url, category);
// };

// // PUT
// // ​/api​/Package​/{id}​/file

// export const deletePackage = (contactId) => {
//   const url = `${SERVER_URL}/package/${contactId}`;
//   return axios.delete(url);
// };

// // PUT
// // ​/api​/Package​/{id}​/image
// export const updatepackageFile = (category, CategoryID) => {
//   const url = `${SERVER_URL}/package/${CategoryID}`;
//   return axios.put(url, category);
// };
