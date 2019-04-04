import axios from "axios";

const baseURL = `https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api`;

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

export const getById = id => client.get(`/id/${id}.json`);
export const getAllHeroes = id => client.get(`/all.json`);
