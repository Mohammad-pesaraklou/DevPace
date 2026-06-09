type StrOrNull = string | null;

let accessToken: StrOrNull = null;

interface Props {
  getAccessToken: () => StrOrNull;
  setAccessToken: (token: StrOrNull) => void;
}

export const tokenManager: Props = {
  getAccessToken() {
    return accessToken;
  },
  setAccessToken(token: StrOrNull) {
    accessToken = token;
  },
};
