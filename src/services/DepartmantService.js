import axios from "axios";

import configData from "./config.json";
// GET ​/api​/Package

// GET
// ​/api​/Departemants​/organization​/{orgId}
// Get list of all departemants in an organization
// ----------------------------------------

// GET
// ​/api​/Departemants​/{id}
// Get the departemant details
//  ----------------------------------

// PUT
// ​/api​/Departemants​/{id}
//  -----------------------------

// DELETE
// ​/api​/Departemants​/{id}
//  ----------------------

// POST
// ​/api​/Departemants
// Creates a new departemant
//  -----------------------

// GET
// ​/api​/Departemants​/children​/{id}
// ...........................

// GET
// ​/api​/Departemants​/members​/{id}
// ------------------------

export const getAllDepartmentChilds = (id) => {
  const url = `${configData.AddressApi}/Departments/children/${id}?all=true`;
  return axios.get(url);
};
