import stopword from "stopword";

export const preprocessText = (text) => {
  text = text.toLowerCase().replace(/[^a-z\s]/g, "");
  let tokens = text.split(/\s+/);
  tokens = stopword.removeStopwords(tokens);
  return tokens;
};
