/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQRCode = /* GraphQL */ `
  subscription OnCreateQRCode($owner: String) {
    onCreateQRCode(owner: $owner) {
      id
      url
      title
      canvas
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateQRCode = /* GraphQL */ `
  subscription OnUpdateQRCode($owner: String) {
    onUpdateQRCode(owner: $owner) {
      id
      url
      title
      canvas
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteQRCode = /* GraphQL */ `
  subscription OnDeleteQRCode($owner: String) {
    onDeleteQRCode(owner: $owner) {
      id
      url
      title
      canvas
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
