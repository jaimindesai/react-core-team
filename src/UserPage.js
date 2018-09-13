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
      <UserDetails id={id} />
      <RepositorisList id={id} />
    </div>
  );
}

const UserDetails = ({ id }) => {
  const user = userProfileJSON[id];
  return (
    <div
      style={{
        display: "grid",
        gridGap: "0.5rem",
        width: "20rem",
        padding: "1rem",
        backgroundColor: "var(--color-buttonBg)",
        border: "1px solid var(--color-buttonBorder)",
        borderRadius: "1rem"
      }}
    >
      <UserPicture source={user.image} />
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "var(--color-pageTextDark)"
        }}
      >
        {user.name}
      </div>
      <div style={{ fontSize: "1.25rem" }}>{user.id}</div>
      {user.tagline !== null && <div>{user.tagline}</div>}
      <hr
        style={{
          width: "100%",
          height: "1px",
          border: "none",
          backgroundColor: "#ddd"
        }}
      />
    </div>
  );
};

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

function Img({ src, alt, ...rest }) {
  return <img src={src} alt={alt} {...rest} />;
}

function UserPicture({ source }) {
  return (
    <Img
      src={source}
      alt="profile picture"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "0.5rem"
      }}
    />
  );
}
