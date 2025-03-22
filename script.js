const sections = {
    "Mathematics": ["Percentage", "Profit & Loss", "Discount", "Simple Interest", "Compound Interest", "Ratio", "Proportion", "Ages", "Partnership", "Mixture", "Alligation", "Average", "Simplification", "Surds & Indices", "Number System", "Arithmetic & Geometric Progression", "HCF & LCM", "Algebra", "Quadratic Equation", "Trigonometry", "Maxima & Minima (Trigonometry)", "Height & Distance", "Geometry", "Coordinate Geometry", "Mensuration 2D", "Mensuration 3D", "Time & Work", "Work & Wages", "Time, Speed & Distance", "Train", "Pipe & Cistern", "Boat & Stream", "Race", "Circular Motion", "Probability", "Data Interpretation", "Statistics"],
    
    "GS-GI": ["Biology", "Chemistry", "Geography", "Polity", "Economics", "Ancient History", "Medieval History", "Modern History", "Static GK", "Physics", "Environmental Science", "Ecology"],
    
    "English": ["Basics of English", "Subject-Verb Agreement", "Tense", "Mood and Conditional", "Verb", "Noun", "Article", "Determiner", "Pronoun", "Question Tag", "Voice Change", "Adjective", "Superfluous Expressions", "Narration Change", "Adverb", "Non-Finite Verb", "Inversion", "Conjunction", "Preposition", "Error Detection (Mixed)", "One-Word Substitution", "Idioms & Phrases", "Synonyms & Antonyms", "Homonyms & Homophones", "Confusable Words", "Root Words Vocabulary", "General Vocabulary", "Cloze Test", "Para Jumble Sentences", "Reading Comprehension", "Mixed Practice"],
    
    "Reasoning": ["Similarity", "Alphabet Test", "Calendar", "Counting Figure", "Dice", "Direction Sense", "Ranking Arrangement", "Seating Arrangement", "Coding-Decoding", "Age Problem", "Blood Relation", "Number Series", "Letter Series", "Alphabet Series", "Alphanumeric Symbol", "Analogy", "ODD One Out", "Missing Number", "Arrangement of Words", "Word Formation", "Clock", "Cube and Cuboid", "Mathematical Operation", "Syllogism", "Venn Diagram", "Coded Inequality", "Input-Output", "Statement-Argument", "Statement-Assumption", "Statement-Conclusion", "Course of Action", "Cause and Effect", "Data Sufficiency", "Decision Making", "Puzzle", "Mirror and Water Image", "Paper Cutting and Folding", "Embedded Figure", "Figure Completion", "Figure Series", "Figure Formation", "Classification", "Dot Situation"]
};

// Function to create a study section
function createSection(name, topics) {
    const sectionId = name.replace(/\s+/g, "-");
    const section = document.createElement("div");
    section.className = "section";
    section.innerHTML = `
        <h2 onclick="toggleTopics('${sectionId}')">${name}</h2>
        <div id="${sectionId}" class="topics">
            <div id="${sectionId}-progress" class="progress">Completed: 0%</div>
            ${topics.map((topic, index) => `
                <label>
                    <input type="checkbox" id="${sectionId}-${index}" onchange="updateProgress('${sectionId}')"> ${topic}
                </label><br>`).join("")}
        </div>`;
    document.getElementById("sections").appendChild(section);
}

// Toggle visibility of topics
function toggleTopics(sectionId) {
    const topicsDiv = document.getElementById(sectionId);
    topicsDiv.style.display = topicsDiv.style.display === "none" ? "block" : "none";
}

// Update section progress
function updateProgress(sectionId) {
    const checkboxes = document.querySelectorAll(`#${sectionId} input[type='checkbox']`);
    const checked = document.querySelectorAll(`#${sectionId} input[type='checkbox']:checked`).length;
    const total = checkboxes.length;
    const percentage = total === 0 ? 0 : Math.round((checked / total) * 100);

    document.getElementById(`${sectionId}-progress`).innerText = `Completed: ${percentage}%`;

    saveProgress();  // Save progress when checkbox state changes
    updateOverallProgress();
}

// Update overall progress
function updateOverallProgress() {
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    const checkedCheckboxes = document.querySelectorAll("input[type='checkbox']:checked").length;
    const total = allCheckboxes.length;
    const overallPercentage = total === 0 ? 0 : Math.round((checkedCheckboxes / total) * 100);

    document.getElementById("overall-progress").innerText = `(Completed: ${overallPercentage}%)`;
}

// Save checkbox states to localStorage
function saveProgress() {
    const progressData = {};
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        progressData[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem("studyTrackerProgress", JSON.stringify(progressData));
}

// Load saved progress from localStorage
function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem("studyTrackerProgress"));
    if (savedProgress) {
        document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
            if (savedProgress.hasOwnProperty(checkbox.id)) {
                checkbox.checked = savedProgress[checkbox.id];
            }
        });
    }
}

// Initialize sections and load progress on page load
document.addEventListener("DOMContentLoaded", function() {
    Object.entries(sections).forEach(([name, topics]) => createSection(name, topics));
    loadProgress();  // Load previous progress
    updateOverallProgress();
});
