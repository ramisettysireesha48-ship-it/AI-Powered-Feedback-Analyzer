const feedbackInput = document.getElementById("feedback");
const charCount = document.getElementById("charCount");

feedbackInput.addEventListener("input", function () {
    const count = feedbackInput.value.length;
    charCount.textContent = `${count} characters`;
});

function analyzeFeedback() {

    const feedback = feedbackInput.value.trim();

    if (feedback === "") {
        alert("Please enter some feedback first.");
        return;
    }

    const text = feedback.toLowerCase();

    // Positive and negative word lists
    const positiveWords = [
        "good",
        "great",
        "excellent",
        "amazing",
        "awesome",
        "love",
        "loved",
        "helpful",
        "happy",
        "best",
        "perfect",
        "wonderful",
        "satisfied",
        "fast",
        "easy",
        "friendly",
        "useful",
        "fantastic",
        "nice",
        "comfortable"
    ];

    const negativeWords = [
        "bad",
        "poor",
        "terrible",
        "worst",
        "hate",
        "hated",
        "slow",
        "difficult",
        "problem",
        "problems",
        "disappointed",
        "disappointing",
        "unhappy",
        "expensive",
        "late",
        "error",
        "errors",
        "issue",
        "issues",
        "broken",
        "hard"
    ];

    let positiveScore = 0;
    let negativeScore = 0;

    positiveWords.forEach(word => {
        const regex = new RegExp("\\b" + word + "\\b", "g");
        const matches = text.match(regex);

        if (matches) {
            positiveScore += matches.length;
        }
    });

    negativeWords.forEach(word => {
        const regex = new RegExp("\\b" + word + "\\b", "g");
        const matches = text.match(regex);

        if (matches) {
            negativeScore += matches.length;
        }
    });

    let sentiment;
    let score;
    let insight;

    if (positiveScore > negativeScore) {

        sentiment = "Positive";
        score = Math.min(
            100,
            50 + (positiveScore - negativeScore) * 10
        );

        insight =
            "The feedback has a positive tone. Users appear satisfied with the experience. Consider maintaining the strengths mentioned in the feedback.";

    } else if (negativeScore > positiveScore) {

        sentiment = "Negative";
        score = Math.max(
            0,
            50 - (negativeScore - positiveScore) * 10
        );

        insight =
            "The feedback contains negative concerns. Review the mentioned issues and focus on improving the areas causing dissatisfaction.";

    } else {

        sentiment = "Neutral";
        score = 50;

        insight =
            "The feedback appears neutral. More detailed information may be useful to understand the user's overall experience.";
    }

    // Extract keywords
    const stopWords = [
        "the",
        "and",
        "was",
        "were",
        "this",
        "that",
        "with",
        "for",
        "have",
        "has",
        "had",
        "are",
        "you",
        "your",
        "from",
        "very",
        "but",
        "not",
        "our",
        "they",
        "their",
        "about",
        "there",
        "would",
        "could",
        "should",
        "been",
        "will",
        "can",
        "into",
        "just",
        "its"
    ];

    const words = text
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 3)
        .filter(word => !stopWords.includes(word));

    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    const keywords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(item => item[0]);

    document.getElementById("sentiment").textContent = sentiment;
    document.getElementById("score").textContent = score + "%";
    document.getElementById("keywords").textContent =
        keywords.length > 0 ? keywords.join(", ") : "None";

    document.getElementById("insightText").textContent = insight;

    document.getElementById("status").textContent = "Analysis Complete";

    // Change sentiment color
    const sentimentElement = document.getElementById("sentiment");

    if (sentiment === "Positive") {
        sentimentElement.style.color = "#16a34a";
    } else if (sentiment === "Negative") {
        sentimentElement.style.color = "#dc2626";
    } else {
        sentimentElement.style.color = "#ca8a04";
    }

    // Scroll to results
    document.querySelector(".results").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}