import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'src', 'content', 'questoes', 'cardio.ts');

const content = fs.readFileSync(FILE_PATH, 'utf-8');

// Strategy: Find each question block (from "id:" to the closing "},") and process its alternativas
// We'll use a more robust approach: split by question boundaries

// Split the file into lines for easier processing
const lines = content.split('\n');

// Find question boundaries: each question starts with "  {" and ends with "  },"
// Actually the structure is:
// export const QUESTOES_CARDIO: Questao[] = [
//   {  <- question start
//     id: "...",
//     ...
//     alternativas: [...],
//   },
// ]

// Let's parse more carefully using a state machine approach

const outputLines = [];
let i = 0;
let inAlternativas = false;
let alternativasStart = -1;
let bracketDepth = 0;
let alternativasLines = [];

function processAlternativasBlock(blockLines) {
  const text = blockLines.join('\n');
  
  // Find all comments in this block
  const commentRegex = /comentario:\s*"([^"]*)"/g;
  const comments = [];
  let match;
  while ((match = commentRegex.exec(text)) !== null) {
    comments.push({ 
      full: match[0], 
      content: match[1],
      index: match.index 
    });
  }
  
  if (comments.length !== 4) {
    return blockLines; // Not a standard 4-alternative block, skip
  }
  
  // Check if all 4 comments are identical (normalized)
  const normalized = comments.map(c => c.content.trim().replace(/\s+/g, ' ').toLowerCase());
  if (!(normalized[0] === normalized[1] && normalized[1] === normalized[2] && normalized[2] === normalized[3])) {
    return blockLines; // Already distinct
  }
  
  const baseComment = comments[0].content;
  
  // Generate distinct comments
  const newComments = [
    baseComment, // A (correct) - keep original
    `Esta alternativa não corresponde à conduta recomendada. ${baseComment}`,
    `Esta opção diverge da diretriz atual. ${baseComment}`,
    `Esta resposta não reflete o padrão-ouro. ${baseComment}`
  ];
  
  // Replace comments in the block text
  let newText = text;
  let commentIdx = 0;
  newText = text.replace(/comentario:\s*"([^"]*)"/g, () => {
    return `comentario: "${newComments[commentIdx++]}"`;
  });
  
  return newText.split('\n');
}

// Parse the file and process each alternativas block
const output = [];
let i = 0;
const inAlternativasStack = [];

while (i < lines.length) {
  const line = lines[i];
  
  // Check if this line starts an alternativas block
  if (line.trim().startsWith('alternativas: [')) {
    // Found start of alternativas block
    inAlternativasStack.push({ start: outputLines.length, lines: [line] });
    bracketDepth = 1;
    i++;
    
    // Collect the rest of the block
    while (i < lines.length && bracketDepth > 0) {
      const l = lines[i];
      // Count brackets
      for (const char of l) {
        if (char === '[') bracketDepth++;
        else if (char === ']') bracketDepth--;
      }
      inAlternativasStack[inAlternativasStack.length - 1].lines.push(l);
      if (bracketDepth === 0) break;
      i++;
    }
    
    // Process the collected block
    const blockLines = inAlternativasStack.pop().lines;
    const processedLines = processAlternativasBlock(blockLines);
    outputLines.push(...processedLines);
  } else {
    outputLines.push(line);
  }
  i++;
}

// Write the fixed file
fs.writeFileSync(FILE_PATH, output.join('\n'), 'utf-8');
console.log('Done fixing Cardio repetitions (v2)!');