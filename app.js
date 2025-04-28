// app.js

// Import required modules
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    const filePath = path.join(__dirname, 'declaration.txt');
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err.message);
        return '';
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object<string, number>} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const wordCount = {};
    const words = content.toLowerCase().split(/\W+/).filter(Boolean);

    for (const word of words) {
        wordCount[word] = (wordCount[word] || 0) + 1;
    }

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word);
    } else if (count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object<string, number>} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).filter(Boolean).map(token => {
            const count = wordCount[token.toLowerCase()] || 0;
            return colorWord(token, count);
        })
        .join(' ') + ' ';

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    if (content) {
        const wordCount = getWordCounts(content);
        printColoredLines(content, wordCount);
    }
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// Export the functions for testing
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile,
};
