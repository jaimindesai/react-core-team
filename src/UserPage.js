import React, { Placeholder } from "react";
import {
  coreContributorListJSON,
  userProfileJSON,
  userRepositoriesListJSON
} from "../api/data";

export default function UserPage({ id }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 20rem)",
        gridGap: "1rem",
        alignItems: "start"
      }}
    >
      <RepositorisList id={id} />
    </div>
  );
}

const RepositorisList = ({ id }) => {
  const repos = userRepositoriesListJSON[id];
  return (
    <ul
      style={{
        display: "grid",
        gridGap: "1rem",
        padding: 0,
        margin: 0
      }}
    >
      {repos.map(repo => <Repository key={repo.name} {...repo} />)}
    </ul>
  );
};

const Repository = ({ description, name, url }) => (
  <li
    style={{
      display: "grid",
      gridGap: "0.5rem",
      padding: "1rem",
      backgroundColor: "var(--color-buttonBg)",
      border: "1px solid var(--color-buttonBorder)",
      borderRadius: "1rem"
    }}
  >
    <strong>
      <a href={url}>{name}</a>
    </strong>
    <div>{description}</div>
  </li>
);
