
import natural from "natural";
import { removeStopwords } from "stopword";

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

// Clean & normalize text safely
const cleanText = (text = "") => {
  return removeStopwords(
    tokenizer
      .tokenize(String(text).toLowerCase())
      .filter(t => t.length > 2)
  ).join(" ");
};

// Cosine similarity
const cosineSimilarity = (vecA, vecB) => {
  let dot = 0, normA = 0, normB = 0;

  for (const key in vecA) {
    dot += (vecA[key] || 0) * (vecB[key] || 0);
    normA += vecA[key] ** 2;
  }

  for (const key in vecB) {
    normB += vecB[key] ** 2;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
};

export const predictCategory = (resumeTokens, dataset) => {
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return "Other";
  }

  const resumeText = cleanText(resumeTokens.join(" "));
  const tfidf = new TfIdf();

  // Add resume as first document
  tfidf.addDocument(resumeText);

  let bestCategory = "Other";
  let bestScore = 0;

  dataset.forEach((item, index) => {
    tfidf.addDocument(cleanText(item.resume));

    const resumeVector = {};
    const datasetVector = {};

    tfidf.listTerms(0).forEach(t => {
      resumeVector[t.term] = t.tfidf;
    });

    tfidf.listTerms(index + 1).forEach(t => {
      datasetVector[t.term] = t.tfidf;
    });

    const similarity = cosineSimilarity(resumeVector, datasetVector);

    if (similarity > bestScore) {
      bestScore = similarity;
      bestCategory = item.category;
    }
  });

  return bestCategory;
};
