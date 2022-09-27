import axios from "axios";
import configData from "./config.json";

// Manager

// GET
// ​/api​/identity​/manager

// POST
// ​/api​/identity​/manager​/login

// POST
// ​/api​/identity​/manager​/register​/{orgId}

// POST
// ​/api​/identity​/manager​/register-exe​/{orgId}

// GET
// ​/api​/identity​/manager​/organization​/{orgId}

// GET
// ​/api​/identity​/manager​/public​/{username}

// GET
// ​/api​/identity​/manager​/username

// PUT
// ​/api​/identity​/manager​/{username}​/image

// GET
// ​/api​/Package

export const getManager = (username) => {
	const url = `${configData.AddressApi}/identity/manager/username?username=${username}`;
	return axios.get(url);
};