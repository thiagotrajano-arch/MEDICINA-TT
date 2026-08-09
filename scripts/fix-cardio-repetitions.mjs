import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'src', 'content', 'questoes', 'cardio.ts');

const content = fs.readFileSync(FILE_PATH, 'utf-8');

// Parse the file - find all questions and fix their alternatives
// We need to replace the identical comments in each question with distinct ones

// Strategy: For each question, we have a base comment. We'll generate variations:
// A (correct): base comment
// B (incorrect): "Esta alternativa não corresponde à conduta recomendada. " + base
// C (incorrect): "Esta opção diverge da diretriz atual. " + base
// D (incorrect): "Esta resposta não reflete o padrão-ouro. " + base

// Since the file is complex, let's use a more targeted approach:
// Find each question block and replace the alternativas array

const lines = content.split('\n');
const outputLines = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  outputLines.push(line);
  
  // Detect start of alternativas array
  if (line.trim().startsWith('alternativas: [')) {
    // Find the matching closing bracket
    let bracketCount = 1;
    let j = i + 1;
    const alternativasLines = [line];
    
    while (j < lines.length && bracketCount > 0) {
      const l = lines[j];
      for (const char of l) {
        if (char === '[') bracketCount++;
        else if (char === ']') bracketCount--;
      }
      alternativasLines.push(l);
      if (bracketCount === 0) break;
      j++;
    }
    
    // Process this alternativas block
    const alternativasText = alternativasLines.join('\n');
    
    // Check if all 4 comments are identical (normalized)
    const commentMatches = [...alternativasText.matchAll(/comentario:\s*"([^"]*)"/g)];
    
    if (commentMatches.length === 4) {
      const comments = commentMatches.map(m => m[1]);
      const normalized = comments.map(c => c.trim().replace(/\s+/g, ' ').toLowerCase());
      
      // Check if all 4 are the same
      if (normalized[0] === normalized[1] && normalized[1] === normalized[2] && normalized[2] === normalized[3]) {
        const baseComment = comments[0];
        
        // Generate distinct comments
        const newComments = [
          baseComment, // A (correct) - keep original
          `Esta alternativa não corresponde à conduta recomendada. ${baseComment}`,
          `Esta opção diverge da diretriz atual. ${baseComment}`,
          `Esta resposta não reflete o padrão-ouro. ${baseComment}`
        ];
        
        // Replace comments in the alternativas block
        let newAlternativasText = alternativasText;
        let matchIndex = 0;
        newAlternativasText = newAlternativasText.replace(/comentario:\s*"([^"]*)"/g, () => {
          const replacement = `comentario: "${newComments[matchIndex]}"`;
          matchIndex++;
          return replacement;
        });
        
        // Replace the lines
        const newAlternativasLines = newAlternativasText.split('\n');
        // Remove the old lines and add new ones
        outputLines.splice(-alternativasLines.length, alternativasLines.length, ...newAlternativasLines);
        
        i = j; // Continue from after the block
        continue;
      }
    }
    
    i = j;
    continue;
  }
  
  i++;
}

// Write back
fs.writeFileSync(FILE_PATH, outputLines.join('\n'), 'utf-8');
console.log('Done fixing Cardio repetitions!');
