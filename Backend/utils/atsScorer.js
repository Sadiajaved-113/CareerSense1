import natural from "natural";

export const calculateATSScore = (resumeText, jobText) => {
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(resumeText);
  tfidf.addDocument(jobText);

  let score = 0;

  tfidf.listTerms(0).forEach((item) => {
    score += item.tfidf * tfidf.tfidf(item.term, 1);
  });

  return Math.min(100, Math.round(score));
};
