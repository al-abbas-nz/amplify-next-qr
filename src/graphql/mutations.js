/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQRCode = /* GraphQL */ `
  mutation CreateQRCode(
    $input: CreateQRCodeInput!
    $condition: ModelQRCodeConditionInput
  ) {
    createQRCode(input: $input, condition: $condition) {
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
export const updateQRCode = /* GraphQL */ `
  mutation UpdateQRCode(
    $input: UpdateQRCodeInput!
    $condition: ModelQRCodeConditionInput
  ) {
    updateQRCode(input: $input, condition: $condition) {
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
export const deleteQRCode = /* GraphQL */ `
  mutation DeleteQRCode(
    $input: DeleteQRCodeInput!
    $condition: ModelQRCodeConditionInput
  ) {
    deleteQRCode(input: $input, condition: $condition) {
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
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
