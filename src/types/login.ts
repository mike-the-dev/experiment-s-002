export interface Login {
  emailAddress: string;
  password: string;
};

export interface LoginUserResponse {
  authorization: {
    user: {
      account: {
        id: string;
        company: string;
      };
    };
    tokens: {
      access: string;
      refresh: string;
    }
  };
};