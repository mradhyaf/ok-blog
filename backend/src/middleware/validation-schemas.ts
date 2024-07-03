import { Schema } from "express-validator";

export const authUserValidationSchema: Schema = {
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
    in: "body",
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    in: "body",
  },
};

export const createUserValidationSchema: Schema = {
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
    in: "body",
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    in: "body",
  },
};

export const getFollowersValidationSchema: Schema = {
  emails: {
    notEmpty: {
      bail: true,
      errorMessage: "At least one email must be given",
    },
    customSanitizer: {
      options: (value: string) => value.split(","),
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
    in: "query",
  },
};

export const createFollowsRelationshipValidationSchema: Schema = {
  follower: {
    notEmpty: {
      errorMessage: "Follower cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid follower email",
    },
    in: "body",
  },
  followed: {
    notEmpty: {
      errorMessage: "Follower cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid followed email",
    },
    in: "body",
  },
};

export const createBlocksRelationshipValidationSchema: Schema = {
  blocker: {
    notEmpty: {
      errorMessage: "Follower cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid blocker email",
    },
    in: "body",
  },
  blocked: {
    notEmpty: {
      errorMessage: "Follower cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid blocked email",
    },
    in: "body",
  },
};

export const getPostsPreviewValidationSchema: Schema = {
  reader: {
    notEmpty: {
      errorMessage: "Reader must be provided",
    },
    isEmail: {
      errorMessage: "Invalid reader email",
    },
    in: "query",
  },
  author: {
    optional: true,
    isEmail: {
      errorMessage: "Invalid author email",
    },
    in: "query",
  },
};

export const getPostByIdValidationSchema: Schema = {
  id: {
    isInt: {
      options: {
        allow_leading_zeroes: false,
      },
      errorMessage: "Invalid post id",
    },
    in: "params",
  },
};

export const createPostValidationSchema: Schema = {
  author: {
    notEmpty: {
      errorMessage: "Reader must be provided",
    },
    isEmail: {
      errorMessage: "Invalid reader email",
    },
    in: "body",
  },
  title: {
    notEmpty: {
      errorMessage: "Post title is required",
    },
    isAscii: {
      errorMessage: "All characters in title must be ASCII",
    },
    in: "body",
  },
  body: {
    notEmpty: {
      errorMessage: "Post body is required",
    },
    isAscii: {
      errorMessage: "All characters in body must be ASCII",
    },
    in: "body",
  },
};
